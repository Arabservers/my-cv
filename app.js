// Theme Management
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

// Mobile Menu
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Template Data with i18n keys and colors
const templates = [
    { id: 'modern', nameKey: 'template.modern', descKey: 'template.modernDesc', tagKey: 'template.mostPopular', tagClass: '', color1: '#6366f1', color2: '#ec4899' },
    { id: 'classic', nameKey: 'template.classic', descKey: 'template.classicDesc', tagKey: '', tagClass: '', color1: '#333333', color2: '#666666' },
    { id: 'creative', nameKey: 'template.creative', descKey: 'template.creativeDesc', tagKey: 'template.new', tagClass: 'new', color1: '#6366f1', color2: '#4f46e5' },
    { id: 'minimal', nameKey: 'template.minimal', descKey: 'template.minimalDesc', tagKey: '', tagClass: '', color1: '#222222', color2: '#888888' },
    { id: 'executive', nameKey: 'template.executive', descKey: 'template.executiveDesc', tagKey: 'template.premium', tagClass: 'premium', color1: '#6366f1', color2: '#4f46e5' },
    { id: 'tech', nameKey: 'template.tech', descKey: 'template.techDesc', tagKey: '', tagClass: '', color1: '#0d1117', color2: '#58a6ff' },
    { id: 'designer', nameKey: 'template.designer', descKey: 'template.designerDesc', tagKey: '', tagClass: '', color1: '#667eea', color2: '#764ba2' },
    { id: 'graduate', nameKey: 'template.graduate', descKey: 'template.graduateDesc', tagKey: 'template.new', tagClass: 'new', color1: '#6366f1', color2: '#e2e8f0' },
    { id: 'corporate', nameKey: 'template.corporate', descKey: 'template.corporateDesc', tagKey: '', tagClass: '', color1: '#1e3a5f', color2: '#ffffff' },
    { id: 'elegant', nameKey: 'template.elegant', descKey: 'template.elegantDesc', tagKey: 'template.premium', tagClass: 'premium', color1: '#c9a961', color2: '#2c3e50' },
    { id: 'bold', nameKey: 'template.bold', descKey: 'template.boldDesc', tagKey: 'template.new', tagClass: 'new', color1: '#667eea', color2: '#764ba2' },
    { id: 'academic', nameKey: 'template.academic', descKey: 'template.academicDesc', tagKey: '', tagClass: '', color1: '#2c5282', color2: '#4a5568' },
    // New Templates - قوالب جديدة
    { id: 'timeline', nameKey: 'template.timeline', descKey: 'template.timelineDesc', tagKey: 'template.new', tagClass: 'new', color1: '#1a1a2e', color2: '#e94560' },
    { id: 'split', nameKey: 'template.split', descKey: 'template.splitDesc', tagKey: 'template.premium', tagClass: 'premium', color1: '#4f46e5', color2: '#7c3aed' },
    { id: 'neon', nameKey: 'template.neon', descKey: 'template.neonDesc', tagKey: 'template.new', tagClass: 'new', color1: '#00f5ff', color2: '#ff00ff' },
    { id: 'luxury', nameKey: 'template.luxury', descKey: 'template.luxuryDesc', tagKey: 'template.premium', tagClass: 'premium', color1: '#d4af37', color2: '#1a1a1a' },
    { id: 'infographic', nameKey: 'template.infographic', descKey: 'template.infographicDesc', tagKey: 'template.new', tagClass: 'new', color1: '#00c6ff', color2: '#0072ff' },
    { id: 'dark', nameKey: 'template.dark', descKey: 'template.darkDesc', tagKey: '', tagClass: '', color1: '#bb86fc', color2: '#121212' }
];

