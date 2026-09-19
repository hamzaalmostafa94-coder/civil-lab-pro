const syriaCurriculum = {
    1: { title: "السنة الأولى (العلوم الأساسية)", subjects: [ { name: "الفيزياء العامة", exp: "تجربة معامل المرونة واختبار التمدد", type: "steel" }, { name: "الرسم الهندسي", exp: "إسقاط الأشكال ثلاثية الأبعاد", type: "cad" } ] },
    2: { title: "السنة الثانية (علوم المواد)", subjects: [ { name: "مقاومة المواد", exp: "اختبار الشد المباشر لعيّنة حديد", type: "steel" }, { name: "المساحة الهندسيّة", exp: "حساب المناسيب", type: "cad" } ] },
    3: { title: "السنة الثالثة (الإنشاءات والبيتون)", subjects: [ { name: "خرسانة مسلحة (1)", exp: "اختبار كسر الخرسانة للضغط وتحديد المقاومة", type: "concrete" }, { name: "نظرية الإنشاءات", exp: "رسم مخططات العزم والقص", type: "cad" } ] },
    4: { title: "السنة الرابعة (التصميم التنفيذي)", subjects: [ { name: "خرسانة مسلحة (2)", exp: "تصميم البلاطات والانحناء", type: "cad" }, { name: "منشآت معدنية", exp: "تحليل التحنيب", type: "steel" } ] },
    5: { title: "السنة الخامسة (مشروع التخرج)", subjects: [ { name: "التصميم الزلزالي", exp: "تطبيق أحمال الزلازل الديناميكية", type: "cad" } ] }
};


