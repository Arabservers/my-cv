<?php
// User Authentication API
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'register':
        if ($method !== 'POST')
            jsonResponse(['error' => 'Method not allowed'], 405);
        register();
        break;

    case 'login':
        if ($method !== 'POST')
            jsonResponse(['error' => 'Method not allowed'], 405);
        login();
        break;

    case 'google':
        if ($method !== 'POST')
            jsonResponse(['error' => 'Method not allowed'], 405);
        googleLogin();
        break;

    case 'profile':
        if ($method === 'GET')
            getProfile();
        elseif ($method === 'PUT')
            updateProfile();
        else
            jsonResponse(['error' => 'Method not allowed'], 405);
        break;

    case 'logout':
        logout();
        break;

    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

function register()
{
    $input = getInput();
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    $name = $input['name'] ?? '';

    if (empty($email) || empty($password)) {
        jsonResponse(['error' => 'Email and password required'], 400);
    }

    $db = getDB();

    // Check if email exists
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Email already registered'], 400);
    }

    // Create user
    $token = generateToken();
    $expires = date('Y-m-d H:i:s', strtotime('+30 days'));

    $stmt = $db->prepare("
        INSERT INTO users (email, password, name, token, token_expires)
        VALUES (?, ?, ?, ?, ?)
        RETURNING id, email, name, subscription_type
    ");
    $stmt->execute([$email, hashPassword($password), $name, $token, $expires]);
    $user = $stmt->fetch();

    jsonResponse([
        'success' => true,
        'user' => $user,
        'token' => $token
    ]);
}

function login()
{
    $input = getInput();
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        jsonResponse(['error' => 'Email and password required'], 400);
    }

    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !verifyPassword($password, $user['password'])) {
        jsonResponse(['error' => 'Invalid credentials'], 401);
    }

    // Generate new token
    $token = generateToken();
    $expires = date('Y-m-d H:i:s', strtotime('+30 days'));

    $stmt = $db->prepare("UPDATE users SET token = ?, token_expires = ? WHERE id = ?");
    $stmt->execute([$token, $expires, $user['id']]);

    unset($user['password'], $user['token'], $user['token_expires']);

    jsonResponse([
        'success' => true,
        'user' => $user,
        'token' => $token
    ]);
}

function googleLogin()
{
    $input = getInput();
    $googleId = $input['google_id'] ?? '';
    $email = $input['email'] ?? '';
    $name = $input['name'] ?? '';
    $avatar = $input['avatar'] ?? '';

    if (empty($googleId) || empty($email)) {
        jsonResponse(['error' => 'Google ID and email required'], 400);
    }

    $db = getDB();

    // Check if user exists
    $stmt = $db->prepare("SELECT * FROM users WHERE google_id = ? OR email = ?");
    $stmt->execute([$googleId, $email]);
    $user = $stmt->fetch();

    $token = generateToken();
    $expires = date('Y-m-d H:i:s', strtotime('+30 days'));

    if ($user) {
        // Update existing user
        $stmt = $db->prepare("
            UPDATE users SET google_id = ?, name = ?, avatar = ?, token = ?, token_expires = ?
            WHERE id = ?
            RETURNING id, email, name, avatar, subscription_type
        ");
        $stmt->execute([$googleId, $name, $avatar, $token, $expires, $user['id']]);
        $user = $stmt->fetch();
    } else {
        // Create new user
        $stmt = $db->prepare("
            INSERT INTO users (email, google_id, name, avatar, token, token_expires)
            VALUES (?, ?, ?, ?, ?, ?)
            RETURNING id, email, name, avatar, subscription_type
        ");
        $stmt->execute([$email, $googleId, $name, $avatar, $token, $expires]);
        $user = $stmt->fetch();
    }

    jsonResponse([
        'success' => true,
        'user' => $user,
        'token' => $token
    ]);
}

function getProfile()
{
    $user = requireAuth();
    unset($user['password'], $user['token'], $user['token_expires']);
    jsonResponse(['user' => $user]);
}

function updateProfile()
{
    $user = requireAuth();
    $input = getInput();

    $name = $input['name'] ?? $user['name'];
    $avatar = $input['avatar'] ?? $user['avatar'];

    $db = getDB();
    $stmt = $db->prepare("
        UPDATE users SET name = ?, avatar = ?, updated_at = NOW()
        WHERE id = ?
        RETURNING id, email, name, avatar, subscription_type
    ");
    $stmt->execute([$name, $avatar, $user['id']]);
    $updatedUser = $stmt->fetch();

    jsonResponse(['success' => true, 'user' => $updatedUser]);
}

function logout()
{
    $user = getUserFromToken();
    if ($user) {
        $db = getDB();
        $stmt = $db->prepare("UPDATE users SET token = NULL, token_expires = NULL WHERE id = ?");
        $stmt->execute([$user['id']]);
    }
    jsonResponse(['success' => true]);
}
