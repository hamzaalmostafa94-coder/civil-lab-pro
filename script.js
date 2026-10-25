const supabaseUrl = 'https://ocpdkekznfxpbrssesxs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jcGRrZWt6bmZ4cGJyc3Nlc3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNjEwMDIsImV4cCI6MjEwNTYzNzAwMn0.zIRLga88VPig_c_R7idXsHF2RGgjkuCL_9IIsm44Su4';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// دالة ذكية لحل مسارات ملفات التمارين سواء وضع المستخدم ملفات اللعبة بجانب مجلد "تمارين لمسة" أو بداخله
function resolveExercisePath(relativePath) {
    try {
        const decodedUrl = decodeURIComponent(window.location.pathname);
        if (decodedUrl.includes('/تمارين لمسة/') || decodedUrl.includes('\\تمارين لمسة\\')) {
            return encodeURI(relativePath.replace(/^تمارين لمسة\//, ''));
        }
    } catch (e) {}
    return encodeURI(relativePath);
}

// الهيكلية الشاملة للمنهاج السوري مع ربط كافة التمارين المولّدة والمدمجة
const syriaCurriculum = {
    1: {
        title: "السنة الأولى (العلوم الأساسية)",
        semesters: {
            1: {
                title: "الفصل الأول",
                subjects: [
                    { name: "شرح مواد الفصل الأول", exercises: [] },
                    { name: "الرياضيات 1", exercises: [] },
                    { 
                        name: "الميكانيك 1", 
                        exercises: [
                            {
                                title: "التمرين الأول (Ex1): محاكاة الميكانيك الهندسي",
                                desc: "تحليل القوى والتوازن السكوني في المنشآت",
                                mode: "external",
                                path: "تمارين لمسة/سنة اولى/فصل اول/ميكانيك 1/Ex1/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "التمثيل الهندسي", 
                        exercises: [
                            {
                                title: "التمرين الأول (Ex1): التمثيل والإسقاط الهندسي",
                                desc: "محاكاة المساقط والمنظور الهندسي ثلاثي الأبعاد",
                                mode: "external",
                                path: "تمارين لمسة/سنة اولى/فصل اول/التمثيل الهندسي/Ex1/Ex1.html"
                            }
                        ]
                    },
                    { name: "E_1", exercises: [] },
                    { 
                        name: "الفيزياء", 
                        exercises: [
                            {
                                title: "التمرين الأول (Ex1): الفواصل الحرارية والانبعاج",
                                desc: "محاكاة التمدد الحراري والانبعاج في العناصر الإنشائية",
                                mode: "external",
                                path: "تمارين لمسة/سنة اولى/فصل اول/فيزياء/Ex1/ai_studio_code.html"
                            },
                            {
                                title: "التمرين الثاني (Ex2): التجربة الفيزيائية التفاعلية",
                                desc: "محاكاة الخواص الفيزيائية والمرونة ثلاثية الأبعاد",
                                mode: "external",
                                path: "تمارين لمسة/سنة اولى/فصل اول/فيزياء/Ex2/index.html"
                            }
                        ]
                    },
                    { name: "الثقافة", exercises: [] }
                ]
            },
            2: {
                title: "الفصل الثاني",
                subjects: [
                    { name: "تعريف بمواد الفصل الثاني", exercises: [] },
                    { name: "الرياضيات 2", exercises: [] },
                    { name: "البرمجة ومعالجة المعلومات", exercises: [] },
                    { name: "الرسم الهندسي", exercises: [] },
                    { name: "اللغة العربية", exercises: [] },
                    { name: "ميكانيك 2", exercises: [] },
                    { name: "الجيولوجيا الهندسية", exercises: [] },
                    { name: "الكيمياء للمهندسين", exercises: [] },
                    { name: "برمجة (قديم)", exercises: [] },
                    { name: "E2 (قديم)", exercises: [] }
                ]
            }
        }
    },
    2: {
        title: "السنة الثانية (علوم المواد والميكانيك)",
        semesters: {
            1: {
                title: "الفصل الأول",
                subjects: [
                    { name: "شرح مواد الفصل الأول", exercises: [] },
                    { name: "تصميم وإنشاء مباني 1", exercises: [] },
                    { name: "التخصصية E2", exercises: [] },
                    { name: "رياضيات 3", exercises: [] },
                    { 
                        name: "هيدروليك 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر الهيدروليك وميكانيك الموائع (1)",
                                desc: "محاكاة ضغط وتدفق السوائل في الأنابيب والمنشآت",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل اول/هيدروليك 1/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "مساحة 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر المساحة الهندسية (1)",
                                desc: "قياسات المناسيب والمسافات والأرصاد المساحية",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل اول/مساحة 1/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "مقاومة 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: محاكاة مقاومة المواد والإجهادات (1)",
                                desc: "تحليل التشوهات والإجهادات المحورية",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل اول/مقاومة 1/ai_studio_code.html"
                            },
                            {
                                title: "التمرين الثاني: اختبار الشد المباشر للفولاذ (3D)",
                                desc: "تحديد إجهاد الخضوع والانقطاع لقضبان التسليح",
                                mode: "builtin",
                                type: "steel"
                            }
                        ]
                    },
                    { 
                        name: "مواد البناء 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر خواص واختبارات مواد البناء (1)",
                                desc: "فحص الخواص الفيزيائية والميكانيكية لمواد الإنشاء",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل اول/Building materials 1/ai_studio_code(1).html"
                            }
                        ]
                    },
                    { name: "E 3 (قديم/حملة)", exercises: [] },
                    { name: "رياضيات 3 (قديم/حملة)", exercises: [] }
                ]
            },
            2: {
                title: "الفصل الثاني",
                subjects: [
                    { name: "تعريف بمواد الفصل الثاني", exercises: [] },
                    { 
                        name: "الهيدرولوجيا الهندسية", 
                        exercises: [
                            {
                                title: "التمرين الأول: محاكاة الهيدرولوجيا والجريان السطحي",
                                desc: "تحليل الهطول المطري والأحواض الساكبة",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل تاني/هيدرولوجيا/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "هيدروليك 2", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر الهيدروليك والجريان في القنوات (2)",
                                desc: "محاكاة الجريان الحر والقفزة الهيدروليكية",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل تاني/هيدروليك 2/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "مقاومة 2", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر مقاومة المواد والانحناء والفتل (2)",
                                desc: "تحليل الإجهادات المركبة والانحناء في المقاطع",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل تاني/مقاومة 2/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "مواد البناء 2", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر تكنولوجيا وخواص مواد البناء (2)",
                                desc: "تصميم الخلطات وفحص ديمومة المواد",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل تاني/موادب ناء 2/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "مساحة 2", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر المساحة التبوغرافية والتوقيع (2)",
                                desc: "محاكاة الأجهزة المساحية وحساب الإحداثيات",
                                mode: "external",
                                path: "تمارين لمسة/سنة تانية/فصل تاني/مساحة 2/GAME.html"
                            }
                        ]
                    },
                    { name: "تجهيزات فنية", exercises: [] },
                    { name: "E-4 (حملة / قديم)", exercises: [] },
                    { name: "رياضيات 4 (قديم/حملة)", exercises: [] }
                ]
            }
        }
    },
    3: {
        title: "السنة الثالثة (الإنشاءات والبيتون)",
        semesters: {
            1: {
                title: "الفصل الأول",
                subjects: [
                    { name: "المساحة 3", exercises: [] },
                    { 
                        name: "بيتون 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: اختبار كسر الخرسانة للضغط (3D)",
                                desc: "تحديد المقاومة المميزة للبيتون f'c ومعاملات التصحيح",
                                mode: "builtin",
                                type: "concrete"
                            }
                        ]
                    },
                    { 
                        name: "إنشاءات 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: استديو التحليل الإنشائي وتصميم الجوائز (CAD)",
                                desc: "حساب مخططات العزم والقص والتسليح الطولي مع محاكاة الزلازل",
                                mode: "builtin",
                                type: "cad"
                            }
                        ]
                    },
                    { 
                        name: "طرق 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر هندسة وتصميم الطرق (1)",
                                desc: "محاكاة التخطيط الهندسي للطرق والمنحنيات الأفقية والشاقولية",
                                mode: "external",
                                path: "تمارين لمسة/سنة تالتة/فصل اول/طرق 1/ai_studio_code(1).html"
                            }
                        ]
                    },
                    { name: "تربة 1", exercises: [] },
                    { name: "هندسة الري", exercises: [] },
                    { name: "هندسة الإمداد", exercises: [] }
                ]
            },
            2: {
                title: "الفصل الثاني",
                subjects: [
                    { name: "تعريف بمواد الفصل الثاني", exercises: [] },
                    { name: "طرق 2", exercises: [] },
                    { name: "تربة 2", exercises: [] },
                    { name: "شبكات", exercises: [] },
                    { name: "الصرف الصحي", exercises: [] },
                    { name: "إنشاءات 3 قديم", exercises: [] },
                    { name: "إنشاءات 2 جديد", exercises: [] }
                ]
            }
        }
    },
    4: {
        title: "السنة الرابعة (التصميم التنفيذي)",
        semesters: {
            1: {
                title: "الفصل الأول",
                subjects: [
                    { 
                        name: "سكك", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر هندسة السكك الحديدية",
                                desc: "محاكاة مسار الخط الحديدي، العوارض، والارتفاع الإضافي للقضبان",
                                mode: "external",
                                path: "تمارين لمسة/سنة رابعة/فصل اول/سكك حديدية/ai_studio_code(1).html"
                            }
                        ]
                    },
                    { 
                        name: "بيتون 3 (جديد)", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر البيتون المسلح (3)",
                                desc: "تصميم وتحليل العناصر البيتونية المتقدمة",
                                mode: "external",
                                path: "تمارين لمسة/سنة رابعة/فصل اول/بيتون 3/ai_studio_code(2).html"
                            }
                        ]
                    },
                    { 
                        name: "أساسات 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر هندسة الأساسات السطحية (1)",
                                desc: "دراسة قدرة تحمل التربة وتوزيع الإجهادات أسفل القواعد",
                                mode: "external",
                                path: "تمارين لمسة/سنة رابعة/فصل اول/اساسات 1/Game2.html"
                            }
                        ]
                    },
                    { 
                        name: "معدنية 1", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر المنشآت المعدنية (1)",
                                desc: "فحص المقاطع الفولاذية والوصلات والتحنيب",
                                mode: "external",
                                path: "تمارين لمسة/سنة رابعة/فصل اول/معدنية 1/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "إنشاءات 3", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر ميكانيك الإنشاءات (3)",
                                desc: "تحليل المنشآت غير المقررة استاتيكياً والمصفوفات",
                                mode: "external",
                                path: "تمارين لمسة/سنة رابعة/فصل اول/انشاءات 3/ai_studio_code(2).html"
                            }
                        ]
                    },
                    { 
                        name: "مائية", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر المنشآت المائية",
                                desc: "محاكاة الهدارات والبوابات المائية وتبديد الطاقة",
                                mode: "external",
                                path: "تمارين لمسة/سنة رابعة/فصل اول/مائية/ai_studio_code.html"
                            }
                        ]
                    },
                    { 
                        name: "بيتون 3 [قديم]", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر البيتون المسلح (3)",
                                desc: "تصميم وتحليل العناصر البيتونية المتقدمة",
                                mode: "external",
                                path: "تمارين لمسة/سنة رابعة/فصل اول/بيتون 3/ai_studio_code(2).html"
                            }
                        ]
                    }
                ]
            },
            2: {
                title: "الفصل الثاني",
                subjects: [
                    { name: "هندسة الأساسات 2", exercises: [] },
                    { name: "هندسة السدود", exercises: [] },
                    { 
                        name: "ديناميك الإنشاءات", 
                        exercises: [
                            {
                                title: "التمرين الأول: مخبر ديناميك المنشآت والاهتزازات",
                                desc: "محاكاة الاستجابة الديناميكية والتردد الطبيعي للمنشآت",
                                mode: "external",
                                path: "تمارين لمسة/سنة رابعة/فصل تاني/ديناميك المنشأت/ai_studio_code.html"
                            }
                        ]
                    },
                    { name: "منشآت بيتونية", exercises: [] },
                    { name: "تكنولوجيا الإنشاء 1", exercises: [] },
                    { name: "المنشآت المعدنية 2", exercises: [] },
                    { name: "ري وصرف قديم", exercises: [] },
                    { name: "بيتون 4 قديم", exercises: [] }
                ]
            }
        }
    },
    5: {
        title: "السنة الخامسة (مشروع التخرج)",
        semesters: {
            1: {
                title: "الفصل الأول",
                subjects: [
                    { name: "اقتصاد هندسي", exercises: [] },
                    { name: "هندسة المطارات", exercises: [] },
                    { name: "تكنولوجيا الإنشاء 2", exercises: [] },
                    { name: "مهارات البحث العلمي", exercises: [] },
                    { name: "بيتون 5 (قديم)", exercises: [] }
                ]
            },
            2: {
                title: "الفصل الثاني",
                subjects: [
                    { name: "المنشآت المركبة", exercises: [] },
                    { name: "إدارة المشاريع الهندسية", exercises: [] },
                    { name: "أنفاق ومنشآت مطمورة", exercises: [] },
                    { name: "هندسة الجسور", exercises: [] },
                    { name: "الديناميك (قديم)", exercises: [] },
                    { name: "معدنية 3 (قديم)", exercises: [] },
                    { name: "تصميم بمعونة الحاسب (قديم)", exercises: [] }
                ]
            }
        }
    }
};

