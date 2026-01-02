// CV Builder JavaScript - Enhanced Version
let cvData = {
    photo: null,
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    github: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    awards: [],
    interests: '',
    references: []
};

let currentTemplate = 'modern';
let userSubscription = null;
let isLoggedIn = false;
let paymentType = null;
let currentSection = 'personal';

// Counters for dynamic items
let counters = { exp: 0, edu: 0, skill: 0, lang: 0, cert: 0, proj: 0, award: 0, ref: 0 };

document.addEventListener('DOMContentLoaded', () => {
    initBuilder();
    setupFormListeners();
    setupPhotoUpload();
    loadFromURL();
    initProgressBar();
    initSmartTips();
});

function initBuilder() {
    // Load sample data for fuller preview
    loadSampleData();

    addExperience();
    addEducation();
    addSkill(); addSkill(); addSkill();
    addLanguage(); addLanguage();

    document.querySelectorAll('.section-header-form').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.section-toggle i');
            content.classList.toggle('collapsed');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');

            // Update current section for tips
            const section = header.closest('.form-section');
            if (section) {
                currentSection = section.dataset.section || 'personal';
                updateSmartTips(currentSection);
            }
        });
    });

    const templateSelect = document.getElementById('templateSelect');
    if (templateSelect) {
        templateSelect.addEventListener('change', (e) => {
            currentTemplate = e.target.value;
            updatePreview();
        });
    }

    // Listen for language changes
    window.addEventListener('languageChanged', updatePreview);

    // Setup section focus tracking
    document.querySelectorAll('.form-section').forEach(section => {
        section.addEventListener('focusin', () => {
            currentSection = section.dataset.section || 'personal';
            updateSmartTips(currentSection);
        });
    });
}

function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const template = params.get('template');
    if (template) {
        currentTemplate = template;
        const select = document.getElementById('templateSelect');
        if (select) select.value = template;
    }
    updatePreview();
}

function setupFormListeners() {
    const fields = ['firstName', 'lastName', 'jobTitle', 'email', 'phone', 'location', 'linkedin', 'website', 'github', 'summary', 'interests'];
    fields.forEach(field => {
        const el = document.getElementById(field);
        if (el) {
            el.addEventListener('input', (e) => {
                cvData[field] = e.target.value;
                updatePreview();
            });
        }
    });
}

function setupPhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');

    if (photoUpload && photoInput) {
        photoUpload.addEventListener('click', () => photoInput.click());
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    cvData.photo = e.target.result;
                    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Photo">`;
                    updatePreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function loadPhotoFromUrl(url) {
    if (url && url.trim()) {
        cvData.photo = url.trim();
        const photoPreview = document.getElementById('photoPreview');
        if (photoPreview) {
            photoPreview.innerHTML = `<img src="${url}" alt="Photo" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-exclamation-triangle\\'></i><span>خطأ</span>'">`;
        }
        updatePreview();
    }
}

// Dynamic Item Functions
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const id = counters.exp++;
    const html = `
        <div class="dynamic-item" id="exp-${id}">
            <div class="item-header"><span>خبرة ${id + 1}</span><button type="button" class="btn-remove" onclick="removeItem('exp-${id}', 'experience', ${id})"><i class="fas fa-times"></i></button></div>
            <div class="form-group"><label>المسمى الوظيفي</label><input type="text" onchange="updateField('experience',${id},'title',this.value)" placeholder="مهندس برمجيات أول"></div>
            <div class="form-group"><label>الشركة</label><input type="text" onchange="updateField('experience',${id},'company',this.value)" placeholder="شركة التقنية المتقدمة"></div>
            <div class="form-row">
                <div class="form-group"><label>من</label><input type="text" onchange="updateField('experience',${id},'from',this.value)" placeholder="يناير 2020"></div>
                <div class="form-group"><label>إلى</label><input type="text" onchange="updateField('experience',${id},'to',this.value)" placeholder="حتى الآن"></div>
            </div>
            <div class="form-group"><label>الموقع</label><input type="text" onchange="updateField('experience',${id},'location',this.value)" placeholder="الرياض، السعودية"></div>
            <div class="form-group"><label>الوصف والإنجازات</label><textarea rows="4" onchange="updateField('experience',${id},'description',this.value)" placeholder="• قيادة فريق من 5 مطورين
• تطوير نظام إدارة المحتوى
• تحسين أداء التطبيق بنسبة 40%"></textarea></div>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    cvData.experience.push({ id, title: '', company: '', from: '', to: '', location: '', description: '' });
}

function addEducation() {
    const container = document.getElementById('educationContainer');
    const id = counters.edu++;
    const html = `
        <div class="dynamic-item" id="edu-${id}">
            <div class="item-header"><span>تعليم ${id + 1}</span><button type="button" class="btn-remove" onclick="removeItem('edu-${id}', 'education', ${id})"><i class="fas fa-times"></i></button></div>
            <div class="form-group"><label>الدرجة العلمية</label><input type="text" onchange="updateField('education',${id},'degree',this.value)" placeholder="بكالوريوس هندسة حاسب"></div>
            <div class="form-group"><label>الجامعة/المؤسسة</label><input type="text" onchange="updateField('education',${id},'institution',this.value)" placeholder="جامعة الملك سعود"></div>
            <div class="form-row">
                <div class="form-group"><label>من</label><input type="text" onchange="updateField('education',${id},'from',this.value)" placeholder="2016"></div>
                <div class="form-group"><label>إلى</label><input type="text" onchange="updateField('education',${id},'to',this.value)" placeholder="2020"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>المعدل</label><input type="text" onchange="updateField('education',${id},'gpa',this.value)" placeholder="3.8/4.0"></div>
                <div class="form-group"><label>الموقع</label><input type="text" onchange="updateField('education',${id},'location',this.value)" placeholder="الرياض"></div>
            </div>
            <div class="form-group"><label>الإنجازات</label><textarea rows="2" onchange="updateField('education',${id},'achievements',this.value)" placeholder="مرتبة الشرف، مشروع التخرج الأفضل"></textarea></div>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    cvData.education.push({ id, degree: '', institution: '', from: '', to: '', gpa: '', location: '', achievements: '' });
}

function addSkill() {
    const container = document.getElementById('skillsContainer');
    const id = counters.skill++;
    const html = `
        <div class="skill-item" id="skill-${id}">
            <input type="text" placeholder="JavaScript, Python, إدارة المشاريع..." onchange="updateField('skills',${id},'name',this.value)">
            <select onchange="updateField('skills',${id},'level',parseInt(this.value))">
                <option value="5">خبير</option>
                <option value="4" selected>متقدم</option>
                <option value="3">متوسط</option>
                <option value="2">مبتدئ</option>
            </select>
            <button type="button" class="btn-remove" onclick="removeItem('skill-${id}', 'skills', ${id})"><i class="fas fa-times"></i></button>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    cvData.skills.push({ id, name: '', level: 4 });
}

function addLanguage() {
    const container = document.getElementById('languagesContainer');
    const id = counters.lang++;
    const html = `
        <div class="skill-item" id="lang-${id}">
            <input type="text" placeholder="العربية، الإنجليزية..." onchange="updateField('languages',${id},'name',this.value)">
            <select onchange="updateField('languages',${id},'level',parseInt(this.value))">
                <option value="5">لغة أم</option>
                <option value="4">طلاقة</option>
                <option value="3" selected>متقدم</option>
                <option value="2">متوسط</option>
                <option value="1">أساسي</option>
            </select>
            <button type="button" class="btn-remove" onclick="removeItem('lang-${id}', 'languages', ${id})"><i class="fas fa-times"></i></button>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    cvData.languages.push({ id, name: '', level: 3 });
}

function addCertification() {
    const container = document.getElementById('certificationsContainer');
    const id = counters.cert++;
    const html = `
        <div class="dynamic-item" id="cert-${id}">
            <div class="item-header"><span>شهادة ${id + 1}</span><button type="button" class="btn-remove" onclick="removeItem('cert-${id}', 'certifications', ${id})"><i class="fas fa-times"></i></button></div>
            <div class="form-group"><label>اسم الشهادة</label><input type="text" onchange="updateField('certifications',${id},'name',this.value)" placeholder="AWS Certified Solutions Architect"></div>
            <div class="form-row">
                <div class="form-group"><label>الجهة المانحة</label><input type="text" onchange="updateField('certifications',${id},'issuer',this.value)" placeholder="Amazon Web Services"></div>
                <div class="form-group"><label>تاريخ الحصول</label><input type="text" onchange="updateField('certifications',${id},'date',this.value)" placeholder="مارس 2023"></div>
            </div>
            <div class="form-group"><label>رابط الشهادة</label><input type="url" onchange="updateField('certifications',${id},'link',this.value)" placeholder="https://..."></div>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    cvData.certifications.push({ id, name: '', issuer: '', date: '', link: '' });
}

function addProject() {
    const container = document.getElementById('projectsContainer');
    const id = counters.proj++;
    const html = `
        <div class="dynamic-item" id="proj-${id}">
            <div class="item-header"><span>مشروع ${id + 1}</span><button type="button" class="btn-remove" onclick="removeItem('proj-${id}', 'projects', ${id})"><i class="fas fa-times"></i></button></div>
            <div class="form-group"><label>اسم المشروع</label><input type="text" onchange="updateField('projects',${id},'name',this.value)" placeholder="نظام إدارة المهام"></div>
            <div class="form-group"><label>الوصف</label><textarea rows="3" onchange="updateField('projects',${id},'description',this.value)" placeholder="تطبيق ويب لإدارة المهام والمشاريع باستخدام React و Node.js"></textarea></div>
            <div class="form-group"><label>التقنيات المستخدمة</label><input type="text" onchange="updateField('projects',${id},'technologies',this.value)" placeholder="React, Node.js, MongoDB"></div>
            <div class="form-group"><label>رابط المشروع</label><input type="url" onchange="updateField('projects',${id},'link',this.value)" placeholder="https://github.com/..."></div>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    cvData.projects.push({ id, name: '', description: '', technologies: '', link: '' });
}