/**
         * ========================================================================
         * 2. APP ENGINE (Routing, State Management & Telegram Bot)
         * ========================================================================
         */
        
        // --- إعدادات بوت تيلغرام (يجب تعبئتها ببياناتك) ---
        const TELEGRAM_BOT_TOKEN = "8695897260:AAEKKsdzpuNYPKgeoHCy-rTuWi7iDZP_F2A"; 
        const TELEGRAM_CHAT_ID = "8432485890";
        
        // استرجاع بيانات المستخدم وحالة التفعيل من الذاكرة المحلية
        let currentUser = JSON.parse(localStorage.getItem('lamseh_user')) || {};
        let isActivated = localStorage.getItem('lamseh_activated') === 'true';
        let currentActivationCode = localStorage.getItem('lamseh_pending_code');

        const AppEngine = {
            init() {
                // توجيه المستخدم حسب حالته
                if (currentUser.name && isActivated) {
                    // مستخدم مسجل ومفعل: يذهب للوحة التحكم ولن تظهر له نافذة التفعيل أبداً
                    document.getElementById('displayStudentName').innerText = currentUser.name;
                    this.navigate('screen-dashboard');
                } else if (currentUser.name && !isActivated) {
                    // مستخدم مسجل لكن غير مفعل: يذهب للوحة التحكم ليتصفح بحرية
                    document.getElementById('displayStudentName').innerText = currentUser.name;
                    this.navigate('screen-dashboard'); 
                } else {
                    // مستخدم جديد كلياً
                    this.navigate('screen-auth');
                }

                ConcreteLab.init3D();
                SteelLab.init3D();
                CADLab.init();
            },
            
            login(e) {
                e.preventDefault();
                currentUser = {
                    name: document.getElementById('userName').value,
                    phone: document.getElementById('userPhone').value,
                    age: document.getElementById('userAge').value,
                    year: document.getElementById('userYear').value
                };
                
                // حفظ البيانات في الذاكرة
                localStorage.setItem('lamseh_user', JSON.stringify(currentUser));
                document.getElementById('displayStudentName').innerText = currentUser.name;
                this.navigate('screen-dashboard');
            },
            
            navigate(screenId) {
                document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
                document.getElementById(screenId).classList.add('active');
                
                setTimeout(() => {
                    if(screenId === 'screen-concrete') ConcreteLab.onWindowResize();
                    if(screenId === 'screen-steel') SteelLab.onWindowResize();
                    if(screenId === 'screen-cad') CADLab.recalculate();
                }, 50);
            },
            
            openYear(yearNum) {
                const yearData = syriaCurriculum[yearNum];
                document.getElementById('selectedYearTitle').innerText = yearData.title;

                const grid = document.getElementById('subjectsListGrid');
                grid.innerHTML = '';

                yearData.subjects.forEach((subj) => {
                    const card = document.createElement('div');
                    card.className = 'custom-card';
                    card.innerHTML = `
                        <div class="card-title">${subj.name}</div>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">🧪 ${subj.exp}</p>
                        <button class="btn btn-block btn-primary">بدء التمرين التفاعلي ➔</button>
                    `;
                    // هنا نتحقق: هل نفتح المخبر أم نظهر نافذة التفعيل؟
                    card.onclick = () => this.checkActivation(subj.type);
                    grid.appendChild(card);
                });

                this.navigate('screen-subjects');
            },
            
            checkActivation(type) {
                if (isActivated) {
                    // إذا كان مفعلاً، يدخل مباشرة دون أي إزعاج
                    this.openLab(type);
                } else {
                    // إذا لم يكن مفعلاً، تظهر له نافذة الاشتراك (وهنا نرسل الداتا للتيلغرام)
                    this.showModal(type);
                }
            },
            
            openLab(type) {
                if(type === 'concrete') {
                    this.navigate('screen-concrete');
                    ConcreteLab.calculate();
                } else if(type === 'steel') {
                    this.navigate('screen-steel');
                } else if(type === 'cad') {
                    this.navigate('screen-cad');
                }
            },
            
            pendingLabType: null,
            
            showModal(type) {
                this.pendingLabType = type;
                
                // توليد كود التفعيل وإرساله لتيلغرام (فقط إذا لم يتم إرساله مسبقاً)
                if (!currentActivationCode) {
                    currentActivationCode = Math.floor(1000 + Math.random() * 9000).toString(); // رمز من 4 أرقام
                    localStorage.setItem('lamseh_pending_code', currentActivationCode);
                    this.sendToTelegram(currentActivationCode);
                }

                const modal = document.getElementById('subscriptionModal');
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('active'), 10);
            },
            
            sendToTelegram(code) {
                if(!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "ضع_التوكن_الخاص_بالبوت_هنا") return;
                
                const text = `
🆕 طلب تفعيل جديد في مخبر (لمسة):
👤 الاسم: ${currentUser.name}
📱 الهاتف: ${currentUser.phone}
🎓 السنة: ${currentUser.year}
🎂 العمر: ${currentUser.age}

🔑 رمز التفعيل المخصص له: ${code}
                `;
                
                const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
                fetch(url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text })
                }).catch(err => console.error("Error sending to Telegram", err));
            },

            closeModal() {
                const modal = document.getElementById('subscriptionModal');
                modal.classList.remove('active');
                setTimeout(() => modal.style.display = 'none', 300);
            },
            
            redirectToWhatsApp() {
                const phoneNumber = "+963992736977";
                const message = `مرحباً، أنا ${currentUser.name || 'طالب'}، أود تفعيل اشتراكي في منصة (لمسة) للمخابر الهندسية. يرجى تزويدي برمز التفعيل الخاص بي.`;
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
            },
            
            enterCode() {
                const inputCode = prompt("أدخل رمز التفعيل الخاص بك (4 أرقام):");
                
                // يقبل إما الرمز العشوائي المولد، أو كود "9999" ككود ماستر دائم لك كأدمن
                if(inputCode === currentActivationCode || inputCode === "9999") {
                    localStorage.setItem('lamseh_activated', 'true');
                    isActivated = true;
                    
                    alert("تم تفعيل اشتراكك بنجاح! جاري توجيهك للمخبر...");
                    this.closeModal();
                    this.openLab(this.pendingLabType);
                } else if(inputCode) {
                    alert("الرمز غير صحيح. يرجى الضغط على زر الواتساب للحصول على الرمز من الإدارة.");
                }
            }
        };