const TELEGRAM_BOT_TOKEN = "8695897260:AAEKKsdzpuNYPKgeoHCy-rTuWi7iDZP_F2A"; 
const TELEGRAM_CHAT_ID = "8432485890";

function generateDeviceID() { return 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36); }

let currentUser = JSON.parse(localStorage.getItem('lamseh_user')) || {};
let isActivated = localStorage.getItem('lamsa_premium_status') === 'activated';
let currentActivationCode = localStorage.getItem('lamseh_pending_code');
let deviceID = localStorage.getItem('lamseh_device_id');
let currentSelectedYear = 1;
let currentSelectedSemester = 1;
let currentExternalLabUrl = '';

const AppEngine = {
    init() {
        const hasAccess = TrialManager.checkStatus();
        if(hasAccess) {
            this.navigate('screen-dashboard');
            if(typeof ConcreteLab !== 'undefined') { ConcreteLab.init3D(); ConcreteLab.calculate(); }
        }
        if (currentUser.name) {
            const sidebarNameEl = document.getElementById('sidebar-name');
            const sidebarDeviceEl = document.getElementById('sidebar-device');
            const displayStudentEl = document.getElementById('displayStudentName');
            
            if(sidebarNameEl) sidebarNameEl.innerText = currentUser.name;
            if(displayStudentEl) displayStudentEl.innerText = currentUser.name;
            if(sidebarDeviceEl) sidebarDeviceEl.innerText = "معرف الجهاز: " + (deviceID ? deviceID.substr(0, 12) + "..." : "غير مرتبط");
            this.navigate('screen-dashboard');
        } else {
            this.navigate('screen-home');
        }
        ConcreteLab.init3D(); SteelLab.init3D(); CADLab.init();
    },
    
    toggleSidebar() { const sidebar = document.getElementById('sidebar'); if(sidebar) sidebar.classList.toggle('active'); },

    startJourney() {
        const modal = document.getElementById('registrationModal');
        if(modal) { modal.style.display = 'flex'; setTimeout(() => modal.classList.add('active'), 10); } 
        else { this.navigate('screen-auth'); }
    },

    closeRegistrationModal() {
        const modal = document.getElementById('registrationModal');
        if(modal) { modal.classList.remove('active'); setTimeout(() => modal.style.display = 'none', 300); }
    },

    proceedToLogin() { this.closeRegistrationModal(); this.navigate('screen-auth'); },
    
    async login(e) {
        e.preventDefault();
        const passwordInput = document.getElementById('userPassword') ? document.getElementById('userPassword').value : '';
        const MASTER_PASSWORD = CONFIG.MASTER_PASSWORD;
        if (passwordInput !== MASTER_PASSWORD) {
            alert("❌ كلمة المرور غير صحيحة. يرجى التأكد من الكلمة المرسلة لك عبر واتساب.");
            return;
        }
        const btn = document.getElementById('btnLoginSubmit') || e.target.querySelector('button[type="submit"]');
        if(btn) { btn.disabled = true; btn.innerText = "جاري حفظ البيانات..."; }

        const name = document.getElementById('userName') ? document.getElementById('userName').value.trim() : 'طالب هندسة';
        const phone = document.getElementById('userPhone') ? document.getElementById('userPhone').value.trim() : '';
        const age = document.getElementById('userAge') ? document.getElementById('userAge').value : '';
        const year = document.getElementById('userYear') ? document.getElementById('userYear').value : '';

        currentUser = { name, phone, age, year };
        localStorage.setItem('lamseh_user', JSON.stringify(currentUser));

        try {
            if (!deviceID) { deviceID = generateDeviceID(); localStorage.setItem('lamseh_device_id', deviceID); }
            let { data: student, error: fetchError } = await supabaseClient.from('students').select('*').eq('phone_number', phone).single();

            if (!student) {
                const { data: newStudent, error: insertError } = await supabaseClient.from('students').insert([{ full_name: name, phone_number: phone }]).select().single();
                if (insertError) throw insertError;
                student = newStudent;
            }

            localStorage.setItem('lamsa_student_id', student.id);
            if (student.is_premium) { localStorage.setItem('lamsa_premium_status', 'activated'); isActivated = true; }

        } catch (err) {
            console.error("Database Error:", err);
            if(!localStorage.getItem('lamsa_student_id')) { localStorage.setItem('lamsa_student_id', 'offline_dev_id_' + Date.now()); }
        } finally {
            const sidebarNameEl = document.getElementById('sidebar-name');
            if(sidebarNameEl) sidebarNameEl.innerText = currentUser.name;
            const displayStudentEl = document.getElementById('displayStudentName');
            if(displayStudentEl) displayStudentEl.innerText = currentUser.name;
            this.navigate('screen-dashboard');
            if(btn) { btn.disabled = false; btn.innerText = "دخول منصة لمسة ➔"; }
        }
    },
    
    navigate(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(screenId);
        if(screen) screen.classList.add('active');
        setTimeout(() => {
            if(screenId === 'screen-concrete') ConcreteLab.onWindowResize();
            if(screenId === 'screen-steel') SteelLab.onWindowResize();
            if(screenId === 'screen-cad') CADLab.recalculate();
        }, 50);
    },
    
    openYear(yearNum) {
        currentSelectedYear = yearNum;
        currentSelectedSemester = 1;
        const yearData = syriaCurriculum[yearNum];
        
        const titleEl = document.getElementById('selectedYearTitle');
        if(titleEl) titleEl.innerText = yearData.title;

        this.renderSemesterView();
        this.navigate('screen-subjects');
    },

    switchSemester(semNum) {
        currentSelectedSemester = semNum;
        this.renderSemesterView();
    },

    renderSemesterView() {
        const yearData = syriaCurriculum[currentSelectedYear];
        if(!yearData || !yearData.semesters) return;

        const btnSem1 = document.getElementById('btn-sem-1');
        const btnSem2 = document.getElementById('btn-sem-2');
        if(btnSem1 && btnSem2) {
            if(currentSelectedSemester === 1) {
                btnSem1.classList.add('active');
                btnSem2.classList.remove('active');
            } else {
                btnSem2.classList.add('active');
                btnSem1.classList.remove('active');
            }
        }

        // تحديث عداد التمارين في تبويبي الفصل الأول والثاني
        const sem1ActiveCount = yearData.semesters[1].subjects.reduce((acc, s) => acc + (s.exercises ? s.exercises.length : 0), 0);
        const sem2ActiveCount = yearData.semesters[2].subjects.reduce((acc, s) => acc + (s.exercises ? s.exercises.length : 0), 0);
        const sem1DescEl = document.getElementById('sem1-count-desc');
        const sem2DescEl = document.getElementById('sem2-count-desc');
        if(sem1DescEl) sem1DescEl.innerText = `${yearData.semesters[1].subjects.length} مقرر (${sem1ActiveCount} تمرين نشط)`;
        if(sem2DescEl) sem2DescEl.innerText = `${yearData.semesters[2].subjects.length} مقرر (${sem2ActiveCount} تمرين نشط)`;

        const semesterData = yearData.semesters[currentSelectedSemester];
        const semesterSubTitleEl = document.getElementById('selectedSemesterSubTitle');
        if(semesterSubTitleEl) {
            semesterSubTitleEl.innerText = `${semesterData.title} — إجمالي المقررات: ${semesterData.subjects.length}`;
        }

        const grid = document.getElementById('subjectsListGrid');
        if(!grid) return;
        grid.innerHTML = '';

        semesterData.subjects.forEach((subj) => {
            const card = document.createElement('div');
            card.className = 'custom-card subject-item-card';
            const exCount = subj.exercises ? subj.exercises.length : 0;

            if(exCount > 0) {
                card.classList.add('has-active-lab');
                const badgeText = exCount === 1 ? 'تمرين تفاعلي نشط 🧪' : `${exCount} تمارين نشطة 🧪`;
                const firstDesc = subj.exercises[0].desc || subj.exercises[0].title;

                card.innerHTML = `
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 10px;">
                            <div class="card-title" style="margin: 0;">${subj.name}</div>
                            <span class="badge-lab-active">${badgeText}</span>
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-muted, #64748b); margin-bottom: 16px; line-height: 1.5;">
                            ⚙️ ${firstDesc}
                        </p>
                    </div>
                    <button class="btn btn-primary" style="width: 100%;">
                        ${exCount > 1 ? `استعراض التمارين (${exCount}) ➔` : 'بدء التمرين التفاعلي ➔'}
                    </button>
                `;
                card.onclick = () => this.openSubjectExercises(subj);
            } else {
                card.classList.add('is-pending-subject');
                card.innerHTML = `
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 10px;">
                            <div class="card-title" style="color: var(--text-main, #1a1a1a); margin: 0;">${subj.name}</div>
                            <span class="badge-lab-pending">قريباً ⏳</span>
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-muted, #64748b); margin-bottom: 16px; line-height: 1.5;">
                            المقرر الأكاديمي والتمارين التفاعلية قيد التجهيز من قبل الكادر الهندسي.
                        </p>
                    </div>
                    <button class="btn btn-outline" style="width: 100%; opacity: 0.7; cursor: default;">المخبر قيد الإعداد 🔒</button>
                `;
                card.onclick = () => {
                    alert(`مادة (${subj.name}): جاري العمل على إعداد نماذج المحاكاة والتجارب ثلاثية الأبعاد الخاصة بها وستتاح قريباً.`);
                };
            }

            grid.appendChild(card);
        });
    },

    openSubjectExercises(subj) {
        if(!subj.exercises || subj.exercises.length === 0) return;

        // إذا كان للمادة تمرين واحد فقط أو عدة تمارين، نعرض نافذة اختيار التمارين بشكل منظم
        // (أو إذا كان تمريناً واحداً يمكن تشغيله مباشرة أو عبر النافذة)
        if(subj.exercises.length === 1) {
            this.launchExercise(subj.name, subj.exercises[0]);
            return;
        }

        const titleEl = document.getElementById('modalSubjectTitle');
        const listEl = document.getElementById('subjectExercisesList');
        if(titleEl) titleEl.innerText = `🧪 مخابر وتمارين: ${subj.name}`;
        if(listEl) {
            listEl.innerHTML = '';
            subj.exercises.forEach((ex, idx) => {
                const item = document.createElement('div');
                item.className = 'exercise-item-card';
                item.innerHTML = `
                    <div class="exercise-item-info">
                        <div class="exercise-item-title">${idx + 1}. ${ex.title}</div>
                        <div class="exercise-item-desc">${ex.desc || ''}</div>
                    </div>
                    <button class="btn btn-primary btn-sm">▶ تشغيل التمرين</button>
                `;
                item.querySelector('button').onclick = () => {
                    SidebarEngine.closeModal('subjectExercisesModal');
                    this.launchExercise(subj.name, ex);
                };
                listEl.appendChild(item);
            });
        }

        const modal = document.getElementById('subjectExercisesModal');
        if(modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
        }
    },

    launchExercise(subjectName, ex) {
        if(ex.mode === 'builtin') {
            this.openLab(ex.type);
        } else if(ex.mode === 'external') {
            this.openExternalLab(`${subjectName} — ${ex.title}`, ex.path);
        }
    },

    openExternalLab(fullTitle, relativePath) {
        const loader = document.getElementById('loading-overlay');
        const loadingTip = document.getElementById('loading-tip');
        if(loader) loader.classList.add('active');
        if(loadingTip) loadingTip.innerText = `💡 جاري تحميل بيئة المحاكاة ثلاثية الأبعاد (${fullTitle})...`;

        const resolvedUrl = resolveExercisePath(relativePath);
        currentExternalLabUrl = resolvedUrl;

        const titleEl = document.getElementById('external-lab-title');
        if(titleEl) titleEl.innerText = fullTitle;

        const frame = document.getElementById('external-lab-frame');
        if(frame) frame.src = resolvedUrl;

        setTimeout(() => {
            this.navigate('screen-external-lab');
            if(loader) loader.classList.remove('active');
        }, 700);
    },

    reloadExternalLab() {
        const frame = document.getElementById('external-lab-frame');
        if(frame && currentExternalLabUrl) {
            frame.src = 'about:blank';
            setTimeout(() => { frame.src = currentExternalLabUrl; }, 80);
        }
    },

    toggleFullscreenLab() {
        const wrapper = document.getElementById('external-lab-wrapper');
        if(!wrapper) return;
        if(!document.fullscreenElement) {
            if(wrapper.requestFullscreen) wrapper.requestFullscreen();
        } else {
            if(document.exitFullscreen) document.exitFullscreen();
        }
    },

    closeExternalLab(navigateBack = true) {
        const frame = document.getElementById('external-lab-frame');
        if(frame) {
            // تفريغ الـ iframe بالكامل لإغلاق سياق WebGL وتفريغ الرام وكرت الشاشة فوراً
            frame.src = 'about:blank';
        }
        if(document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        }
        if(navigateBack) {
            this.navigate('screen-subjects');
        }
    },

    openLab(type) {
        const loader = document.getElementById('loading-overlay');
        const loadingTip = document.getElementById('loading-tip');
        if(loader) loader.classList.add('active');
        if(loadingTip) {
            if(type === 'concrete') loadingTip.innerText = "💡 تلميح: يتم الآن تجهيز مكابس الضغط الخرسانية ومعايرتها...";
            else if (type === 'steel') loadingTip.innerText = "💡 تلميح: يتم الآن تجهيز فكوك الشد وتثبيت العينة الفولاذية...";
            else loadingTip.innerText = "💡 تلميح: يتم الآن تجهيز بيئة التحليل الإنشائي CAD...";
        }
        setTimeout(() => {
            if(type === 'concrete') { this.navigate('screen-concrete'); ConcreteLab.calculate(); }
            else if(type === 'steel') this.navigate('screen-steel');
            else if(type === 'cad') this.navigate('screen-cad');
            if(loader) loader.classList.remove('active');
        }, 1200);
    }
};