function addAward() {
    const container = document.getElementById('awardsContainer');
    const id = counters.award++;
    const html = `
        <div class="dynamic-item" id="award-${id}">
            <div class="item-header"><span>جائزة ${id + 1}</span><button type="button" class="btn-remove" onclick="removeItem('award-${id}', 'awards', ${id})"><i class="fas fa-times"></i></button></div>
            <div class="form-group"><label>اسم الجائزة</label><input type="text" onchange="updateField('awards',${id},'name',this.value)" placeholder="موظف الشهر"></div>
            <div class="form-row">
                <div class="form-group"><label>الجهة المانحة</label><input type="text" onchange="updateField('awards',${id},'issuer',this.value)" placeholder="الشركة"></div>
                <div class="form-group"><label>التاريخ</label><input type="text" onchange="updateField('awards',${id},'date',this.value)" placeholder="2023"></div>
            </div>
            <div class="form-group"><label>الوصف</label><input type="text" onchange="updateField('awards',${id},'description',this.value)" placeholder="تكريم للإنجاز المتميز"></div>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    cvData.awards.push({ id, name: '', issuer: '', date: '', description: '' });
}

function addReference() {
    const container = document.getElementById('referencesContainer');
    const id = counters.ref++;
    const html = `
        <div class="dynamic-item" id="ref-${id}">
            <div class="item-header"><span>مرجع ${id + 1}</span><button type="button" class="btn-remove" onclick="removeItem('ref-${id}', 'references', ${id})"><i class="fas fa-times"></i></button></div>
            <div class="form-row">
                <div class="form-group"><label>الاسم</label><input type="text" onchange="updateField('references',${id},'name',this.value)" placeholder="د. محمد أحمد"></div>
                <div class="form-group"><label>المنصب</label><input type="text" onchange="updateField('references',${id},'position',this.value)" placeholder="مدير قسم التطوير"></div>
            </div>
            <div class="form-group"><label>الشركة</label><input type="text" onchange="updateField('references',${id},'company',this.value)" placeholder="شركة التقنية"></div>
            <div class="form-row">
                <div class="form-group"><label>البريد</label><input type="email" onchange="updateField('references',${id},'email',this.value)" placeholder="ref@company.com"></div>
                <div class="form-group"><label>الهاتف</label><input type="tel" onchange="updateField('references',${id},'phone',this.value)" placeholder="+966 5xxxxxxxx"></div>
            </div>
        </div>`;
    container.insertAdjacentHTML('beforeend', html);
    cvData.references.push({ id, name: '', position: '', company: '', email: '', phone: '' });
}

function updateField(array, id, field, value) {
    const item = cvData[array].find(e => e.id === id);
    if (item) item[field] = value;
    updatePreview();
}

function removeItem(elementId, arrayName, itemId) {
    document.getElementById(elementId)?.remove();
    cvData[arrayName] = cvData[arrayName].filter(item => item.id !== itemId);
    updatePreview();
}

// Preview Update
function updatePreview() {
    const preview = document.getElementById('cvPreview');
    if (!preview) return;
    preview.className = `cv-preview ${currentTemplate}`;
    preview.innerHTML = generateCVHTML();
}

function generateCVHTML() {
    const fullName = `${cvData.firstName} ${cvData.lastName}`.trim() || 'اسمك الكامل';
    const title = cvData.jobTitle || 'المسمى الوظيفي';

    const generators = {
        modern: () => generateModernTemplate(fullName, title),
        classic: () => generateClassicTemplate(fullName, title),
        creative: () => generateCreativeTemplate(fullName, title),
        minimal: () => generateMinimalTemplate(fullName, title),
        executive: () => generateExecutiveTemplate(fullName, title),
        tech: () => generateTechTemplate(fullName, title),
        designer: () => generateDesignerTemplate(fullName, title),
        graduate: () => generateGraduateTemplate(fullName, title),
        corporate: () => generateCorporateTemplate(fullName, title),
        elegant: () => generateElegantTemplate(fullName, title),
        bold: () => generateBoldTemplate(fullName, title),
        academic: () => generateAcademicTemplate(fullName, title),
        // New Templates
        timeline: () => generateTimelineTemplate(fullName, title),
        split: () => generateSplitTemplate(fullName, title),
        neon: () => generateNeonTemplate(fullName, title),
        luxury: () => generateLuxuryTemplate(fullName, title),
        infographic: () => generateInfographicTemplate(fullName, title),
        dark: () => generateDarkTemplate(fullName, title)
    };

    return (generators[currentTemplate] || generators.modern)();
}

// Template Generators
function generateModernTemplate(name, title) {
    return `
        <div class="cv-modern-header">
            ${generatePhoto('cv-photo')}
            <div class="cv-header-info">
                <div class="cv-name">${name}</div>
                <div class="cv-title">${title}</div>
                ${generateContactRow()}
            </div>
        </div>
        <div class="cv-modern-body">
            ${generateSummarySection()}
            ${generateExperienceSection()}
            ${generateEducationSection()}
            ${generateSkillsSection()}
            ${generateCertificationsSection()}
            ${generateProjectsSection()}
            ${generateLanguagesSection()}
            ${generateAwardsSection()}
            ${generateInterestsSection()}
            ${generateReferencesSection()}
        </div>`;
}

function generateClassicTemplate(name, title) {
    return `
        <div class="cv-classic-header">
            <div style="display:flex;align-items:center;gap:25px;justify-content:center">
                ${generatePhoto('cv-photo')}
                <div style="text-align:center">
                    <div class="cv-name">${name}</div>
                    <div class="cv-title">${title}</div>
                    <div class="cv-classic-contact">${cvData.email ? `<span>${cvData.email}</span>` : ''}${cvData.phone ? `<span>${cvData.phone}</span>` : ''}${cvData.location ? `<span>${cvData.location}</span>` : ''}</div>
                </div>
            </div>
        </div>
        <div class="cv-classic-body">
            ${generateSummarySection()}
            ${generateExperienceSection()}
            ${generateEducationSection()}
            ${generateSkillsSection()}
            ${generateCertificationsSection()}
            ${generateLanguagesSection()}
        </div>`;
}

function generateCreativeTemplate(name, title) {
    return `
        <div class="cv-creative-sidebar">
            ${generatePhoto('cv-creative-photo')}
            <div class="cv-creative-name">${name}</div>
            <div class="cv-creative-title">${title}</div>
            <div class="cv-creative-section"><div class="cv-creative-section-title">التواصل</div>
                ${cvData.email ? `<div class="cv-creative-contact-item"><i class="fas fa-envelope"></i> ${cvData.email}</div>` : ''}
                ${cvData.phone ? `<div class="cv-creative-contact-item"><i class="fas fa-phone"></i> ${cvData.phone}</div>` : ''}
                ${cvData.location ? `<div class="cv-creative-contact-item"><i class="fas fa-map-marker-alt"></i> ${cvData.location}</div>` : ''}
                ${cvData.linkedin ? `<div class="cv-creative-contact-item"><i class="fab fa-linkedin"></i> LinkedIn</div>` : ''}
                ${cvData.github ? `<div class="cv-creative-contact-item"><i class="fab fa-github"></i> GitHub</div>` : ''}
            </div>
            ${generateCreativeSkillsSection()}
            ${generateCreativeLanguagesSection()}
        </div>
        <div class="cv-creative-main">
            ${generateSummarySection()}
            ${generateExperienceSection()}
            ${generateEducationSection()}
            ${generateCertificationsSection()}
            ${generateProjectsSection()}
        </div>`;
}

function generateMinimalTemplate(name, title) {
    return `
        <div class="cv-minimal-header" style="display:flex;align-items:center;gap:20px">
            ${generatePhoto('cv-photo')}
            <div>
                <div class="cv-minimal-name">${name}</div>
                <div class="cv-minimal-title">${title}</div>
                <div class="cv-minimal-contact">${cvData.email || ''} | ${cvData.phone || ''} | ${cvData.location || ''}</div>
            </div>
        </div>
        <div class="cv-minimal-body">
            ${generateSummarySection()}
            ${generateExperienceSection()}
            ${generateEducationSection()}
            ${generateSkillsSection()}
            ${generateLanguagesSection()}
        </div>`;
}

function generateExecutiveTemplate(name, title) {
    return `
        <div class="cv-executive-header">
            ${generatePhoto('cv-photo')}
            <div class="cv-header-info" style="color:white">
                <div class="cv-name">${name}</div>
                <div class="cv-title" style="opacity:0.9">${title}</div>
                ${generateContactRow('rgba(255,255,255,0.8)')}
            </div>
        </div>
        <div class="cv-executive-body">
            ${generateSummarySection('#ccc')}
            ${generateExperienceSection('#ccc')}
            ${generateEducationSection('#ccc')}
            ${generateSkillsSection()}
            ${generateAwardsSection('#ccc')}
        </div>`;
}

function generateTechTemplate(name, title) {
    return `
        <div class="cv-tech-header">
            <div style="display:flex;align-items:center;gap:20px">
                ${cvData.photo ? `<img src="${cvData.photo}" style="width:80px;height:80px;border-radius:10px;border:3px solid #58a6ff;object-fit:cover">` : `<div style="width:80px;height:80px;border-radius:10px;background:#21262d;border:3px solid #58a6ff;display:flex;align-items:center;justify-content:center"><i class="fas fa-terminal" style="font-size:30px;color:#58a6ff"></i></div>`}
                <div>
                    <div class="cv-tech-code">const developer = {</div>
                    <div class="cv-tech-name">${name}</div>
                    <div class="cv-title" style="color:#8b949e">${title}</div>
                </div>
            </div>
            <div style="color:#58a6ff;font-size:10pt;margin-top:10px">
                ${cvData.github ? `<span style="margin-left:15px"><i class="fab fa-github"></i> ${cvData.github}</span>` : ''}
                ${cvData.linkedin ? `<span style="margin-left:15px"><i class="fab fa-linkedin"></i> LinkedIn</span>` : ''}
            </div>
        </div>
        <div class="cv-tech-body">
            ${generateSummarySection('#8b949e')}
            ${generateTechSkillsSection()}
            ${generateExperienceSection('#8b949e')}
            ${generateProjectsSection('#8b949e')}
            ${generateEducationSection('#8b949e')}
        </div>`;
}

function generateDesignerTemplate(name, title) {
    return `
        <div class="cv-designer-header">
            ${generatePhoto('cv-designer-photo')}
            <div class="cv-designer-name">${name}</div>
            <div style="opacity:0.85">${title}</div>
        </div>
        <div class="cv-designer-body">
            ${generateSummarySection('rgba(255,255,255,0.9)')}
            ${generateDesignerExperienceSection()}
            ${generateProjectsSection('rgba(255,255,255,0.9)')}
            ${generateSkillsSection()}
        </div>`;
}

function generateGraduateTemplate(name, title) {
    return `
        <div class="cv-graduate-header">
            <div style="display:flex;align-items:center;gap:20px;justify-content:center">
                ${generatePhoto('cv-photo')}
                <div style="text-align:center">
                    <div class="cv-graduate-icon">🎓</div>
                    <div class="cv-graduate-name">${name}</div>
                    <div class="cv-graduate-title">${title}</div>
                    <div style="font-size:10pt;color:#64748b;margin-top:10px">${cvData.email || ''} | ${cvData.phone || ''}</div>
                </div>
            </div>
        </div>
        <div class="cv-graduate-body">
            ${generateSummarySection()}
            ${generateEducationSection()}
            ${generateSkillsSection()}
            ${generateProjectsSection()}
            ${generateCertificationsSection()}
            ${generateExperienceSection()}
            ${generateLanguagesSection()}
        </div>`;
}

function generateCorporateTemplate(name, title) {
    return `
        <div style="background:#1e3a5f;color:white;padding:40px;display:flex;align-items:center;gap:30px">
            ${generatePhoto('cv-photo')}
            <div>
                <div style="font-size:28pt;font-weight:800">${name}</div>
                <div style="font-size:14pt;opacity:0.9">${title}</div>
                <div style="margin-top:15px;font-size:10pt;opacity:0.8">${cvData.email || ''} | ${cvData.phone || ''} | ${cvData.location || ''}</div>
            </div>
        </div>
        <div style="padding:35px 40px">
            ${generateSummarySection()}
            ${generateExperienceSection()}
            ${generateEducationSection()}
            ${generateSkillsSection()}
            ${generateCertificationsSection()}
        </div>`;
}

function generateElegantTemplate(name, title) {
    return `
        <div style="text-align:center;padding:50px 40px;border-bottom:3px double #c9a961">
            ${cvData.photo ? `<img src="${cvData.photo}" style="width:130px;height:130px;border-radius:50%;border:4px solid #c9a961;object-fit:cover;margin-bottom:20px">` : ''}
            <div style="font-size:30pt;font-weight:300;color:#2c3e50;letter-spacing:3px">${name}</div>
            <div style="font-size:12pt;color:#c9a961;text-transform:uppercase;letter-spacing:2px;margin-top:10px">${title}</div>
        </div>
        <div style="padding:40px">
            ${generateSummarySection()}
            ${generateExperienceSection()}
            ${generateEducationSection()}
            ${generateSkillsSection()}
            ${generateLanguagesSection()}
        </div>`;
}

function generateBoldTemplate(name, title) {
    return `
        <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:50px 40px">
            <div style="display:flex;align-items:center;gap:25px">
                ${cvData.photo ? `<img src="${cvData.photo}" style="width:100px;height:100px;border-radius:50%;border:4px solid white;object-fit:cover">` : ''}
                <div>
                    <div style="font-size:36pt;font-weight:900">${name}</div>
                    <div style="font-size:16pt;opacity:0.9;margin-top:10px">${title}</div>
                </div>
            </div>
            <div style="display:flex;gap:20px;margin-top:20px;font-size:11pt">
                ${cvData.email ? `<span><i class="fas fa-envelope"></i> ${cvData.email}</span>` : ''}
                ${cvData.phone ? `<span><i class="fas fa-phone"></i> ${cvData.phone}</span>` : ''}
            </div>
        </div>
        <div style="padding:40px">
            ${generateSummarySection()}
            ${generateExperienceSection()}
            ${generateEducationSection()}
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px">
                <div>${generateSkillsSection()}</div>
                <div>${generateLanguagesSection()}</div>
            </div>
        </div>`;
}

function generateAcademicTemplate(name, title) {
    return `
        <div style="padding:40px;border-bottom:2px solid #2c5282;display:flex;align-items:center;gap:25px">
            ${generatePhoto('cv-photo')}
            <div>
                <div style="font-size:26pt;font-weight:700;color:#2c5282">${name}</div>
                <div style="font-size:12pt;color:#4a5568;margin-top:5px">${title}</div>
                <div style="font-size:10pt;color:#718096;margin-top:10px">${cvData.email || ''} | ${cvData.location || ''}</div>
            </div>
        </div>
        <div style="padding:40px">
            ${generateSummarySection()}
            ${generateEducationSection()}
            ${generateExperienceSection()}
            ${generateProjectsSection()}
            ${generateCertificationsSection()}
            ${generateSkillsSection()}
            ${generateReferencesSection()}
        </div>`;
}

// ============== NEW TEMPLATES ==============

// Timeline Template - خط زمني
function generateTimelineTemplate(name, title) {
    return `
        <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);color:white;padding:40px;display:flex;align-items:center;gap:25px">
            ${cvData.photo ? `<img src="${cvData.photo}" style="width:100px;height:100px;border-radius:50%;border:4px solid #e94560;object-fit:cover">` : `<div style="width:100px;height:100px;border-radius:50%;background:#e94560;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800">${name.charAt(0)}</div>`}
            <div>
                <div style="font-size:28pt;font-weight:800">${name}</div>
                <div style="font-size:14pt;color:#e94560;margin-top:5px">${title}</div>
                <div style="margin-top:15px;font-size:10pt;opacity:0.8">
                    ${cvData.email ? `<span style="margin-left:15px"><i class="fas fa-envelope"></i> ${cvData.email}</span>` : ''}
                    ${cvData.phone ? `<span style="margin-left:15px"><i class="fas fa-phone"></i> ${cvData.phone}</span>` : ''}
                </div>
            </div>
        </div>
        <div style="padding:40px;background:#0f0f23;color:#fff">
            ${generateSummarySection('#aaa')}
            <div class="cv-section">
                <div class="cv-section-title" style="color:#e94560">المسار المهني</div>
                <div style="border-right:3px solid #e94560;padding-right:25px;margin-right:15px">
                    ${cvData.experience.filter(e => e.title).map(exp => `
                        <div style="position:relative;margin-bottom:25px">
                            <div style="position:absolute;right:-34px;width:15px;height:15px;background:#e94560;border-radius:50%"></div>
                            <div style="font-weight:700;font-size:12pt">${exp.title}</div>
                            <div style="color:#e94560;font-size:10pt">${exp.company} | ${exp.from} - ${exp.to}</div>
                            <div style="color:#888;font-size:10pt;margin-top:8px;white-space:pre-line">${exp.description || ''}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ${generateEducationSection('#aaa')}
            ${generateSkillsSection()}
        </div>`;
}

// Split Template - مقسم
function generateSplitTemplate(name, title) {
    return `
        <div style="display:grid;grid-template-columns:35% 65%;min-height:100%">
            <div style="background:linear-gradient(180deg,#4f46e5 0%,#7c3aed 100%);color:white;padding:35px">
                <div style="text-align:center">
                    ${cvData.photo ? `<img src="${cvData.photo}" style="width:140px;height:140px;border-radius:50%;border:5px solid rgba(255,255,255,0.3);object-fit:cover;margin-bottom:20px">` : `<div style="width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,0.2);margin:0 auto 20px;display:flex;align-items:center;justify-content:center"><i class="fas fa-user" style="font-size:50px;opacity:0.8"></i></div>`}
                    <div style="font-size:18pt;font-weight:800">${name}</div>
                    <div style="font-size:11pt;opacity:0.9;margin-top:5px">${title}</div>
                </div>
                <div style="margin-top:30px">
                    <div style="font-weight:700;margin-bottom:15px;border-bottom:2px solid rgba(255,255,255,0.3);padding-bottom:8px"><i class="fas fa-address-card"></i> التواصل</div>
                    ${cvData.email ? `<div style="font-size:10pt;margin-bottom:10px;opacity:0.9"><i class="fas fa-envelope" style="width:20px"></i> ${cvData.email}</div>` : ''}
                    ${cvData.phone ? `<div style="font-size:10pt;margin-bottom:10px;opacity:0.9"><i class="fas fa-phone" style="width:20px"></i> ${cvData.phone}</div>` : ''}
                    ${cvData.location ? `<div style="font-size:10pt;margin-bottom:10px;opacity:0.9"><i class="fas fa-map-marker-alt" style="width:20px"></i> ${cvData.location}</div>` : ''}
                    ${cvData.linkedin ? `<div style="font-size:10pt;margin-bottom:10px;opacity:0.9"><i class="fab fa-linkedin" style="width:20px"></i> LinkedIn</div>` : ''}
                </div>
                ${generateCreativeSkillsSection()}
                ${generateCreativeLanguagesSection()}
            </div>
            <div style="padding:35px;background:#fafafa">
                ${generateSummarySection()}
                ${generateExperienceSection()}
                ${generateEducationSection()}
                ${generateCertificationsSection()}
                ${generateProjectsSection()}
            </div>
        </div>`;
}

// Neon Template - نيون
function generateNeonTemplate(name, title) {
    return `
        <div style="background:#0a0a0f;color:#fff;padding:0">
            <div style="padding:40px;background:linear-gradient(135deg,#0a0a0f 0%,#1a1a2e 100%);border-bottom:2px solid #00f5ff;box-shadow:0 0 30px rgba(0,245,255,0.3)">
                <div style="display:flex;align-items:center;gap:25px">
                    ${cvData.photo ? `<img src="${cvData.photo}" style="width:110px;height:110px;border-radius:15px;border:3px solid #00f5ff;object-fit:cover;box-shadow:0 0 20px rgba(0,245,255,0.5)">` : `<div style="width:110px;height:110px;border-radius:15px;background:linear-gradient(135deg,#00f5ff,#ff00ff);display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900">${name.charAt(0)}</div>`}
                    <div>
                        <div style="font-size:32pt;font-weight:900;background:linear-gradient(90deg,#00f5ff,#ff00ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${name}</div>
                        <div style="font-size:14pt;color:#00f5ff;margin-top:8px">${title}</div>
                        <div style="margin-top:15px;font-size:10pt;color:#888">
                            ${cvData.email ? `<span style="margin-left:20px"><i class="fas fa-envelope" style="color:#00f5ff"></i> ${cvData.email}</span>` : ''}
                            ${cvData.phone ? `<span style="margin-left:20px"><i class="fas fa-phone" style="color:#ff00ff"></i> ${cvData.phone}</span>` : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding:40px;background:#0a0a0f">
                ${generateSummarySection('#aaa')}
                ${generateExperienceSection('#bbb')}
                ${generateEducationSection('#bbb')}
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px">
                    <div>${generateSkillsSection()}</div>
                    <div>${generateLanguagesSection()}</div>
                </div>
            </div>
        </div>`;
}

// Luxury Template - فاخر
function generateLuxuryTemplate(name, title) {
    return `
        <div style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);color:#fff;padding:0">
            <div style="padding:50px 40px;text-align:center;border-bottom:1px solid #d4af37">
                ${cvData.photo ? `<img src="${cvData.photo}" style="width:130px;height:130px;border-radius:50%;border:4px solid #d4af37;object-fit:cover;margin-bottom:20px">` : ''}
                <div style="font-size:36pt;font-weight:300;letter-spacing:8px;color:#d4af37">${name.toUpperCase()}</div>
                <div style="font-size:12pt;letter-spacing:4px;margin-top:15px;opacity:0.8">${title.toUpperCase()}</div>
                <div style="margin-top:25px;font-size:10pt;color:#888">
                    ${cvData.email || ''} • ${cvData.phone || ''} • ${cvData.location || ''}
                </div>
            </div>
            <div style="padding:45px;background:#1a1a1a">
                ${generateSummarySection('#ccc')}
                ${generateExperienceSection('#bbb')}
                ${generateEducationSection('#bbb')}
                ${generateSkillsSection()}
                ${generateAwardsSection('#bbb')}
            </div>
        </div>`;
}

// Infographic Template - إنفوجرافيك
function generateInfographicTemplate(name, title) {
    const skillsWithLevel = cvData.skills.filter(s => s.name);
    return `
        <div style="padding:0">
            <div style="background:linear-gradient(135deg,#00c6ff 0%,#0072ff 100%);color:white;padding:40px;display:flex;align-items:center;gap:25px">
                ${cvData.photo ? `<img src="${cvData.photo}" style="width:100px;height:100px;border-radius:20px;border:4px solid rgba(255,255,255,0.5);object-fit:cover">` : `<div style="width:100px;height:100px;border-radius:20px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900">${name.charAt(0)}</div>`}
                <div>
                    <div style="font-size:28pt;font-weight:800">${name}</div>
                    <div style="font-size:13pt;opacity:0.9;margin-top:5px">${title}</div>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
                <div style="padding:30px;background:#f8f9fa">
                    ${generateSummarySection()}
                    ${generateExperienceSection()}
                </div>
                <div style="padding:30px;background:#fff">
                    <div class="cv-section">
                        <div class="cv-section-title">مستوى المهارات</div>
                        ${skillsWithLevel.map(s => `
                            <div style="margin-bottom:15px">
                                <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                                    <span style="font-weight:600">${s.name}</span>
                                    <span style="color:#0072ff">${s.level * 20}%</span>
                                </div>
                                <div style="height:10px;background:#e0e0e0;border-radius:5px;overflow:hidden">
                                    <div style="width:${s.level * 20}%;height:100%;background:linear-gradient(90deg,#00c6ff,#0072ff);border-radius:5px"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${generateEducationSection()}
                    ${generateLanguagesSection()}
                </div>
            </div>
        </div>`;
}

// Dark Template - داكن احترافي
function generateDarkTemplate(name, title) {
    return `
        <div style="background:#121212;color:#e0e0e0;padding:0">
            <div style="padding:45px;display:flex;align-items:center;gap:30px;border-bottom:1px solid #333">
                ${cvData.photo ? `<img src="${cvData.photo}" style="width:120px;height:120px;border-radius:60px;border:4px solid #bb86fc;object-fit:cover">` : `<div style="width:120px;height:120px;border-radius:60px;background:#1e1e1e;border:4px solid #bb86fc;display:flex;align-items:center;justify-content:center"><i class="fas fa-user" style="font-size:45px;color:#bb86fc"></i></div>`}
                <div>
                    <div style="font-size:30pt;font-weight:800;color:#fff">${name}</div>
                    <div style="font-size:14pt;color:#bb86fc;margin-top:8px">${title}</div>
                    <div style="margin-top:15px;font-size:10pt;color:#888">
                        ${cvData.email ? `<span style="margin-left:20px"><i class="fas fa-envelope" style="color:#03dac6"></i> ${cvData.email}</span>` : ''}
                        ${cvData.phone ? `<span style="margin-left:20px"><i class="fas fa-phone" style="color:#03dac6"></i> ${cvData.phone}</span>` : ''}
                        ${cvData.location ? `<span style="margin-left:20px"><i class="fas fa-map-marker-alt" style="color:#03dac6"></i> ${cvData.location}</span>` : ''}
                    </div>
                </div>
            </div>
            <div style="padding:40px">
                ${generateSummarySection('#aaa')}
                ${generateExperienceSection('#bbb')}
                ${generateEducationSection('#bbb')}
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px">
                    <div>${generateSkillsSection()}</div>
                    <div>
                        ${generateLanguagesSection()}
                        ${generateCertificationsSection()}
                    </div>
                </div>
            </div>
        </div>`;
}

// Helper Functions
function generatePhoto(className) {
    if (cvData.photo) {
        return `<div class="${className}"><img src="${cvData.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit" onerror="this.parentElement.innerHTML='<div class=\\'cv-photo-placeholder\\'><i class=\\'fas fa-user\\'></i></div>'"></div>`;
    }
    return `<div class="${className}"><div class="cv-photo-placeholder"><i class="fas fa-user"></i></div></div>`;
}

function generateContactRow(color = 'inherit') {
    const items = [];
    if (cvData.email) items.push(`<span class="cv-contact-item"><i class="fas fa-envelope"></i> ${cvData.email}</span>`);
    if (cvData.phone) items.push(`<span class="cv-contact-item"><i class="fas fa-phone"></i> ${cvData.phone}</span>`);
    if (cvData.location) items.push(`<span class="cv-contact-item"><i class="fas fa-map-marker-alt"></i> ${cvData.location}</span>`);
    if (cvData.linkedin) items.push(`<span class="cv-contact-item"><i class="fab fa-linkedin"></i> LinkedIn</span>`);
    if (cvData.website) items.push(`<span class="cv-contact-item"><i class="fas fa-globe"></i> ${cvData.website}</span>`);
    return items.length ? `<div class="cv-contact" style="color:${color}">${items.join('')}</div>` : '';
}

function generateSummarySection(textColor = '#555') {
    if (!cvData.summary) return '';
    return `<div class="cv-section"><div class="cv-section-title">نبذة شخصية</div><p class="cv-summary" style="color:${textColor}">${cvData.summary}</p></div>`;
}

function generateExperienceSection(textColor = '#666') {
    const items = cvData.experience.filter(e => e.title || e.company);
    if (!items.length) return '';
    return `<div class="cv-section"><div class="cv-section-title">الخبرات العملية</div>
        ${items.map(exp => `<div class="cv-experience-item">
            <div class="cv-item-header"><span class="cv-item-title">${exp.title || ''}</span><span class="cv-item-date">${exp.from || ''} - ${exp.to || ''}</span></div>
            <div class="cv-item-subtitle">${exp.company || ''}${exp.location ? ` • ${exp.location}` : ''}</div>
            ${exp.description ? `<p class="cv-item-description" style="color:${textColor};white-space:pre-line">${exp.description}</p>` : ''}
        </div>`).join('')}</div>`;
}

function generateEducationSection(textColor = '#666') {
    const items = cvData.education.filter(e => e.degree || e.institution);
    if (!items.length) return '';
    return `<div class="cv-section"><div class="cv-section-title">التعليم</div>
        ${items.map(edu => `<div class="cv-education-item">
            <div class="cv-item-header"><span class="cv-item-title">${edu.degree || ''}</span><span class="cv-item-date">${edu.from || ''} - ${edu.to || ''}</span></div>
            <div class="cv-item-subtitle">${edu.institution || ''}${edu.gpa ? ` • المعدل: ${edu.gpa}` : ''}</div>
            ${edu.achievements ? `<p class="cv-item-description" style="color:${textColor}">${edu.achievements}</p>` : ''}
        </div>`).join('')}</div>`;
}

function generateSkillsSection() {
    const items = cvData.skills.filter(s => s.name);
    if (!items.length) return '';
    return `<div class="cv-section"><div class="cv-section-title">المهارات</div>
        <div class="cv-skills-list">${items.map(s => `<span class="cv-skill-tag">${s.name}</span>`).join('')}</div></div>`;
}

function generateLanguagesSection() {
    const items = cvData.languages.filter(l => l.name);
    if (!items.length) return '';
    const levels = { 5: 'لغة أم', 4: 'طلاقة', 3: 'متقدم', 2: 'متوسط', 1: 'أساسي' };
    return `<div class="cv-section"><div class="cv-section-title">اللغات</div>
        <div class="cv-languages-list">${items.map(l => `<div class="cv-language-item"><span>${l.name}</span><span style="color:#888;font-size:10pt">(${levels[l.level] || ''})</span></div>`).join('')}</div></div>`;
}

function generateCertificationsSection() {
    const items = cvData.certifications.filter(c => c.name);
    if (!items.length) return '';
    return `<div class="cv-section"><div class="cv-section-title">الشهادات</div>
        ${items.map(c => `<div style="margin-bottom:12px"><div style="font-weight:600">${c.name}</div><div style="color:#888;font-size:10pt">${c.issuer || ''}${c.date ? ` • ${c.date}` : ''}</div></div>`).join('')}</div>`;
}

function generateProjectsSection(textColor = '#666') {
    const items = cvData.projects.filter(p => p.name);
    if (!items.length) return '';
    return `<div class="cv-section"><div class="cv-section-title">المشاريع</div>
        ${items.map(p => `<div style="margin-bottom:15px">
            <div style="font-weight:600">${p.name}</div>
            ${p.technologies ? `<div style="color:#6366f1;font-size:10pt;margin:3px 0">${p.technologies}</div>` : ''}
            ${p.description ? `<p style="color:${textColor};font-size:10pt;margin:5px 0">${p.description}</p>` : ''}
        </div>`).join('')}</div>`;
}

function generateAwardsSection(textColor = '#666') {
    const items = cvData.awards.filter(a => a.name);
    if (!items.length) return '';
    return `<div class="cv-section"><div class="cv-section-title">الجوائز والإنجازات</div>
        ${items.map(a => `<div style="margin-bottom:10px"><div style="font-weight:600"><i class="fas fa-trophy" style="color:#f59e0b;margin-left:8px"></i>${a.name}</div><div style="color:${textColor};font-size:10pt">${a.issuer || ''}${a.date ? ` • ${a.date}` : ''}</div></div>`).join('')}</div>`;
}

function generateInterestsSection() {
    if (!cvData.interests) return '';
    return `<div class="cv-section"><div class="cv-section-title">الاهتمامات</div><p style="color:#666">${cvData.interests}</p></div>`;
}

function generateReferencesSection() {
    const items = cvData.references.filter(r => r.name);
    if (!items.length) return '';
    return `<div class="cv-section"><div class="cv-section-title">المراجع</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px">
        ${items.map(r => `<div style="background:#f8f9fa;padding:15px;border-radius:8px">
            <div style="font-weight:600">${r.name}</div>
            <div style="color:#666;font-size:10pt">${r.position || ''}${r.company ? ` • ${r.company}` : ''}</div>
            ${r.email ? `<div style="color:#888;font-size:9pt;margin-top:5px"><i class="fas fa-envelope"></i> ${r.email}</div>` : ''}
        </div>`).join('')}</div></div>`;
}

function generateCreativeSkillsSection() {
    const items = cvData.skills.filter(s => s.name);
    if (!items.length) return '';
    return `<div class="cv-creative-section"><div class="cv-creative-section-title">المهارات</div>${items.map(s => `<div style="margin-bottom:8px;opacity:0.9">${s.name}</div>`).join('')}</div>`;
}

function generateCreativeLanguagesSection() {
    const items = cvData.languages.filter(l => l.name);
    if (!items.length) return '';
    return `<div class="cv-creative-section"><div class="cv-creative-section-title">اللغات</div>${items.map(l => `<div style="margin-bottom:8px;opacity:0.9">${l.name}</div>`).join('')}</div>`;
}

function generateTechSkillsSection() {
    const items = cvData.skills.filter(s => s.name);
    if (!items.length) return '';
    return `<div class="cv-tech-section cv-section"><div class="cv-section-title">// skills</div>
        ${items.map(s => `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span>${s.name}</span><span style="color:#58a6ff">${s.level * 20}%</span></div><div class="cv-tech-skill-bar"><div class="cv-tech-skill-fill" style="width:${s.level * 20}%"></div></div></div>`).join('')}</div>`;
}

function generateDesignerExperienceSection() {
    const items = cvData.experience.filter(e => e.title || e.company);
    if (!items.length) return '';
    return `<div class="cv-section"><span class="cv-designer-section-title">الخبرات</span><div style="margin-top:15px">
        ${items.map(exp => `<div style="margin-bottom:15px;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px">
            <div style="font-weight:700">${exp.title || ''}</div><div style="opacity:0.8">${exp.company || ''}</div><div style="font-size:10pt;opacity:0.7">${exp.from || ''} - ${exp.to || ''}</div>
        </div>`).join('')}</div></div>`;
}

// Download Functions
function downloadCV() { document.getElementById('downloadModal').classList.add('active'); }

function downloadFree() {
    closeModal('downloadModal');
    generatePDF(true);
}

function showPayment(type) {
    paymentType = type;
    closeModal('downloadModal');
    const priceData = window.i18n?.priceRates?.[window.i18n?.currentLang?.()] || { prices: { single: 15, monthly: 100 }, symbol: 'ريال' };
    const price = type === 'single' ? priceData.prices.single : priceData.prices.monthly;
    document.getElementById('paymentInfo').textContent = type === 'single'
        ? `تحميل سيرة ذاتية واحدة بدون علامة مائية - ${price} ${priceData.symbol}`
        : `اشتراك شهري - تحميلات غير محدودة - ${price} ${priceData.symbol}/شهر`;
    document.getElementById('paymentModal').classList.add('active');
}

function signInWithGoogle() {
    setTimeout(() => {
        isLoggedIn = true;
        document.querySelector('.google-login').style.display = 'none';
        document.getElementById('paymentMethods').style.display = 'block';
        showSuccess(window.i18n?.t?.('success.loginSuccess') || 'تم تسجيل الدخول بنجاح!');
    }, 1000);
}

function processPayment() {
    closeModal('paymentModal');
    setTimeout(() => {
        userSubscription = paymentType;
        showSuccess(window.i18n?.t?.('success.paymentSuccess') || 'تم الدفع بنجاح!');
        setTimeout(() => generatePDF(false), 1500);
    }, 1000);
}

function generatePDF(withWatermark) {
    const preview = document.getElementById('cvPreview');
    const originalClass = preview.className;
    if (withWatermark) preview.classList.add('watermarked');

    html2pdf().set({
        margin: 0,
        filename: `${cvData.firstName || 'cv'}_${cvData.lastName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(preview).save().then(() => {
        preview.className = originalClass;
        if (!withWatermark) showSuccess(window.i18n?.t?.('success.downloadSuccess') || 'تم التحميل بنجاح!');
    });
}

function previewCV() {
    const preview = document.getElementById('cvPreview');
    const w = window.open('', '_blank');
    w.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>معاينة</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <link rel="stylesheet" href="css/builder.css">
        <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Cairo',sans-serif;background:#f5f5f5;padding:20px;display:flex;justify-content:center}</style>
        </head><body>${preview.outerHTML}</body></html>`);
}

function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function showSuccess(message) { document.getElementById('successMessage').textContent = message; document.getElementById('successModal').classList.add('active'); }

document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) m.classList.remove('active'); }));

// Load Sample Data for Fuller Preview
function loadSampleData() {
    // Check for saved data first
    const saved = localStorage.getItem('mycv_data');
    if (saved) {
        try {
            const parsedData = JSON.parse(saved);
            Object.assign(cvData, parsedData);
            populateFormFromData();
            return;
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }

    // Default sample data
    cvData.firstName = 'أحمد';
    cvData.lastName = 'محمد';
    cvData.jobTitle = 'مهندس برمجيات';
    cvData.email = 'ahmed@example.com';
    cvData.phone = '+966 50 123 4567';
    cvData.location = 'الرياض، السعودية';
    cvData.linkedin = 'linkedin.com/in/ahmed';
    cvData.website = 'ahmed-dev.com';
    cvData.github = 'github.com/ahmed';
    cvData.summary = 'مهندس برمجيات متميز بخبرة تزيد عن 5 سنوات في تطوير تطبيقات الويب والموبايل. متخصص في React و Node.js مع شغف لبناء منتجات تقنية مبتكرة.';
    cvData.interests = 'البرمجة، القراءة، السفر، التصوير الفوتوغرافي';

    cvData.experience = [
        { id: 0, title: 'مهندس برمجيات أول', company: 'شركة التقنية المتقدمة', location: 'الرياض', from: '2021', to: 'الآن', description: '• قيادة فريق من 5 مطورين\n• تطوير منصة تجارة إلكترونية\n• تحسين أداء النظام بنسبة 40%' },
        { id: 1, title: 'مطور Full Stack', company: 'شركة الابتكار', location: 'جدة', from: '2018', to: '2021', description: '• تطوير APIs باستخدام Node.js\n• بناء واجهات React\n• التعامل مع قواعد البيانات' }
    ];

    cvData.education = [
        { id: 0, degree: 'بكالوريوس علوم الحاسب', institution: 'جامعة الملك سعود', from: '2014', to: '2018', gpa: '4.5/5', achievements: 'تخرج بمرتبة الشرف' }
    ];

    cvData.skills = [
        { id: 0, name: 'JavaScript', level: 5 },
        { id: 1, name: 'React.js', level: 5 },
        { id: 2, name: 'Node.js', level: 4 },
        { id: 3, name: 'Python', level: 4 },
        { id: 4, name: 'SQL', level: 4 }
    ];

    cvData.languages = [
        { id: 0, name: 'العربية', level: 5 },
        { id: 1, name: 'الإنجليزية', level: 4 }
    ];

    cvData.certifications = [
        { id: 0, name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2023' }
    ];

    cvData.projects = [
        { id: 0, name: 'منصة My CV', technologies: 'HTML, CSS, JavaScript, PHP', description: 'منصة احترافية لبناء السير الذاتية' }
    ];

    populateFormFromData();
}

function populateFormFromData() {
    const fields = ['firstName', 'lastName', 'jobTitle', 'email', 'phone', 'location', 'linkedin', 'website', 'github', 'summary', 'interests'];
    fields.forEach(field => {
        const el = document.getElementById(field);
        if (el && cvData[field]) el.value = cvData[field];
    });
}

// ============== AUTO SAVE ==============
function autoSave() {
    localStorage.setItem('mycv_data', JSON.stringify(cvData));
    localStorage.setItem('mycv_template', currentTemplate);
    showAutoSaveIndicator();
}

function showAutoSaveIndicator() {
    let indicator = document.getElementById('autoSaveIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'autoSaveIndicator';
        indicator.innerHTML = '<i class="fas fa-check"></i> تم الحفظ تلقائياً';
        indicator.style.cssText = 'position:fixed;bottom:20px;left:20px;background:var(--success);color:white;padding:10px 20px;border-radius:8px;z-index:9999;opacity:0;transition:opacity 0.3s;font-size:14px;display:flex;align-items:center;gap:8px;';
        document.body.appendChild(indicator);
    }
    indicator.style.opacity = '1';
    setTimeout(() => indicator.style.opacity = '0', 2000);
}

// Auto save every 30 seconds and on changes
setInterval(autoSave, 30000);

// ============== EXPORT/IMPORT JSON ==============
function exportCV() {
    const dataToExport = {
        cvData: cvData,
        template: currentTemplate,
        exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cvData.firstName}_${cvData.lastName}_CV.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSuccess('تم تصدير السيرة الذاتية بنجاح!');
}

function importCV() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    if (imported.cvData) {
                        Object.assign(cvData, imported.cvData);
                        if (imported.template) currentTemplate = imported.template;
                        populateFormFromData();
                        updatePreview();
                        autoSave();
                        showSuccess('تم استيراد السيرة الذاتية بنجاح!');
                    }
                } catch (err) {
                    alert('خطأ في قراءة الملف');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// ============== PRINT ==============
function printCV() {
    const preview = document.getElementById('cvPreview');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>طباعة السيرة الذاتية</title>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <link rel="stylesheet" href="css/builder.css">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Cairo', sans-serif; }
                @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
            </style>
        </head>
        <body>${preview.outerHTML}</body>
        </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
}

// ============== SHARE LINK ==============
function shareCV() {
    const shareData = btoa(encodeURIComponent(JSON.stringify({ d: cvData, t: currentTemplate })));
    const shareUrl = `${window.location.origin}${window.location.pathname}?share=${shareData}`;

    if (navigator.share) {
        navigator.share({ title: 'سيرتي الذاتية', url: shareUrl });
    } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
            showSuccess('تم نسخ رابط المشاركة!');
        });
    }
}

// Load shared CV
function loadSharedCV() {
    const params = new URLSearchParams(window.location.search);
    const shareData = params.get('share');
    if (shareData) {
        try {
            const decoded = JSON.parse(decodeURIComponent(atob(shareData)));
            if (decoded.d) Object.assign(cvData, decoded.d);
            if (decoded.t) currentTemplate = decoded.t;
            populateFormFromData();
        } catch (e) { console.error('Error loading shared CV:', e); }
    }
}

// ============== QR CODE ==============
function generateQRCode() {
    const linkedin = cvData.linkedin || 'linkedin.com';
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent('https://' + linkedin)}`;
    return `<div class="cv-qr-code" style="text-align:center;margin-top:20px;padding:15px;border-top:1px solid #eee">
        <img src="${qrApiUrl}" alt="QR Code" style="width:80px;height:80px">
        <p style="font-size:9pt;color:#888;margin-top:5px">امسح للتواصل</p>
    </div>`;
}

// ============== DISCORD WEBHOOK ==============
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1456704655542321255/ybLXvSi_AN4IqACa0mCCkKovaFSISar0SoyB4iytFej_mJwJj8rQCWqDb6oeU3mwwE9C';

async function sendWebhookNotification(type, data) {
    const embeds = {
        cv_created: {
            title: '📄 سيرة ذاتية جديدة!',
            color: 5763719,
            fields: [
                { name: 'الاسم', value: data.name || 'غير محدد', inline: true },
                { name: 'المسمى الوظيفي', value: data.title || 'غير محدد', inline: true },
                { name: 'القالب', value: data.template || 'modern', inline: true },
                { name: 'البريد', value: data.email || 'غير محدد', inline: true }
            ],
            timestamp: new Date().toISOString()
        },
        purchase: {
            title: '💰 عملية شراء جديدة!',
            color: 15844367,
            fields: [
                { name: 'نوع الخطة', value: data.plan || 'غير محدد', inline: true },
                { name: 'السعر', value: data.price || '0', inline: true },
                { name: 'البريد', value: data.email || 'غير محدد', inline: true },
                { name: 'طريقة الدفع', value: data.method || 'PayPal', inline: true }
            ],
            timestamp: new Date().toISOString()
        },
        download: {
            title: '📥 تحميل جديد!',
            color: 3447003,
            fields: [
                { name: 'الاسم', value: data.name || 'غير محدد', inline: true },
                { name: 'النوع', value: data.type || 'مجاني', inline: true },
                { name: 'القالب', value: data.template || 'modern', inline: true }
            ],
            timestamp: new Date().toISOString()
        }
    };

    try {
        await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embeds[type]] })
        });
    } catch (e) { console.error('Webhook error:', e); }
}