const ConcreteLab = {
    scene: null, camera: null, renderer: null, controls: null, cubeMesh: null, pressMesh: null, isCrushing: false,
    init3D() {
        const container = document.getElementById('concrete-canvas');
        this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0x0f172a); 
        this.camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100); this.camera.position.set(12, 10, 18);
        this.renderer = new THREE.WebGLRenderer({ antialias: true }); this.renderer.setSize(container.clientWidth, container.clientHeight); container.appendChild(this.renderer.domElement);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement); this.controls.enableDamping = true;
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8); dirLight.position.set(10, 20, 10); this.scene.add(dirLight);
        const base = new THREE.Mesh(new THREE.BoxGeometry(8, 0.5, 8), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 })); base.position.y = -0.25; this.scene.add(base);
        this.createSpecimenMesh("0.80");
        this.pressMesh = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 4, 32), new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8 })); this.pressMesh.position.y = 5.5; this.scene.add(this.pressMesh);
        window.addEventListener('resize', () => this.onWindowResize()); this.animate();
    },
    createSpecimenMesh(shapeType) {
        if (this.cubeMesh) this.scene.remove(this.cubeMesh);
        let geo = (shapeType === "1.00") ? new THREE.CylinderGeometry(1.5, 1.5, 3, 32) : new THREE.BoxGeometry(3, 3, 3);
        this.cubeMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 1.0 }));
        this.cubeMesh.position.y = 1.5; this.scene.add(this.cubeMesh);
    },
    calculate() {
        const cfValue = document.getElementById('c_shape').value; const cf = parseFloat(cfValue);
        const t = parseFloat(document.getElementById('c_age').value); const nr = parseFloat(document.getElementById('c_force').value);
        if (!this.isCrushing) { this.createSpecimenMesh(cfValue); this.pressMesh.position.y = 5.5; const btn = document.getElementById('btn-crush'); btn.innerText = "▶ تطبيق حمل الانكسار ديناميكياً"; btn.className = "btn btn-danger"; }
        const Ac = (cf === 0.78) ? 10000 : 22500; let ct = 1.00;
        if(t >= 3 && t < 28) ct = 1 / (1.947 - (1.18 / Math.sqrt(Math.log10(t)))); 
        const f_prime_prime = (nr / Ac) * 10; const f_prime = cf * ct * f_prime_prime;
        document.getElementById('res_ct').innerText = ct.toFixed(2); document.getElementById('res_f_prime_prime').innerText = f_prime_prime.toFixed(2) + " MPa"; document.getElementById('res_f_prime').innerText = f_prime.toFixed(2) + " MPa";
    },
    startSimulation() {
        if(this.isCrushing) return; this.isCrushing = true;
        this.pressMesh.position.y = 5.5; this.cubeMesh.material.color.setHex(0x94a3b8); this.cubeMesh.scale.set(1, 1, 1); this.cubeMesh.position.y = 1.5; 
        const btn = document.getElementById('btn-crush'); btn.innerText = "جاري التحميل..."; btn.className = "btn btn-outline";
        let crushAmount = 0; const maxCrush = 0.35; 
        const crushLoop = setInterval(() => {
            if (this.pressMesh.position.y > 5.0) { this.pressMesh.position.y -= 0.05; }
            else {
                crushAmount += 0.012; this.pressMesh.position.y -= 0.012; const newHeight = 3.0 - crushAmount;
                this.cubeMesh.scale.y = newHeight / 3.0; this.cubeMesh.position.y = newHeight / 2.0; 
                const bulge = 1 + (crushAmount * 0.15); this.cubeMesh.scale.x = bulge; this.cubeMesh.scale.z = bulge;
                if (crushAmount >= maxCrush) {
                    clearInterval(crushLoop); this.cubeMesh.material.color.setHex(0xef4444); this.isCrushing = false;
                    btn.innerText = "▶ إعادة التجربة"; btn.className = "btn btn-danger";
                }
            }
        }, 30);
    },
    onWindowResize() {
        if(!this.camera || !this.renderer) return; const container = document.getElementById('concrete-canvas');
        this.camera.aspect = container.clientWidth / container.clientHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(container.clientWidth, container.clientHeight);
    },
    animate() { requestAnimationFrame(() => this.animate()); if(this.controls) this.controls.update(); if(this.renderer && this.scene && this.camera) this.renderer.render(this.scene, this.camera); }
};

