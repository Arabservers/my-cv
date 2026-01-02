// Dashboard JavaScript
const API_BASE = 'api';

// State
let currentUser = null;
let currentCVs = [];
let customization = {
    primaryColor: '#6366f1',
    secondaryColor: '#ec4899',
    fontFamily: 'Cairo'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initTabs();
    initAuthTabs();
    initColorPickers();
    initUserMenu();
});

// Authentication
function checkAuth() {
    const token = localStorage.getItem('mycv_token');
    const userData = localStorage.getItem('mycv_user');

    if (token && userData) {
        currentUser = JSON.parse(userData);
        updateUserUI();
        loadUserData();
    } else {
        showLoginModal();
    }
}

function updateUserUI() {
    if (!currentUser) return;

    document.getElementById('userName').textContent = currentUser.name || 'المستخدم';
    document.getElementById('userPlan').textContent = currentUser.subscription_type === 'monthly' ? 'اشتراك شهري' : 'خطة مجانية';

    if (currentUser.avatar) {
        document.getElementById('sidebarAvatar').src = currentUser.avatar;
        document.getElementById('userAvatar').src = currentUser.avatar;
    }

    document.getElementById('settingsName').value = currentUser.name || '';
    document.getElementById('settingsEmail').value = currentUser.email || '';
}

async function loadUserData() {
    await loadCVs();
    // Load other data as needed
}

async function loadCVs() {
    const token = localStorage.getItem('mycv_token');
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE}/cv.php?action=list`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (data.cvs) {
            currentCVs = data.cvs;
            renderCVs();
        }
    } catch (error) {
        console.error('Error loading CVs:', error);
    }
}

function renderCVs() {
    const grid = document.getElementById('cvsGrid');

    let html = currentCVs.map(cv => `
        <div class="cv-card" data-id="${cv.id}">
            <div class="cv-card-preview" style="background: linear-gradient(135deg, ${cv.primary_color}, ${cv.secondary_color})">
                <div class="cv-card-overlay">
                    <a href="builder.html?cv=${cv.id}" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i> تعديل</a>
                    <button class="btn btn-glass btn-sm" onclick="deleteCV(${cv.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="cv-card-info">
                <h3>${cv.name}</h3>
                <p>${cv.template} • ${new Date(cv.updated_at).toLocaleDateString('ar')}</p>
            </div>
        </div>
    `).join('');

    html += `
        <div class="cv-card-new" onclick="window.location='builder.html'">
            <i class="fas fa-plus"></i>
            <span>إنشاء CV جديد</span>
        </div>
    `;

    grid.innerHTML = html;
    document.getElementById('totalCVs').textContent = currentCVs.length;
}

// Tabs
function initTabs() {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.dataset.tab;

            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById(`tab-${tab}`).classList.add('active');
        });
    });
}

// Auth Tabs
function initAuthTabs() {
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;

            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.getElementById('loginForm').style.display = tabName === 'login' ? 'block' : 'none';
            document.getElementById('registerForm').style.display = tabName === 'register' ? 'block' : 'none';
        });
    });

    // Login form
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch(`${API_BASE}/auth.php?action=login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('mycv_token', data.token);
                localStorage.setItem('mycv_user', JSON.stringify(data.user));
                currentUser = data.user;
                closeModal('loginModal');
                updateUserUI();
                loadUserData();
            } else {
                alert(data.error || 'فشل تسجيل الدخول');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    });

    // Register form
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch(`${API_BASE}/auth.php?action=register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('mycv_token', data.token);
                localStorage.setItem('mycv_user', JSON.stringify(data.user));
                currentUser = data.user;
                closeModal('loginModal');
                updateUserUI();
            } else {
                alert(data.error || 'فشل إنشاء الحساب');
            }
        } catch (error) {
            console.error('Register error:', error);
        }
    });
}

// Google Login
async function loginWithGoogle() {
    // Simulate Google login for now
    // In production, use Firebase Auth or Google Sign-In
    const mockGoogleUser = {
        google_id: 'google_' + Date.now(),
        email: 'user@gmail.com',
        name: 'مستخدم Google',
        avatar: 'https://via.placeholder.com/80'
    };

    try {
        const response = await fetch(`${API_BASE}/auth.php?action=google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockGoogleUser)
        });
        const data = await response.json();

        if (data.success) {
            localStorage.setItem('mycv_token', data.token);
            localStorage.setItem('mycv_user', JSON.stringify(data.user));
            currentUser = data.user;
            closeModal('loginModal');
            updateUserUI();
            loadUserData();
        }
    } catch (error) {
        console.error('Google login error:', error);
    }
}