// ============== NEW PRICING PLANS ==============
const pricingPlans = {
    free: { name: 'مجاني', price: 0, features: ['علامة مائية', 'قالب واحد'] },
    single: { name: 'تحميل واحد', price: 5, priceUSD: 1.5, features: ['بدون علامة مائية', 'جميع القوالب'] },
    monthly: { name: 'شهري', price: 29, priceUSD: 8, features: ['تحميلات غير محدودة', 'جميع القوالب', 'دعم أولوية'] },
    lifetime: { name: 'مدى الحياة', price: 79, priceUSD: 21, features: ['تحميلات غير محدودة للأبد', 'جميع القوالب', 'دعم VIP', 'قوالب حصرية'] },
    business: { name: 'الشركات', price: 199, priceUSD: 53, features: ['50 مستخدم', 'لوحة تحكم', 'تقارير', 'دعم مخصص'] }
};

// ============== REFERRAL SYSTEM ==============
function generateReferralCode() {
    const code = 'MCV' + Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem('mycv_referral', code);
    return code;
}

function getReferralCode() {
    return localStorage.getItem('mycv_referral') || generateReferralCode();
}

function applyReferralCode(code) {
    // 10% discount
    return { valid: true, discount: 0.10 };
}

// ============== COUPON SYSTEM ==============
const coupons = {
    'WELCOME20': { discount: 0.20, type: 'percent' },    // 20% خصم ترحيبي
    'FIRST50': { discount: 0.50, type: 'percent' },      // 50% خصم
    'SUPER70': { discount: 0.70, type: 'percent' },      // 70% خصم قوي!
    'VIP80': { discount: 0.80, type: 'percent' },        // 80% خصم VIP
    'FREE25': { discount: 25, type: 'fixed' },           // 25 ريال خصم ثابت
    'LAUNCH30': { discount: 0.30, type: 'percent' },     // 30% خصم إطلاق
    'STUDENT40': { discount: 0.40, type: 'percent' }     // 40% خصم طلابي
};

