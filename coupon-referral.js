// Coupon Validation
function validateCoupon() {
    const code = document.getElementById('couponCode').value.trim();
    const msgEl = document.getElementById('couponMessage');

    if (!code) {
        msgEl.textContent = 'الرجاء إدخال كود الخصم';
        msgEl.style.color = 'var(--danger)';
        msgEl.style.display = 'block';
        return;
    }

    const result = applyCoupon(code);
    if (result.valid) {
        const discountText = result.type === 'percent'
            ? `${result.discount * 100}%`
            : `${result.discount} ريال`;
        msgEl.textContent = `✅ تم تطبيق الكود! خصم ${discountText}`;
        msgEl.style.color = 'var(--success)';
        localStorage.setItem('mycv_coupon', JSON.stringify({ code, ...result }));
    } else {
        msgEl.textContent = '❌ كود غير صالح';
        msgEl.style.color = 'var(--danger)';
    }
    msgEl.style.display = 'block';
}

// Show Referral Code
function showReferralCode() {
    const code = getReferralCode();
    const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${code}`;

    if (navigator.share) {
        navigator.share({
            title: 'My CV - انشئ سيرتك الذاتية',
            text: `استخدم الكود ${code} للحصول على خصم 10%`,
            url: shareUrl
        });
    } else {
        navigator.clipboard.writeText(`كود الإحالة: ${code}\nرابط: ${shareUrl}`);
        showSuccess(`كود الإحالة: ${code}\nتم نسخ الرابط!`);
    }
}

// Check for referral on page load
(function checkReferral() {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
        localStorage.setItem('mycv_referred_by', refCode);
    }
})();