const ConcreteLab = {
    scene: null, camera: null, renderer: null, controls: null, cubeMesh: null, pressMesh: null, isCrushing: false,
    init3D() {
        const container = document.getElementById('concrete-canvas');
        if(!container) return;
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
        const cfElement = document.getElementById('c_shape');
        if(!cfElement) return;
        const cfValue = cfElement.value; const cf = parseFloat(cfValue);
        const t = parseFloat(document.getElementById('c_age').value) || 7; const nr = parseFloat(document.getElementById('c_force').value) || 53200;
        if (!this.isCrushing) { this.createSpecimenMesh(cfValue); this.pressMesh.position.y = 5.5; const btn = document.getElementById('btn-crush'); if(btn){ btn.innerText = "▶ تطبيق حمل الانكسار ديناميكياً"; btn.className = "btn btn-danger"; } }
        const Ac = (cf === 0.78) ? 10000 : 22500; let ct = 1.00;
        if(t >= 3 && t < 28) ct = 1 / (1.947 - (1.18 / Math.sqrt(Math.log10(t)))); 
        const f_prime_prime = (nr / Ac) * 10; const f_prime = cf * ct * f_prime_prime;
        
        const elCt = document.getElementById('res_ct'); if(elCt) elCt.innerText = ct.toFixed(2); 
        const elFpp = document.getElementById('res_f_prime_prime'); if(elFpp) elFpp.innerText = f_prime_prime.toFixed(2) + " MPa"; 
        const elFp = document.getElementById('res_f_prime'); if(elFp) elFp.innerText = f_prime.toFixed(2) + " MPa";
    },
    startSimulation() {
        if(this.isCrushing) return; 
        const btn = document.getElementById('btn-crush');
        if(btn) btn.classList.add('is-processing'); 
        this.isCrushing = true; let crushAmount = 0; const maxCrush = 1.3;
        
        const crushLoop = setInterval(() => {
            this.pressMesh.position.y -= 0.04;
            if(this.pressMesh.position.y <= 3.2) { this.cubeMesh.scale.y -= 0.02; this.cubeMesh.scale.x += 0.01; this.cubeMesh.scale.z += 0.01; crushAmount += 0.04; }
            if (crushAmount >= maxCrush) {
                clearInterval(crushLoop); this.cubeMesh.material.color.setHex(0xef4444); this.isCrushing = false;
                if(btn) { btn.classList.remove('is-processing'); btn.innerText = "▶ إعادة التجربة"; btn.className = "btn btn-danger"; }
            }
        }, 30);
    },
    onWindowResize() {
        if(!this.camera || !this.renderer) return; const container = document.getElementById('concrete-canvas');
        if(!container) return;
        this.camera.aspect = container.clientWidth / container.clientHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(container.clientWidth, container.clientHeight);
    },
    animate() { requestAnimationFrame(() => this.animate()); if(this.controls) this.controls.update(); if(this.renderer && this.scene && this.camera) this.renderer.render(this.scene, this.camera); }
};