function renderTemplates() {
    const grid = document.getElementById('templatesGrid');
    if (!grid) return;

    const t = window.i18n?.t || (key => key);
    const lang = window.i18n?.currentLang?.() || 'ar';
    const useBtn = lang === 'ar' ? 'استخدم القالب' : 'Use Template';

    grid.innerHTML = templates.map(temp => `
        <div class="template-card" data-template="${temp.id}">
            <div class="template-preview ${temp.id}-template" style="position:relative">
                <div style="position:absolute;top:10px;right:10px;display:flex;gap:5px">
                    <span style="width:20px;height:20px;border-radius:50%;background:${temp.color1};border:2px solid white"></span>
                    <span style="width:20px;height:20px;border-radius:50%;background:${temp.color2};border:2px solid white"></span>
                </div>
                ${getTemplatePreview(temp.id)}
            </div>
            <div class="template-overlay">
                <a href="builder.html?template=${temp.id}" class="btn btn-primary">${useBtn}</a>
            </div>
            <div class="template-info">
                <h3>${t(temp.nameKey)}</h3>
                <p>${t(temp.descKey)}</p>
                ${temp.tagKey ? `<span class="template-tag ${temp.tagClass}">${t(temp.tagKey)}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// Update template select dropdown with colors
function updateTemplateSelect() {
    const select = document.getElementById('templateSelect');
    if (!select) return;

    const t = window.i18n?.t || (key => key);
    const currentValue = select.value;

    select.innerHTML = templates.map(temp =>
        `<option value="${temp.id}" data-color1="${temp.color1}" data-color2="${temp.color2}" style="background: linear-gradient(90deg, ${temp.color1} 0%, ${temp.color1} 30px, transparent 30px)">⬤ ${t(temp.nameKey)}</option>`
    ).join('');

    select.value = currentValue || 'modern';

    // Add color indicator style
    updateSelectStyle(select);
    select.addEventListener('change', () => updateSelectStyle(select));

    // Create custom dropdown if not exists
    createCustomDropdown(select);
}

function updateSelectStyle(select) {
    const selectedOption = select.options[select.selectedIndex];
    const color1 = selectedOption?.dataset?.color1 || '#6366f1';
    const color2 = selectedOption?.dataset?.color2 || '#ec4899';
    select.style.borderLeftColor = color1;
    select.style.borderLeftWidth = '5px';
    select.style.borderLeftStyle = 'solid';
}

function createCustomDropdown(select) {
    // Remove existing custom dropdown
    const existingDropdown = document.querySelector('.custom-template-dropdown');
    if (existingDropdown) existingDropdown.remove();

    const container = select.parentElement;

    // Create custom dropdown HTML
    const customDropdown = document.createElement('div');
    customDropdown.className = 'custom-template-dropdown';
    customDropdown.innerHTML = `
        <div class="custom-dropdown-trigger" id="customDropdownTrigger">
            <div class="dropdown-colors" id="selectedColors">
                <span class="color-dot" style="background:${templates[0].color1}"></span>
                <span class="color-dot" style="background:${templates[0].color2}"></span>
            </div>
            <span class="dropdown-text" id="selectedText">${window.i18n?.t?.('template.modern') || 'احترافي حديث'}</span>
            <i class="fas fa-chevron-down"></i>
        </div>
        <div class="custom-dropdown-menu" id="customDropdownMenu">
            ${templates.map(temp => `
                <div class="custom-dropdown-item" data-value="${temp.id}" data-color1="${temp.color1}" data-color2="${temp.color2}">
                    <span class="color-dot" style="background:${temp.color1}"></span>
                    <span class="color-dot" style="background:${temp.color2}"></span>
                    <span>${window.i18n?.t?.(temp.nameKey) || temp.id}</span>
                </div>
            `).join('')}
        </div>
    `;

    container.appendChild(customDropdown);
    select.style.display = 'none';

    // Add styles
    addCustomDropdownStyles();

    // Event listeners
    const trigger = customDropdown.querySelector('#customDropdownTrigger');
    const menu = customDropdown.querySelector('#customDropdownMenu');

    trigger.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    customDropdown.querySelectorAll('.custom-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;
            const color1 = item.dataset.color1;
            const color2 = item.dataset.color2;

            select.value = value;
            select.dispatchEvent(new Event('change'));

            document.getElementById('selectedColors').innerHTML = `
                <span class="color-dot" style="background:${color1}"></span>
                <span class="color-dot" style="background:${color2}"></span>
            `;
            document.getElementById('selectedText').textContent = item.querySelector('span:last-child').textContent;

            menu.classList.remove('active');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!customDropdown.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

function addCustomDropdownStyles() {
    if (document.getElementById('customDropdownStyles')) return;

    const styles = document.createElement('style');
    styles.id = 'customDropdownStyles';
    styles.textContent = `
        .custom-template-dropdown { position: relative; }
        .custom-dropdown-trigger {
            display: flex; align-items: center; gap: 12px;
            padding: 12px 20px; background: var(--bg-card);
            border: 2px solid var(--border); border-radius: var(--radius-sm);
            cursor: pointer; transition: all 0.3s;
        }
        .custom-dropdown-trigger:hover { border-color: var(--primary); }
        .dropdown-colors { display: flex; gap: 5px; }
        .color-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); }
        .dropdown-text { flex: 1; font-weight: 500; }
        .custom-dropdown-menu {
            position: absolute; top: 100%; left: 0; right: 0;
            background: var(--bg-secondary); border: 1px solid var(--border);
            border-radius: var(--radius-sm); margin-top: 5px;
            max-height: 300px; overflow-y: auto; z-index: 100;
            display: none; box-shadow: var(--shadow);
        }
        .custom-dropdown-menu.active { display: block; }
        .custom-dropdown-item {
            display: flex; align-items: center; gap: 10px;
            padding: 12px 15px; cursor: pointer; transition: all 0.2s;
        }
        .custom-dropdown-item:hover { background: var(--bg-card); }
    `;
    document.head.appendChild(styles);
}

function getTemplatePreview(id) {
    const previews = {
        modern: `<div class="t-header"><div class="t-avatar"></div><div class="t-info"><div class="t-name"></div><div class="t-title"></div></div></div><div class="t-body"><div class="t-section"><div class="t-section-title"></div><div class="t-line"></div><div class="t-line short"></div></div></div>`,
        classic: `<div class="t-header-classic"><div class="t-name-center"></div><div class="t-contact-row"></div></div><div class="t-body-classic"><div class="t-section-classic"><div class="t-section-title"></div><div class="t-line"></div></div></div>`,
        creative: `<div class="t-sidebar-creative"></div><div class="t-main-creative"><div class="t-header-creative"><div class="t-name"></div><div class="t-title"></div></div><div class="t-content-creative"><div class="t-line"></div><div class="t-line short"></div></div></div>`,
        minimal: `<div class="t-minimal-header"><div class="t-name"></div></div><div class="t-minimal-body"><div class="t-line"></div><div class="t-line short"></div><div class="t-line"></div></div>`,
        executive: `<div class="t-exec-header"><div class="t-exec-avatar"></div><div class="t-exec-info"><div class="t-name"></div><div class="t-title"></div></div></div><div class="t-exec-body"><div class="t-line"></div><div class="t-line"></div></div>`,
        tech: `<div class="t-tech-header"><div class="t-code-icon">&lt;/&gt;</div><div class="t-name"></div></div><div class="t-tech-body"><div class="t-skill-bars"><div class="t-skill-bar"></div><div class="t-skill-bar"></div></div></div>`,
        designer: `<div class="t-designer-header"><div class="t-gradient-circle"></div><div class="t-name"></div></div><div class="t-designer-body"><div class="t-portfolio-grid"><div class="t-portfolio-item"></div><div class="t-portfolio-item"></div></div></div>`,
        graduate: `<div class="t-grad-header"><div class="t-grad-icon">🎓</div><div class="t-name"></div><div class="t-title"></div></div><div class="t-grad-body"><div class="t-line"></div><div class="t-line short"></div></div>`,
        corporate: `<div style="background:#1e3a5f;height:80px;margin:-20px -20px 15px;border-radius:8px 8px 0 0"></div><div class="t-line"></div><div class="t-line short"></div>`,
        elegant: `<div style="text-align:center;padding:20px 0;border-bottom:2px double #c9a961"><div class="t-name" style="background:#2c3e50;width:60%;margin:0 auto 10px"></div></div><div class="t-line" style="margin-top:20px"></div>`,
        bold: `<div style="background:linear-gradient(135deg,#667eea,#764ba2);height:80px;margin:-20px -20px 15px;border-radius:8px 8px 0 0"></div><div class="t-line"></div><div class="t-line short"></div>`,
        academic: `<div style="border-bottom:2px solid #2c5282;padding-bottom:15px;margin-bottom:15px"><div class="t-name" style="background:#2c5282"></div></div><div class="t-line"></div><div class="t-line short"></div>`
    };
    return previews[id] || '';
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = window.scrollY > 50 ? 'var(--bg-secondary)' : 'var(--bg-glass)';
    }
});

// Listen for language changes
window.addEventListener('languageChanged', () => {
    renderTemplates();
    updateTemplateSelect();
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderTemplates();
    updateTemplateSelect();
});