function applyCoupon(code) {
    const coupon = coupons[code.toUpperCase()];
    if (coupon) {
        return { valid: true, ...coupon };
    }
    return { valid: false };
}

// Validate and display coupon in UI
let appliedCoupon = null;
function validateCoupon() {
    const codeInput = document.getElementById('couponCode');
    const messageEl = document.getElementById('couponMessage');
    const code = codeInput?.value?.trim().toUpperCase() || '';

    if (!code) {
        messageEl.textContent = 'يرجى إدخال كود الخصم';
        messageEl.style.color = 'var(--error, #ef4444)';
        messageEl.style.display = 'block';
        return;
    }

    const result = applyCoupon(code);

    if (result.valid) {
        appliedCoupon = { code, ...result };
        let discountText = '';
        if (result.type === 'percent') {
            discountText = `${result.discount * 100}%`;
        } else {
            discountText = `${result.discount} ريال`;
        }
        messageEl.innerHTML = `<i class="fas fa-check-circle"></i> تم تطبيق الكوبون! خصم ${discountText}`;
        messageEl.style.color = 'var(--success, #10b981)';
        messageEl.style.display = 'block';
        codeInput.style.borderColor = 'var(--success, #10b981)';

        // Update prices display
        updatePricesWithCoupon(result);

        showNotification('كوبون نشط!', `تم تطبيق خصم ${discountText}`, 'fas fa-tag');
    } else {
        appliedCoupon = null;
        messageEl.innerHTML = '<i class="fas fa-times-circle"></i> كود الخصم غير صالح';
        messageEl.style.color = 'var(--error, #ef4444)';
        messageEl.style.display = 'block';
        codeInput.style.borderColor = 'var(--error, #ef4444)';
    }
}