const SteelLab = {
    scene: null, camera: null, renderer: null, controls: null, topGrip: null, bottomGrip: null, rebarMain: null, rebarTopHalf: null, rebarBottomHalf: null, isPulling: false, samples: [], sampleCounter: 1,
    init3D() {
        const container = document.getElementById('steel-canvas');
        if(!container) return;
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
        if(this.isPulling) return;
        this.isPulling = true;
        this.rebarMain.visible = true; this.rebarMain.scale.set(1, 1, 1); this.rebarMain.material.color.setHex(0x64748b);
        this.rebarTopHalf.visible = false; this.rebarBottomHalf.visible = false;
        this.topGrip.position.y = 5.5;
        const btn = document.getElementById('btn-pull');
        if(btn) { btn.innerText = "جاري الشد..."; btn.className = "btn btn-outline"; }
        let stretch = 0; const maxStretch = 0.25; 
        
        const pullLoop = setInterval(() => {
            stretch += 0.005; this.rebarMain.scale.y = 1 + stretch;
            const thinning = 1 - (stretch * 0.4); this.rebarMain.scale.x = thinning; this.rebarMain.scale.z = thinning;
            this.topGrip.position.y = 5.5 + (9 * stretch);
            if (stretch > maxStretch * 0.75) this.rebarMain.material.color.setHex(0xb91c1c); 
            if (stretch >= maxStretch) { 
                clearInterval(pullLoop); this.rebarMain.visible = false;
                this.rebarTopHalf.visible = true; this.rebarTopHalf.material.color.setHex(0xb91c1c);
                this.rebarTopHalf.scale.set(thinning, 1, thinning); this.rebarTopHalf.position.y = this.topGrip.position.y - 3.25;
                this.rebarBottomHalf.visible = true; this.rebarBottomHalf.material.color.setHex(0xb91c1c);
                this.rebarBottomHalf.scale.set(thinning, 1, thinning); this.rebarBottomHalf.position.y = this.bottomGrip.position.y + 3.25;
                this.isPulling = false;
                if(btn) { btn.innerText = "▶ إضافة النتيجة وإعادة التجربة"; btn.className = "btn btn-primary"; }
                this.addSampleToTable();
            }
        }, 30);
    },
    addSampleToTable() {
        const elDia = document.getElementById('s_dia'); const elForce = document.getElementById('s_force');
        if(!elDia || !elForce) return;
        const ds = parseFloat(elDia.value); const n_prime_y = parseFloat(elForce.value);
        const Ng = (ds <= 20) ? 400 : 1200; const As = (Math.PI * Math.pow(ds, 2)) / 4; const Ny = (n_prime_y - Ng) * 10; const fyi = Ny / As; 
        this.samples.push({ id: this.sampleCounter++, ds: ds, As: As.toFixed(2), Ng: Ng, Ny: Ny.toFixed(0), fyi: fyi.toFixed(2) });
        this.renderTable();
    },
    renderTable() {
        const tbody = document.getElementById('steel_table_body'); if(!tbody) return; tbody.innerHTML = '';
        this.samples.forEach(s => { tbody.innerHTML += `<tr><td>${s.id}</td><td>${s.ds}</td><td>${s.As}</td><td>${s.Ng}</td><td>${s.Ny}</td><td style="color: var(--primary, #0090ff); font-weight: bold;">${s.fyi}</td></tr>`; });
        if(this.samples.length > 0) { 
            const fym = this.samples.reduce((acc, curr) => acc + parseFloat(curr.fyi), 0) / this.samples.length; 
            const elFym = document.getElementById('stat_fym');
            if(elFym) elFym.innerText = fym.toFixed(2) + " MPa"; 
        }
    },
    onWindowResize() {
        if(!this.camera || !this.renderer) return; const container = document.getElementById('steel-canvas');
        if(!container) return;
        this.camera.aspect = container.clientWidth / container.clientHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(container.clientWidth, container.clientHeight);
    },
    animate() { requestAnimationFrame(() => this.animate()); if(this.controls) this.controls.update(); if(this.renderer && this.scene && this.camera) this.renderer.render(this.scene, this.camera); }
};

