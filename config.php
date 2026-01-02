<?php
// Database Configuration - Neon PostgreSQL
define('DB_HOST', 'ep-billowing-rain-ah34tjik-pooler.c-3.us-east-1.aws.neon.tech');
define('DB_NAME', 'neondb');
define('DB_USER', 'neondb_owner');
define('DB_PASS', 'npg_mFbHe8qgnC5Y');
define('DB_PORT', '5432');

// Database Connection
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";sslmode=require";
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(['error' => 'Database connection failed']));
        }
    }
    return $pdo;
}

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Helper Functions
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function getInput() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

function generateToken($length = 32) {
    return bin2hex(random_bytes($length));
}

function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Session/Token Management
function getUserFromToken() {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? '';
    $token = str_replace('Bearer ', '', $token);
    
    if (empty($token)) return null;
    
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM users WHERE token = ? AND token_expires > NOW()");
    $stmt->execute([$token]);
    return $stmt->fetch();
}

function requireAuth() {
    $user = getUserFromToken();
    if (!$user) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    return $user;
}