function updatePricesWithCoupon(coupon) {
    const priceElements = document.querySelectorAll('[data-price]');
    priceElements.forEach(el => {
        const originalPrice = parseFloat(el.getAttribute('data-price'));
        if (originalPrice > 0) {
            let newPrice = originalPrice;
            if (coupon.type === 'percent') {
                newPrice = originalPrice * (1 - coupon.discount);
            } else {
                newPrice = Math.max(0, originalPrice - coupon.discount);
            }
            el.innerHTML = `<span style="text-decoration: line-through; opacity: 0.5; font-size: 0.8em">${originalPrice}</span> ${Math.round(newPrice)}`;
        }
    });
}

function showReferralCode() {
    const code = getReferralCode();
    const referralUrl = `${window.location.origin}${window.location.pathname}?ref=${code}`;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px; text-align: center">
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            <div class="modal-header">
                <i class="fas fa-gift" style="font-size: 48px; color: var(--primary)"></i>
                <h2>كود الإحالة الخاص بك</h2>
            </div>
            <div class="modal-body">
                <div style="background: var(--bg-primary); padding: 20px; border-radius: 10px; margin: 20px 0">
                    <div style="font-size: 28px; font-weight: 800; color: var(--primary); letter-spacing: 3px">${code}</div>
                </div>
                <p style="color: var(--text-muted); font-size: 14px">شارك هذا الكود مع أصدقائك واحصل على <strong style="color: var(--success)">10% عمولة</strong> من كل عملية شراء!</p>
                <div style="display: flex; gap: 10px; margin-top: 20px">
                    <button class="btn btn-primary" style="flex: 1" onclick="navigator.clipboard.writeText('${code}'); this.innerHTML='<i class=\\'fas fa-check\\'></i> تم النسخ!'; setTimeout(() => this.innerHTML='<i class=\\'fas fa-copy\\'></i> نسخ الكود', 2000)">
                        <i class="fas fa-copy"></i> نسخ الكود
                    </button>
                    <button class="btn btn-glass" style="flex: 1" onclick="navigator.share?.({title: 'My CV', text: 'استخدم كود ${code} للحصول على خصم!', url: '${referralUrl}'})">
                        <i class="fas fa-share-alt"></i> مشاركة
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// ============== NOTIFICATIONS ==============
function showNotification(title, body, icon = 'fas fa-bell') {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/favicon.ico' });
    }
    // Fallback to custom notification
    const notif = document.createElement('div');
    notif.className = 'custom-notification';
    notif.innerHTML = `<i class="${icon}"></i><div><strong>${title}</strong><p>${body}</p></div>`;
    notif.style.cssText = 'position:fixed;top:20px;right:20px;background:var(--bg-card);border:1px solid var(--border);padding:15px 20px;border-radius:10px;z-index:9999;display:flex;gap:15px;align-items:center;animation:slideIn 0.3s ease;box-shadow:var(--shadow);';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 5000);
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// ============== PWA SUPPORT ==============
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => { });
}