const CADLab = {
    init() { this.recalculate(); },
    recalculate() {
        const spanInput = document.getElementById('spanInput'); if(!spanInput) return;
        const L = parseFloat(spanInput.value); const q = parseFloat(document.getElementById('loadInput').value); const h = parseFloat(document.getElementById('depthInput').value);
        
        const elSpan = document.getElementById('spanVal'); if(elSpan) elSpan.innerText = L.toFixed(1) + " m"; 
        const elLoad = document.getElementById('loadVal'); if(elLoad) elLoad.innerText = q.toFixed(0) + " kN/m"; 
        const elDepth = document.getElementById('depthVal'); if(elDepth) elDepth.innerText = h.toFixed(0) + " cm";
        
        const mMax = (q * Math.pow(L, 2)) / 8; const vMax = (q * L) / 2;
        let rebarText = "3 T 14"; if(mMax > 80 && mMax <= 150) rebarText = "4 T 16"; else if(mMax > 150 && mMax <= 250) rebarText = "5 T 18"; else if(mMax > 250) rebarText = "6 T 20";
        
        const elMMax = document.getElementById('mMaxVal'); if(elMMax) elMMax.innerText = mMax.toFixed(1) + " kN.m"; 
        const elVMax = document.getElementById('vMaxVal'); if(elVMax) elVMax.innerText = vMax.toFixed(1) + " kN"; 
        const elRebar = document.getElementById('rebarVal'); if(elRebar) elRebar.innerText = rebarText;
        
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
        ctx.fillStyle = "#334155"; ctx.font = "bold 14px Tajawal, Segoe UI"; ctx.fillText(`مخطط الانحناء الديناميكي لجائز بطول L = ${L}m بحمل q = ${q}kN/m`, canvas.width / 2 - 160, 40);
    },
    simulateEarthquake() {
        const canvas = document.getElementById('cadCanvas'); if(!canvas) return;
        let shakes = 0; const interval = setInterval(() => { canvas.style.transform = `translate(${Math.random()*12 - 6}px,${Math.random()*12 - 6}px)`; shakes++; if(shakes > 20) { clearInterval(interval); canvas.style.transform = 'none'; } }, 50);
    }
};