const SteelLab = {
    scene: null, camera: null, renderer: null, controls: null, topGrip: null, bottomGrip: null, rebarMain: null, rebarTopHalf: null, rebarBottomHalf: null, isPulling: false, samples: [], sampleCounter: 1,
    init3D() {
        const container = document.getElementById('steel-canvas');
        this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0x0f172a); 
        this.camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100); this.camera.position.set(0, 0, 22);
        this.renderer = new THREE.WebGLRenderer({ antialias: true }); this.renderer.setSize(container.clientWidth, container.clientHeight); container.appendChild(this.renderer.domElement);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement); this.controls.enableDamping = true;
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.7)); const dirLight = new THREE.DirectionalLight(0xffffff, 0.8); dirLight.position.set(10, 10, 10); this.scene.add(dirLight);
        this.buildMachine(); window.addEventListener('resize', () => this.onWindowResize()); this.animate();
    },
    buildMachine() {
        const gripMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
        this.topGrip = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 4), gripMat); this.topGrip.position.y = 5.5; this.scene.add(this.topGrip);
        this.bottomGrip = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 4), gripMat); this.bottomGrip.position.y = -5.5; this.scene.add(this.bottomGrip);
        const rebarMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.4 });
        this.rebarMain = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 9, 32), rebarMat); this.scene.add(this.rebarMain);
        this.rebarTopHalf = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 4.5, 32), rebarMat.clone()); this.rebarTopHalf.visible = false; this.scene.add(this.rebarTopHalf);
        this.rebarBottomHalf = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 4.5, 32), rebarMat.clone()); this.rebarBottomHalf.visible = false; this.scene.add(this.rebarBottomHalf);
    },
    startSimulation() {
        if(this.isPulling) return; this.isPulling = true;
        this.rebarMain.visible = true; this.rebarMain.scale.set(1, 1, 1); this.rebarMain.material.color.setHex(0x64748b);
        this.rebarTopHalf.visible = false; this.rebarBottomHalf.visible = false; this.topGrip.position.y = 5.5;
        const btn = document.getElementById('btn-pull'); btn.innerText = "جاري الشد..."; btn.className = "btn btn-outline";
        let stretch = 0; const maxStretch = 0.25; 
        const pullLoop = setInterval(() => {
            stretch += 0.005; this.rebarMain.scale.y = 1 + stretch;
            const thinning = 1 - (stretch * 0.4); this.rebarMain.scale.x = thinning; this.rebarMain.scale.z = thinning;
            this.topGrip.position.y = 5.5 + (9 * stretch);
            if (stretch > maxStretch * 0.75) this.rebarMain.material.color.setHex(0xb91c1c); 
            if (stretch >= maxStretch) {
                clearInterval(pullLoop); this.rebarMain.visible = false;
                this.rebarTopHalf.visible = true; this.rebarTopHalf.material.color.setHex(0xb91c1c); this.rebarTopHalf.scale.set(thinning, 1, thinning); this.rebarTopHalf.position.y = this.topGrip.position.y - 3.25;
                this.rebarBottomHalf.visible = true; this.rebarBottomHalf.material.color.setHex(0xb91c1c); this.rebarBottomHalf.scale.set(thinning, 1, thinning); this.rebarBottomHalf.position.y = this.bottomGrip.position.y + 3.25;
                this.isPulling = false; btn.innerText = "▶ إضافة النتيجة للجدول"; btn.className = "btn btn-primary";
                this.addSampleToTable();
            }
        }, 30);
    },
    addSampleToTable() {
        const ds = parseFloat(document.getElementById('s_dia').value); const n_prime_y = parseFloat(document.getElementById('s_force').value);
        const Ng = (ds <= 20) ? 400 : 1200; const As = (Math.PI * Math.pow(ds, 2)) / 4; const Ny = (n_prime_y - Ng) * 10; const fyi = Ny / As; 
        this.samples.push({ id: this.sampleCounter++, ds: ds, As: As.toFixed(2), Ng: Ng, Ny: Ny.toFixed(0), fyi: fyi.toFixed(2) });
        this.renderTable();
    },
    renderTable() {
        const tbody = document.getElementById('steel_table_body'); tbody.innerHTML = '';
        this.samples.forEach(s => { tbody.innerHTML += `<tr><td>${s.id}</td><td>${s.ds}</td><td>${s.As}</td><td>${s.Ng}</td><td>${s.Ny}</td><td style="color: var(--primary); font-weight: bold;">${s.fyi}</td></tr>`; });
        if(this.samples.length > 0) { const fym = this.samples.reduce((acc, curr) => acc + parseFloat(curr.fyi), 0) / this.samples.length; document.getElementById('stat_fym').innerText = fym.toFixed(2) + " MPa"; }
    },
    onWindowResize() {
        if(!this.camera || !this.renderer) return; const container = document.getElementById('steel-canvas');
        this.camera.aspect = container.clientWidth / container.clientHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(container.clientWidth, container.clientHeight);
    },
    animate() { requestAnimationFrame(() => this.animate()); if(this.controls) this.controls.update(); if(this.renderer && this.scene && this.camera) this.renderer.render(this.scene, this.camera); }
};