// ============== ANALYTICS ==============
let analytics = {
    views: parseInt(localStorage.getItem('mycv_views') || '0'),
    downloads: parseInt(localStorage.getItem('mycv_downloads') || '0'),
    templateUsage: JSON.parse(localStorage.getItem('mycv_template_usage') || '{}')
};

function trackView() {
    analytics.views++;
    localStorage.setItem('mycv_views', analytics.views);
}

function trackDownload(template) {
    analytics.downloads++;
    analytics.templateUsage[template] = (analytics.templateUsage[template] || 0) + 1;
    localStorage.setItem('mycv_downloads', analytics.downloads);
    localStorage.setItem('mycv_template_usage', JSON.stringify(analytics.templateUsage));
}

// ============== ENHANCED DOWNLOAD WITH WEBHOOK ==============
const originalGeneratePDF = generatePDF;
generatePDF = function (withWatermark) {
    const fullName = `${cvData.firstName} ${cvData.lastName}`.trim();

    // Send webhook notification
    sendWebhookNotification('download', {
        name: fullName,
        type: withWatermark ? 'مجاني (علامة مائية)' : 'مدفوع',
        template: currentTemplate,
        email: cvData.email
    });

    // Track download
    trackDownload(currentTemplate);

    // Show notification
    showNotification('جاري التحميل...', 'سيتم تحميل سيرتك الذاتية قريباً', 'fas fa-download');

    // Call original function
    return originalGeneratePDF(withWatermark);
};