if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(()=>{}); }); }

const TrialManager = {
    TRIAL_DURATION: 24 * 60 * 60 * 1000,
    checkStatus() {
        if (ActivationManager.isPremium()) { this.updateBadge(true, 999); return true; }
        let startTime = localStorage.getItem('lamsa_trial_start');
        if (!startTime) { startTime = Date.now(); localStorage.setItem('lamsa_trial_start', startTime); this.updateBadge(true, 24); return true; }
        const elapsed = Date.now() - parseInt(startTime);
        const remainingHours = Math.max(0, (this.TRIAL_DURATION - elapsed) / (1000 * 60 * 60));
        if (elapsed >= this.TRIAL_DURATION) { this.lockApp(); return false; } 
        else { this.updateBadge(true, remainingHours); setTimeout(() => { this.lockApp(); }, this.TRIAL_DURATION - elapsed); return true; }
    },
    lockApp() {
        const lockScreen = document.getElementById('trial-expired-screen');
        if(lockScreen) lockScreen.classList.add('active');
        this.updateBadge(false, 0);
    },
    updateBadge(isActive, hours) {
        const badge = document.getElementById('trial-badge');
        if(badge) {
            if(ActivationManager.isPremium()) { badge.innerText = `👑 اشتراك VIP مفعل`; return; }
            if(isActive) { badge.innerText = `⏳ تجريبي: متبقي ${hours.toFixed(1)} ساعة`; } 
            else { badge.innerText = `🔒 حساب منتهي الصلاحية`; badge.style.color = "var(--danger, #ef4444)"; badge.style.background = "#fee2e2"; }
        }
    }
};

