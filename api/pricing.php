<?php
// Pricing & Coupons API
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'plans';

switch ($action) {
    case 'plans':
        if ($method !== 'GET')
            jsonResponse(['error' => 'Method not allowed'], 405);
        getPlans();
        break;

    case 'validate-coupon':
        if ($method !== 'POST')
            jsonResponse(['error' => 'Method not allowed'], 405);
        validateCoupon();
        break;

    case 'apply-coupon':
        if ($method !== 'POST')
            jsonResponse(['error' => 'Method not allowed'], 405);
        applyCouponToPrice();
        break;

    case 'purchase':
        if ($method !== 'POST')
            jsonResponse(['error' => 'Method not allowed'], 405);
        processPurchase();
        break;

    case 'subscription':
        if ($method !== 'GET')
            jsonResponse(['error' => 'Method not allowed'], 405);
        getUserSubscription();
        break;

    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

// ============== PRICING PLANS ==============
function getPlans()
{
    $plans = [
        'free' => [
            'name' => 'مجاني',
            'name_en' => 'Free',
            'price_sar' => 0,
            'price_usd' => 0,
            'features' => ['سير ذاتية غير محدودة', 'كل القوالب', 'تصدير PDF', 'علامة مائية'],
            'features_en' => ['Unlimited CVs', 'All Templates', 'PDF Export', 'Watermark'],
            'badge' => null
        ],
        'single' => [
            'name' => 'تحميل واحد',
            'name_en' => 'Single Download',
            'price_sar' => 5,
            'price_usd' => 1.5,
            'features' => ['CV واحد', 'بدون علامة مائية', 'جودة عالية', 'كل القوالب'],
            'features_en' => ['One CV', 'No Watermark', 'High Quality', 'All Templates'],
            'badge' => null
        ],
        'monthly' => [
            'name' => 'شهري',
            'name_en' => 'Monthly',
            'price_sar' => 29,
            'price_usd' => 8,
            'features' => ['تحميلات غير محدودة', 'بدون علامة مائية', 'قوالب حصرية', 'دعم أولوية'],
            'features_en' => ['Unlimited Downloads', 'No Watermark', 'Exclusive Templates', 'Priority Support'],
            'badge' => 'الأكثر طلباً',
            'badge_en' => 'Most Popular'
        ],
        'lifetime' => [
            'name' => 'مدى الحياة',
            'name_en' => 'Lifetime',
            'price_sar' => 79,
            'price_usd' => 21,
            'features' => ['تحميلات غير محدودة للأبد', 'جميع القوالب', 'دعم VIP', 'قوالب حصرية', 'تحديثات مجانية'],
            'features_en' => ['Unlimited Downloads Forever', 'All Templates', 'VIP Support', 'Exclusive Templates', 'Free Updates'],
            'badge' => '⭐ أفضل قيمة',
            'badge_en' => '⭐ Best Value'
        ],
        'business' => [
            'name' => 'الشركات',
            'name_en' => 'Business',
            'price_sar' => 199,
            'price_usd' => 53,
            'features' => ['50 مستخدم', 'لوحة تحكم', 'تقارير', 'دعم مخصص', 'براندينج مخصص'],
            'features_en' => ['50 Users', 'Dashboard', 'Reports', 'Custom Support', 'Custom Branding'],
            'badge' => '🏢 للشركات',
            'badge_en' => '🏢 For Business'
        ]
    ];

    // Compare with Canva prices
    $comparison = [
        'canva_monthly_usd' => 12.99,
        'mycv_monthly_usd' => 8,
        'savings_percent' => round((1 - 8 / 12.99) * 100),
        'message' => 'وفر ' . round((1 - 8 / 12.99) * 100) . '% مقارنة بـ Canva!'
    ];

    jsonResponse([
        'plans' => $plans,
        'comparison' => $comparison,
        'currency' => [
            'sar' => 'ريال',
            'usd' => '$'
        ]
    ]);
}

// ============== COUPONS ==============
function getCoupons()
{
    return [
        'WELCOME20' => ['discount' => 0.20, 'type' => 'percent', 'desc' => 'خصم ترحيبي 20%'],
        'FIRST50' => ['discount' => 0.50, 'type' => 'percent', 'desc' => 'خصم 50%'],
        'SUPER70' => ['discount' => 0.70, 'type' => 'percent', 'desc' => 'خصم قوي 70%!'],
        'VIP80' => ['discount' => 0.80, 'type' => 'percent', 'desc' => 'خصم VIP 80%'],
        'FREE25' => ['discount' => 25, 'type' => 'fixed', 'desc' => 'خصم 25 ريال'],
        'LAUNCH30' => ['discount' => 0.30, 'type' => 'percent', 'desc' => 'خصم إطلاق 30%'],
        'STUDENT40' => ['discount' => 0.40, 'type' => 'percent', 'desc' => 'خصم طلابي 40%'],
        'NEWYEAR50' => ['discount' => 0.50, 'type' => 'percent', 'desc' => 'عرض السنة الجديدة 50%'],
        'SPECIAL90' => ['discount' => 0.90, 'type' => 'percent', 'desc' => 'عرض خاص 90%!']
    ];
}

function validateCoupon()
{
    $input = getInput();
    $code = strtoupper(trim($input['code'] ?? ''));

    if (empty($code)) {
        jsonResponse(['error' => 'يرجى إدخال كود الخصم'], 400);
    }

    $coupons = getCoupons();

    if (isset($coupons[$code])) {
        $coupon = $coupons[$code];
        jsonResponse([
            'valid' => true,
            'code' => $code,
            'discount' => $coupon['discount'],
            'type' => $coupon['type'],
            'description' => $coupon['desc'],
            'message' => 'تم تطبيق الكوبون بنجاح! ' . $coupon['desc']
        ]);
    } else {
        jsonResponse([
            'valid' => false,
            'error' => 'كود الخصم غير صالح'
        ], 400);
    }
}

function applyCouponToPrice()
{
    $input = getInput();
    $code = strtoupper(trim($input['code'] ?? ''));
    $plan = $input['plan'] ?? 'monthly';
    $currency = $input['currency'] ?? 'sar';

    $coupons = getCoupons();
    $plans = [
        'single' => ['sar' => 5, 'usd' => 1.5],
        'monthly' => ['sar' => 29, 'usd' => 8],
        'lifetime' => ['sar' => 79, 'usd' => 21],
        'business' => ['sar' => 199, 'usd' => 53]
    ];

    if (!isset($plans[$plan])) {
        jsonResponse(['error' => 'خطة غير صالحة'], 400);
    }

    $originalPrice = $plans[$plan][$currency];
    $finalPrice = $originalPrice;
    $discount = 0;

    if (!empty($code) && isset($coupons[$code])) {
        $coupon = $coupons[$code];
        if ($coupon['type'] === 'percent') {
            $discount = $originalPrice * $coupon['discount'];
        } else {
            $discount = min($coupon['discount'], $originalPrice);
        }
        $finalPrice = max(0, $originalPrice - $discount);
    }

    jsonResponse([
        'plan' => $plan,
        'currency' => $currency,
        'original_price' => $originalPrice,
        'discount' => round($discount, 2),
        'final_price' => round($finalPrice, 2),
        'coupon_applied' => !empty($code) && isset($coupons[$code])
    ]);
}

// ============== PURCHASE ==============
function processPurchase()
{
    $user = requireAuth();
    $input = getInput();

    $plan = $input['plan'] ?? 'monthly';
    $paymentMethod = $input['payment_method'] ?? 'paypal';
    $coupon = strtoupper(trim($input['coupon'] ?? ''));
    $transactionId = $input['transaction_id'] ?? null;

    $plans = [
        'single' => ['sar' => 5, 'usd' => 1.5, 'downloads' => 1, 'type' => 'single'],
        'monthly' => ['sar' => 29, 'usd' => 8, 'downloads' => -1, 'type' => 'subscription'],
        'lifetime' => ['sar' => 79, 'usd' => 21, 'downloads' => -1, 'type' => 'lifetime'],
        'business' => ['sar' => 199, 'usd' => 53, 'downloads' => -1, 'type' => 'business']
    ];

    if (!isset($plans[$plan])) {
        jsonResponse(['error' => 'خطة غير صالحة'], 400);
    }

    $db = getDB();

    // Update user subscription
    $subscriptionType = $plan;
    $expiresAt = null;

    if ($plan === 'monthly') {
        $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));
    } elseif ($plan === 'business') {
        $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));
    }

    $stmt = $db->prepare("
        UPDATE users 
        SET subscription_type = ?, 
            subscription_expires = ?,
            updated_at = NOW()
        WHERE id = ?
    ");
    $stmt->execute([$subscriptionType, $expiresAt, $user['id']]);

    // Log purchase
    $stmt = $db->prepare("
        INSERT INTO purchases (user_id, plan, amount, currency, payment_method, transaction_id, coupon_code)
        VALUES (?, ?, ?, 'SAR', ?, ?, ?)
    ");
    $stmt->execute([
        $user['id'],
        $plan,
        $plans[$plan]['sar'],
        $paymentMethod,
        $transactionId,
        $coupon ?: null
    ]);

    jsonResponse([
        'success' => true,
        'message' => 'تم الشراء بنجاح!',
        'subscription' => $subscriptionType,
        'expires_at' => $expiresAt
    ]);
}

function getUserSubscription()
{
    $user = requireAuth();

    $subscriptionType = $user['subscription_type'] ?? 'free';
    $expiresAt = $user['subscription_expires'] ?? null;

    // Check if subscription expired
    $isActive = true;
    if ($expiresAt && strtotime($expiresAt) < time()) {
        $isActive = false;
        $subscriptionType = 'free';
    }

    $features = [
        'free' => ['watermark' => true, 'downloads' => 0, 'templates' => 'basic'],
        'single' => ['watermark' => false, 'downloads' => 1, 'templates' => 'all'],
        'monthly' => ['watermark' => false, 'downloads' => -1, 'templates' => 'all'],
        'lifetime' => ['watermark' => false, 'downloads' => -1, 'templates' => 'all'],
        'business' => ['watermark' => false, 'downloads' => -1, 'templates' => 'all', 'users' => 50]
    ];

    jsonResponse([
        'subscription' => $subscriptionType,
        'is_active' => $isActive,
        'expires_at' => $expiresAt,
        'features' => $features[$subscriptionType] ?? $features['free']
    ]);
}