const CADLab = {
    init() { this.recalculate(); },
    recalculate() {
        const L = parseFloat(document.getElementById('spanInput').value); const q = parseFloat(document.getElementById('loadInput').value); const h = parseFloat(document.getElementById('depthInput').value);
        document.getElementById('spanVal').innerText = L.toFixed(1) + " m"; document.getElementById('loadVal').innerText = q.toFixed(0) + " kN/m"; document.getElementById('depthVal').innerText = h.toFixed(0) + " cm";
        const mMax = (q * Math.pow(L, 2)) / 8; const vMax = (q * L) / 2;
        let rebarText = "3 T 14"; if(mMax > 80 && mMax <= 150) rebarText = "4 T 16"; else if(mMax > 150 && mMax <= 250) rebarText = "5 T 18"; else if(mMax > 250) rebarText = "6 T 20";
        document.getElementById('mMaxVal').innerText = mMax.toFixed(1) + " kN.m"; document.getElementById('vMaxVal').innerText = vMax.toFixed(1) + " kN"; document.getElementById('rebarVal').innerText = rebarText;
        this.drawBeam(L, q, h);
    },
    drawBeam(L, q, h) {
        const canvas = document.getElementById('cadCanvas'); if(!canvas) return; const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth - 40; canvas.height = 280; ctx.clearRect(0, 0, canvas.width, canvas.height);
        const beamY = 140; const startX = 80; const endX = canvas.width - 80; const beamThickness = (h / 100) * 40; 
        ctx.fillStyle = "#334155"; ctx.fillRect(startX, beamY - beamThickness/2, endX - startX, beamThickness);
        ctx.strokeStyle = "#38bdf8"; ctx.lineWidth = 3; ctx.strokeRect(startX, beamY - beamThickness/2, endX - startX, beamThickness);
        ctx.fillStyle = "#ef4444"; ctx.beginPath(); ctx.moveTo(startX, beamY + beamThickness/2); ctx.lineTo(startX - 15, beamY + beamThickness/2 + 20); ctx.lineTo(startX + 15, beamY + beamThickness/2 + 20); ctx.fill();
        ctx.beginPath(); ctx.moveTo(endX, beamY + beamThickness/2); ctx.lineTo(endX - 15, beamY + beamThickness/2 + 20); ctx.lineTo(endX + 15, beamY + beamThickness/2 + 20); ctx.fill();
        ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(startX, beamY); ctx.quadraticCurveTo((startX + endX)/2, beamY + (q * L / 5), endX, beamY); ctx.stroke(); ctx.setLineDash([]); 
        ctx.fillStyle = "#f8fafc"; ctx.font = "14px Segoe UI"; ctx.fillText(`مخطط الانحناء الديناميكي لجائز بطول L = ${L}m بحمل q = ${q}kN/m`, canvas.width / 2 - 160, 40);
    },
    simulateEarthquake() {
        const canvas = document.getElementById('cadCanvas'); let shakes = 0;
        const interval = setInterval(() => { canvas.style.transform = `translate(${Math.random()*12 - 6}px, ${Math.random()*12 - 6}px)`; shakes++; if(shakes > 20) { clearInterval(interval); canvas.style.transform = 'none'; } }, 50);
    }
};

if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js'); }); }
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); deferredPrompt = e;
    setTimeout(() => { document.getElementById('installPrompt').style.display = 'block'; }, 2000);
});
document.getElementById('btnInstallYes').addEventListener('click', async () => {
    document.getElementById('installPrompt').style.display = 'none';
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
});
document.getElementById('btnInstallNo').addEventListener('click', () => { document.getElementById('installPrompt').style.display = 'none'; });

window.onload = () => AppEngine.init();