const SubscriptionFlow = {
    selectedPackage: null,

    openPackages() {
        document.getElementById('trial-expired-screen').classList.remove('active');
        document.getElementById('packages-screen').classList.add('active');
    },

    async selectPackage(type) {
        let pkgName = type === 'student' ? "باقة الطالب (1$ - 5 سنوات)" : "باقة المهندس (5$ - مدى الحياة)";
        let priceText = type === 'student' ? "رسوم الاشتراك: 15,000 ل.س / لـ 5 سنوات" : "رسوم الاشتراك: 75,000 ل.س / مدى الحياة (VIP)";

        SubscriptionFlow.selectedPackage = { type, pkgName, priceText };
        
        const dynamicPriceEl = document.getElementById('dynamic-price');
        if(dynamicPriceEl) dynamicPriceEl.innerText = priceText;

        currentActivationCode = 'LAMSA-' + Math.floor(1000 + Math.random() * 9000).toString();
        localStorage.setItem('lamseh_pending_code', currentActivationCode);

        try {
            const { error } = await supabaseClient.from('activation_codes').insert([{ code: currentActivationCode, is_used: false }]);
            if (error) throw error;
        } catch (err) {
            console.error("لم يتم تسجيل الكود:", err);
        }

        SubscriptionFlow.sendIntentToTelegram();

        const pkgsScreen = document.getElementById('packages-screen');
        const actScreen = document.getElementById('activation-screen');
        if(pkgsScreen) pkgsScreen.classList.remove('active');
        if(actScreen) actScreen.classList.add('active');
    },

    sendIntentToTelegram() {
        if(!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "ضع_التوكن_الخاص_بالبوت_هنا") return;
        
        const studentName = currentUser.name ? currentUser.name : 'طالب';
        const studentPhone = currentUser.phone ? currentUser.phone : 'غير مدرج';
        const pkgName = SubscriptionFlow.selectedPackage ? SubscriptionFlow.selectedPackage.pkgName : '';
        
        const text = "🚀 **تنبيه اشتراك جديد:**\n" +
                     "👤 الاسم: " + studentName + "\n" +
                     "📱 الهاتف: " + studentPhone + "\n" +
                     "📦 الباقة: " + pkgName + "\n" +
                     "🔑 **كود التفعيل المقترح:** `" + currentActivationCode + "`";
                     
        fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text, parse_mode: 'Markdown' }) 
        }).catch(err => console.error(err));
    },

    copyShamcashID(btnElement) {
        const transactionCode = "fc341c81849ed48ed179942abf9e2b29";
        
        navigator.clipboard.writeText(transactionCode).then(() => {
            const originalText = btnElement.innerHTML;
            btnElement.innerHTML = "تم النسخ ✔️";
            btnElement.style.background = "var(--success, #10b981)";
            btnElement.style.color = "#fff";
            btnElement.style.borderColor = "var(--success, #10b981)";
            
            setTimeout(() => {
                btnElement.innerHTML = originalText;
                btnElement.style.background = "transparent";
                btnElement.style.color = "var(--primary, #0090ff)";
                btnElement.style.borderColor = "var(--primary, #0090ff)";
            }, 2000);
        });
    }
};