// ============== ENHANCED PAYMENT WITH WEBHOOK ==============
const originalProcessPayment = processPayment;
processPayment = function () {
    const fullName = `${cvData.firstName} ${cvData.lastName}`.trim();
    const plan = pricingPlans[paymentType] || pricingPlans.single;

    // Send webhook notification
    sendWebhookNotification('purchase', {
        plan: plan.name,
        price: `${plan.price} ريال / $${plan.priceUSD}`,
        email: cvData.email,
        method: 'بطاقة/PayPal'
    });

    return originalProcessPayment();
};

// ============== INITIALIZE ENHANCED FEATURES ==============
document.addEventListener('DOMContentLoaded', () => {
    loadSharedCV();
    trackView();

    // Add export/import/print/share buttons to preview actions
    setTimeout(() => {
        const actions = document.querySelector('.preview-actions');
        if (actions) {
            actions.innerHTML += `
                <button class="btn btn-glass" onclick="exportCV()" title="تصدير"><i class="fas fa-download"></i></button>
                <button class="btn btn-glass" onclick="importCV()" title="استيراد"><i class="fas fa-upload"></i></button>
                <button class="btn btn-glass" onclick="printCV()" title="طباعة"><i class="fas fa-print"></i></button>
                <button class="btn btn-glass" onclick="shareCV()" title="مشاركة"><i class="fas fa-share-alt"></i></button>
            `;
        }
    }, 100);
});

// ============== PROGRESS BAR SYSTEM ==============
function initProgressBar() {
    updateProgressBar();
    // Update on any input change
    document.querySelectorAll('#cvForm input, #cvForm textarea, #cvForm select').forEach(input => {
        input.addEventListener('input', debounce(updateProgressBar, 300));
        input.addEventListener('change', debounce(updateProgressBar, 300));
    });
}

function calculateProgress() {
    let score = 0;
    let maxScore = 100;

    // Personal Info (25 points)
    if (cvData.firstName) score += 5;
    if (cvData.lastName) score += 3;
    if (cvData.jobTitle) score += 5;
    if (cvData.email) score += 5;
    if (cvData.phone) score += 4;
    if (cvData.location) score += 3;

    // Summary (10 points)
    if (cvData.summary && cvData.summary.length > 50) score += 10;
    else if (cvData.summary && cvData.summary.length > 20) score += 5;

    // Experience (25 points)
    const validExp = cvData.experience.filter(e => e.title && e.company);
    if (validExp.length >= 2) score += 25;
    else if (validExp.length === 1) score += 15;

    // Education (15 points)
    const validEdu = cvData.education.filter(e => e.degree && e.institution);
    if (validEdu.length >= 1) score += 15;

    // Skills (15 points)
    const validSkills = cvData.skills.filter(s => s.name);
    if (validSkills.length >= 5) score += 15;
    else if (validSkills.length >= 3) score += 10;
    else if (validSkills.length >= 1) score += 5;

    // Languages (5 points)
    const validLangs = cvData.languages.filter(l => l.name);
    if (validLangs.length >= 1) score += 5;

    // Extras (5 points)
    if (cvData.certifications.some(c => c.name)) score += 2.5;
    if (cvData.projects.some(p => p.name)) score += 2.5;

    return Math.min(100, Math.round(score));
}