// Color Pickers
function initColorPickers() {
    const primaryInput = document.getElementById('primaryColor');
    const secondaryInput = document.getElementById('secondaryColor');

    if (primaryInput) {
        primaryInput.addEventListener('input', (e) => {
            setPrimaryColor(e.target.value);
        });
    }

    if (secondaryInput) {
        secondaryInput.addEventListener('input', (e) => {
            setSecondaryColor(e.target.value);
        });
    }
}

function setPrimaryColor(color) {
    customization.primaryColor = color;
    document.getElementById('primaryColor').value = color;
    updatePreview();

    // Update preset active state
    document.querySelectorAll('.color-group:first-child .color-preset').forEach(btn => {
        btn.classList.toggle('active', btn.style.background === color);
    });
}

function setSecondaryColor(color) {
    customization.secondaryColor = color;
    document.getElementById('secondaryColor').value = color;
    updatePreview();
}

function setFont(font) {
    customization.fontFamily = font;

    document.querySelectorAll('.font-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.font === font);
    });

    updatePreview();
}

function updatePreview() {
    const preview = document.getElementById('customizePreview');
    if (!preview) return;

    const header = document.getElementById('previewHeader');
    const section = document.getElementById('previewSection');

    header.style.background = `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`;
    section.style.color = customization.primaryColor;
    section.style.borderColor = customization.primaryColor;
    preview.style.fontFamily = customization.fontFamily;
}

async function saveCustomization() {
    const token = localStorage.getItem('mycv_token');
    if (!token) {
        showLoginModal();
        return;
    }

    // Save to localStorage for now
    localStorage.setItem('mycv_customization', JSON.stringify(customization));
    alert('تم حفظ التخصيص بنجاح!');
}

// User Menu
function initUserMenu() {
    const avatar = document.getElementById('userAvatar');
    const dropdown = document.getElementById('userDropdown');

    if (avatar && dropdown) {
        avatar.addEventListener('click', () => {
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                dropdown.classList.remove('active');
            }
        });
    }
}

// Settings
async function saveSettings() {
    const name = document.getElementById('settingsName').value;
    const token = localStorage.getItem('mycv_token');

    if (!token) return;

    try {
        const response = await fetch(`${API_BASE}/auth.php?action=profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });
        const data = await response.json();

        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('mycv_user', JSON.stringify(data.user));
            updateUserUI();
            alert('تم حفظ التغييرات!');
        }
    } catch (error) {
        console.error('Save settings error:', error);
    }
}

// Delete CV
async function deleteCV(id) {
    if (!confirm('هل تريد حذف هذه السيرة الذاتية؟')) return;

    const token = localStorage.getItem('mycv_token');
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE}/cv.php?action=delete&id=${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (data.success) {
            loadCVs();
        }
    } catch (error) {
        console.error('Delete CV error:', error);
    }
}

// Logout
function logout() {
    localStorage.removeItem('mycv_token');
    localStorage.removeItem('mycv_user');
    currentUser = null;
    window.location.reload();
}

// Modals
function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function showUpgrade() {
    window.location = 'builder.html';
}

document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', e => {
        if (e.target === m) m.classList.remove('active');
    });
});