const ActivationManager = {
    isPremium() { return localStorage.getItem('lamsa_premium_status') === 'activated'; },
    async verifyCode() {
        const inputField = document.getElementById('activation-code');
        const errorMsg = document.getElementById('activation-error');
        if(!inputField) return;
        const code = inputField.value.trim().toUpperCase();
        const studentId = localStorage.getItem('lamsa_student_id');

        if (!studentId) { alert("يرجى تسجيل الدخول أولاً."); return; }

        const btn = event.target; const originalText = btn.innerText;
        btn.innerText = "جاري التحقق ⏳..."; btn.disabled = true;

        try {
            const { data: codeData, error: codeError } = await supabaseClient.from('activation_codes').select('*').eq('code', code).single();

            if (codeError || !codeData || codeData.is_used) {
                if(errorMsg) { errorMsg.innerText = codeData?.is_used ? "❌ هذا الكود مستخدم ومحروق مسبقاً!" : "❌ الكود غير صحيح، يرجى التأكد."; errorMsg.style.display = 'block'; }
                inputField.style.borderColor = "var(--danger, #ef4444)"; return;
            }

            await supabaseClient.from('activation_codes').update({ is_used: true, used_by: studentId, used_at: new Date().toISOString() }).eq('id', codeData.id);
            await supabaseClient.from('students').update({ is_premium: true }).eq('id', studentId);

            if(errorMsg) errorMsg.style.display = 'none';
            inputField.style.borderColor = "var(--surface-300, #e2e8f0)";
            localStorage.setItem('lamsa_premium_status', 'activated');
            isActivated = true;
            alert("🎉 تم تفعيل حسابك بنجاح!");
            
            const actScreen = document.getElementById('activation-screen');
            if(actScreen) actScreen.classList.remove('active');
            const lockScreen = document.getElementById('trial-expired-screen');
            if(lockScreen) lockScreen.classList.remove('active');

        } catch (err) {
            console.error("Activation Error:", err); alert("⚠️ تأكد من اتصالك بالإنترنت.");
        } finally {
            if(btn) { btn.innerText = originalText; btn.disabled = false; }
        }
    }
};

const SidebarEngine = {
    openSettings() {
        AppEngine.toggleSidebar();
        document.getElementById('editName').value = currentUser.name || '';
        document.getElementById('editPhone').value = currentUser.phone || '';
        
        const modal = document.getElementById('settingsModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    },
    
    saveSettings() {
        const newName = document.getElementById('editName').value.trim();
        if(newName) {
            currentUser.name = newName;
            localStorage.setItem('lamseh_user', JSON.stringify(currentUser));
            
            const sidebarNameEl = document.getElementById('sidebar-name');
            const displayStudentEl = document.getElementById('displayStudentName');
            if(sidebarNameEl) sidebarNameEl.innerText = newName;
            if(displayStudentEl) displayStudentEl.innerText = newName;
            
            alert("تم تحديث بياناتك بنجاح ✅");
            this.closeModal('settingsModal');
        }
    },
    
    logout() {
        if(confirm("هل أنت متأكد من تسجيل الخروج؟ سيطلب منك النظام تسجيل الدخول من جديد.")) {
            localStorage.removeItem('lamseh_user');
            localStorage.removeItem('lamsa_student_id');
            location.reload(); 
        }
    },
    
    openSubscription() {
        AppEngine.toggleSidebar();
        const content = document.getElementById('subStatusContent');
        const btnUpgrade = document.getElementById('btnUpgradeFromSidebar');
        
        if (ActivationManager.isPremium()) {
            content.innerHTML = `
                <span style="font-size: 3.5rem; display: block; margin-bottom: 10px;">👑</span>
                <strong style="color: #10b981; font-size: 1.3rem;">اشتراك مفعل (VIP)</strong><br>
                <span style="font-size: 0.95rem; color: var(--text-muted, #64748b); display: block; margin-top: 10px;">حسابك يمتلك وصولاً كاملاً وغير محدود لكافة المخابر الافتراضية.</span>
            `;
            btnUpgrade.style.display = 'none';
        } else {
            let startTime = localStorage.getItem('lamsa_trial_start');
            let elapsed = startTime ? (Date.now() - parseInt(startTime)) : 0;
            let remainingHours = Math.max(0, (TrialManager.TRIAL_DURATION - elapsed) / (1000 * 60 * 60));
            
            if (remainingHours > 0) {
                content.innerHTML = `
                    <span style="font-size: 3.5rem; display: block; margin-bottom: 10px;">⏳</span>
                    <strong style="color: #f59e0b; font-size: 1.3rem;">فترة تجريبية نشطة</strong><br>
                    <span style="font-size: 0.95rem; color: var(--text-muted, #64748b); display: block; margin-top: 10px;">الوقت المتبقي: <strong>${remainingHours.toFixed(1)} ساعة</strong></span>
                `;
                btnUpgrade.style.display = 'block';
            } else {
                content.innerHTML = `
                    <span style="font-size: 3.5rem; display: block; margin-bottom: 10px;">🔒</span>
                    <strong style="color: var(--danger, #ef4444); font-size: 1.3rem;">انتهت الفترة التجريبية</strong><br>
                    <span style="font-size: 0.95rem; color: var(--text-muted, #64748b); display: block; margin-top: 10px;">توقفت المخابر عن العمل. يرجى ترقية حسابك لمتابعة الاستخدام.</span>
                `;
                btnUpgrade.style.display = 'block';
            }
        }
        
        const modal = document.getElementById('subStatusModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    },
    
    openAbout() {
        AppEngine.toggleSidebar();
        const modal = document.getElementById('aboutModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    },
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if(!modal) return;
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
};

window.onload = () => AppEngine.init();