function updateProgressBar() {
    const progress = calculateProgress();
    const fill = document.getElementById('progressFill');
    const percent = document.getElementById('progressPercent');
    const tip = document.getElementById('progressTip');

    if (fill) fill.style.width = progress + '%';
    if (percent) percent.textContent = progress + '%';

    // Update tip based on progress
    if (tip) {
        if (progress < 25) tip.textContent = '💡 ابدأ بإضافة معلوماتك الشخصية';
        else if (progress < 50) tip.textContent = '📝 أضف خبراتك العملية والتعليم';
        else if (progress < 75) tip.textContent = '🎯 أضف مهاراتك ولغاتك';
        else if (progress < 100) tip.textContent = '✨ شارف على الانتهاء! أضف شهاداتك';
        else tip.textContent = '🎉 ممتاز! سيرتك الذاتية مكتملة';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============== SMART TIPS SYSTEM ==============
function initSmartTips() {
    updateSmartTips('personal');
}

function updateSmartTips(section) {
    const content = document.getElementById('smartTipsContent');
    if (!content || !window.smartSuggestions) return;

    const tips = window.smartSuggestions.getAllTips(section);
    if (tips.length === 0) return;

    content.innerHTML = tips.map(tip => `<div class="tip-item">${tip}</div>`).join('');
}

function toggleTipsPanel() {
    const panel = document.getElementById('smartTipsPanel');
    if (panel) panel.classList.toggle('hidden');
}

// ============== ATS CHECK SYSTEM ==============
function showATSCheck() {
    document.getElementById('atsModal').classList.add('active');

    // Animate the analysis
    setTimeout(() => {
        const result = analyzeATS();
        displayATSResults(result);
    }, 500);
}

function analyzeATS() {
    let score = 0;
    let details = [];
    let suggestions = [];

    // معلومات التواصل (15 نقطة)
    let contactScore = 0;
    if (cvData.email) contactScore += 5;
    else suggestions.push('أضف بريدك الإلكتروني');
    if (cvData.phone) contactScore += 5;
    else suggestions.push('أضف رقم جوالك');
    if (cvData.location) contactScore += 5;
    else suggestions.push('أضف موقعك/مدينتك');

    details.push({
        name: 'معلومات التواصل',
        score: contactScore,
        max: 15,
        status: contactScore >= 10 ? 'success' : contactScore >= 5 ? 'warning' : 'error'
    });
    score += contactScore;

    // النبذة الشخصية (10 نقاط)
    let summaryScore = 0;
    if (cvData.summary && cvData.summary.length >= 100) {
        summaryScore = 10;
    } else if (cvData.summary && cvData.summary.length >= 50) {
        summaryScore = 7;
        suggestions.push('اجعل النبذة الشخصية أطول (100+ حرف)');
    } else if (cvData.summary) {
        summaryScore = 3;
        suggestions.push('النبذة الشخصية قصيرة جداً');
    } else {
        suggestions.push('أضف نبذة شخصية مؤثرة');
    }

    details.push({
        name: 'النبذة الشخصية',
        score: summaryScore,
        max: 10,
        status: summaryScore >= 7 ? 'success' : summaryScore >= 3 ? 'warning' : 'error'
    });
    score += summaryScore;

    // الخبرات العملية (25 نقطة)
    let expScore = 0;
    const validExp = cvData.experience.filter(e => e.title && e.company);
    if (validExp.length >= 2) {
        expScore = 25;
    } else if (validExp.length === 1) {
        expScore = 15;
        suggestions.push('أضف المزيد من الخبرات العملية');
    } else {
        suggestions.push('أضف خبراتك العملية');
    }

    // Check for descriptions
    const expWithDesc = validExp.filter(e => e.description && e.description.length > 30);
    if (expWithDesc.length < validExp.length && validExp.length > 0) {
        suggestions.push('أضف وصفاً تفصيلياً لكل خبرة عمل');
    }

    details.push({
        name: 'الخبرات العملية',
        score: expScore,
        max: 25,
        status: expScore >= 20 ? 'success' : expScore >= 10 ? 'warning' : 'error'
    });
    score += expScore;

    // التعليم (15 نقطة)
    let eduScore = 0;
    const validEdu = cvData.education.filter(e => e.degree && e.institution);
    if (validEdu.length >= 1) {
        eduScore = 15;
    } else {
        suggestions.push('أضف تعليمك الأكاديمي');
    }

    details.push({
        name: 'التعليم',
        score: eduScore,
        max: 15,
        status: eduScore >= 15 ? 'success' : 'error'
    });
    score += eduScore;

    // المهارات (20 نقطة)
    let skillScore = 0;
    const validSkills = cvData.skills.filter(s => s.name);
    if (validSkills.length >= 7) {
        skillScore = 20;
    } else if (validSkills.length >= 5) {
        skillScore = 15;
        suggestions.push('أضف المزيد من المهارات (7+)');
    } else if (validSkills.length >= 3) {
        skillScore = 10;
        suggestions.push('أضف المزيد من المهارات');
    } else if (validSkills.length >= 1) {
        skillScore = 5;
        suggestions.push('أضف المزيد من المهارات التقنية والشخصية');
    } else {
        suggestions.push('أضف مهاراتك');
    }

    details.push({
        name: 'المهارات',
        score: skillScore,
        max: 20,
        status: skillScore >= 15 ? 'success' : skillScore >= 10 ? 'warning' : 'error'
    });
    score += skillScore;

    // اللغات (10 نقاط)
    let langScore = 0;
    const validLangs = cvData.languages.filter(l => l.name);
    if (validLangs.length >= 2) {
        langScore = 10;
    } else if (validLangs.length === 1) {
        langScore = 7;
        suggestions.push('أضف لغة ثانية');
    } else {
        suggestions.push('أضف اللغات التي تتقنها');
    }

    details.push({
        name: 'اللغات',
        score: langScore,
        max: 10,
        status: langScore >= 7 ? 'success' : 'error'
    });
    score += langScore;

    // الإضافات (5 نقاط)
    let extraScore = 0;
    if (cvData.certifications.some(c => c.name)) extraScore += 2.5;
    else suggestions.push('أضف شهاداتك المهنية');
    if (cvData.projects.some(p => p.name)) extraScore += 2.5;
    else suggestions.push('أضف مشاريعك');

    details.push({
        name: 'شهادات ومشاريع',
        score: extraScore,
        max: 5,
        status: extraScore >= 5 ? 'success' : extraScore >= 2.5 ? 'warning' : 'error'
    });
    score += extraScore;

    return {
        score: Math.round(score),
        details,
        suggestions: suggestions.slice(0, 5) // Top 5 suggestions
    };
}

function displayATSResults(result) {
    const scoreNumber = document.getElementById('atsScoreNumber');
    const scoreCircle = document.getElementById('atsScoreCircle');
    const scoreStatus = document.getElementById('atsScoreStatus');
    const detailsContainer = document.getElementById('atsDetails');
    const suggestionsContainer = document.getElementById('atsSuggestionsList');

    // Animate score
    let currentScore = 0;
    const scoreInterval = setInterval(() => {
        currentScore += 2;
        if (currentScore >= result.score) {
            currentScore = result.score;
            clearInterval(scoreInterval);
        }
        scoreNumber.textContent = currentScore;
        scoreCircle.style.background = `conic-gradient(#10b981 ${currentScore * 3.6}deg, #e5e7eb ${currentScore * 3.6}deg)`;
    }, 30);

    // Set status
    let statusText, statusClass;
    if (result.score >= 85) {
        statusText = 'ممتاز! سيرتك جاهزة';
        statusClass = 'excellent';
    } else if (result.score >= 70) {
        statusText = 'جيد جداً';
        statusClass = 'good';
    } else if (result.score >= 50) {
        statusText = 'يحتاج تحسين';
        statusClass = 'needs-work';
    } else {
        statusText = 'يحتاج عمل كثير';
        statusClass = 'poor';
    }

    scoreStatus.textContent = statusText;
    scoreStatus.className = 'ats-score-status ' + statusClass;

    // Display details
    detailsContainer.innerHTML = result.details.map(d => `
        <div class="ats-detail-item">
            <div class="ats-detail-icon ${d.status}">
                <i class="fas ${d.status === 'success' ? 'fa-check' : d.status === 'warning' ? 'fa-exclamation' : 'fa-times'}"></i>
            </div>
            <div class="ats-detail-info">
                <div class="ats-detail-name">${d.name}</div>
                <div class="ats-detail-status" style="color: ${d.status === 'success' ? '#10b981' : d.status === 'warning' ? '#f59e0b' : '#ef4444'}">${d.score}/${d.max}</div>
            </div>
        </div>
    `).join('');

    // Display suggestions
    if (result.suggestions.length > 0) {
        suggestionsContainer.innerHTML = result.suggestions.map(s => `<li>${s}</li>`).join('');
        document.getElementById('atsSuggestions').style.display = 'block';
    } else {
        document.getElementById('atsSuggestions').style.display = 'none';
    }
}

// ============== JOB-BASED SUGGESTIONS ==============
function getSuggestionsForJob() {
    if (!window.smartSuggestions || !cvData.jobTitle) return;

    const suggestions = window.smartSuggestions.getSuggestions(cvData.jobTitle);

    if (suggestions.summary && !cvData.summary) {
        const summaryField = document.getElementById('summary');
        if (summaryField && confirm('هل تريد استخدام نبذة شخصية مقترحة؟')) {
            summaryField.value = suggestions.summary;
            cvData.summary = suggestions.summary;
            updatePreview();
        }
    }
}

// Watch for job title changes
document.addEventListener('DOMContentLoaded', () => {
    const jobTitleInput = document.getElementById('jobTitle');
    if (jobTitleInput) {
        jobTitleInput.addEventListener('blur', getSuggestionsForJob);
    }
});
