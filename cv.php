<?php
// CV Management API
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';
$cvId = $_GET['id'] ?? null;

switch ($action) {
    case 'list':
        if ($method !== 'GET')
            jsonResponse(['error' => 'Method not allowed'], 405);
        listCVs();
        break;

    case 'get':
        if ($method !== 'GET')
            jsonResponse(['error' => 'Method not allowed'], 405);
        getCV($cvId);
        break;

    case 'save':
        if ($method !== 'POST')
            jsonResponse(['error' => 'Method not allowed'], 405);
        saveCV();
        break;

    case 'update':
        if ($method !== 'PUT')
            jsonResponse(['error' => 'Method not allowed'], 405);
        updateCV($cvId);
        break;

    case 'delete':
        if ($method !== 'DELETE')
            jsonResponse(['error' => 'Method not allowed'], 405);
        deleteCV($cvId);
        break;

    case 'customize':
        if ($method !== 'PUT')
            jsonResponse(['error' => 'Method not allowed'], 405);
        customizeCV($cvId);
        break;

    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

function listCVs()
{
    $user = requireAuth();
    $db = getDB();

    $stmt = $db->prepare("
        SELECT id, name, template, primary_color, secondary_color, font_family, is_default, created_at, updated_at
        FROM cvs WHERE user_id = ? ORDER BY updated_at DESC
    ");
    $stmt->execute([$user['id']]);
    $cvs = $stmt->fetchAll();

    jsonResponse(['cvs' => $cvs]);
}

function getCV($id)
{
    $user = requireAuth();
    $db = getDB();

    $stmt = $db->prepare("SELECT * FROM cvs WHERE id = ? AND user_id = ?");
    $stmt->execute([$id, $user['id']]);
    $cv = $stmt->fetch();

    if (!$cv) {
        jsonResponse(['error' => 'CV not found'], 404);
    }

    $cv['data'] = json_decode($cv['data'], true);
    jsonResponse(['cv' => $cv]);
}

function saveCV()
{
    $user = requireAuth();
    $input = getInput();

    $name = $input['name'] ?? 'سيرتي الذاتية';
    $template = $input['template'] ?? 'modern';
    $primaryColor = $input['primary_color'] ?? '#6366f1';
    $secondaryColor = $input['secondary_color'] ?? '#ec4899';
    $fontFamily = $input['font_family'] ?? 'Cairo';
    $data = json_encode($input['data'] ?? [], JSON_UNESCAPED_UNICODE);

    $db = getDB();

    $stmt = $db->prepare("
        INSERT INTO cvs (user_id, name, template, primary_color, secondary_color, font_family, data)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING *
    ");
    $stmt->execute([$user['id'], $name, $template, $primaryColor, $secondaryColor, $fontFamily, $data]);
    $cv = $stmt->fetch();
    $cv['data'] = json_decode($cv['data'], true);

    jsonResponse(['success' => true, 'cv' => $cv]);
}

function updateCV($id)
{
    $user = requireAuth();
    $input = getInput();
    $db = getDB();

    // Check ownership
    $stmt = $db->prepare("SELECT id FROM cvs WHERE id = ? AND user_id = ?");
    $stmt->execute([$id, $user['id']]);
    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'CV not found'], 404);
    }

    $name = $input['name'] ?? null;
    $template = $input['template'] ?? null;
    $data = isset($input['data']) ? json_encode($input['data'], JSON_UNESCAPED_UNICODE) : null;

    $updates = [];
    $params = [];

    if ($name !== null) {
        $updates[] = "name = ?";
        $params[] = $name;
    }
    if ($template !== null) {
        $updates[] = "template = ?";
        $params[] = $template;
    }
    if ($data !== null) {
        $updates[] = "data = ?";
        $params[] = $data;
    }

    if (empty($updates)) {
        jsonResponse(['error' => 'No data to update'], 400);
    }

    $updates[] = "updated_at = NOW()";
    $params[] = $id;

    $sql = "UPDATE cvs SET " . implode(', ', $updates) . " WHERE id = ? RETURNING *";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $cv = $stmt->fetch();
    $cv['data'] = json_decode($cv['data'], true);

    jsonResponse(['success' => true, 'cv' => $cv]);
}

function deleteCV($id)
{
    $user = requireAuth();
    $db = getDB();

    $stmt = $db->prepare("DELETE FROM cvs WHERE id = ? AND user_id = ? RETURNING id");
    $stmt->execute([$id, $user['id']]);

    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'CV not found'], 404);
    }

    jsonResponse(['success' => true]);
}

function customizeCV($id)
{
    $user = requireAuth();
    $input = getInput();
    $db = getDB();

    // Check ownership
    $stmt = $db->prepare("SELECT id FROM cvs WHERE id = ? AND user_id = ?");
    $stmt->execute([$id, $user['id']]);
    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'CV not found'], 404);
    }

    $primaryColor = $input['primary_color'] ?? null;
    $secondaryColor = $input['secondary_color'] ?? null;
    $fontFamily = $input['font_family'] ?? null;

    $updates = [];
    $params = [];

    if ($primaryColor !== null) {
        $updates[] = "primary_color = ?";
        $params[] = $primaryColor;
    }
    if ($secondaryColor !== null) {
        $updates[] = "secondary_color = ?";
        $params[] = $secondaryColor;
    }
    if ($fontFamily !== null) {
        $updates[] = "font_family = ?";
        $params[] = $fontFamily;
    }

    if (empty($updates)) {
        jsonResponse(['error' => 'No customization data'], 400);
    }

    $updates[] = "updated_at = NOW()";
    $params[] = $id;

    $sql = "UPDATE cvs SET " . implode(', ', $updates) . " WHERE id = ? RETURNING *";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $cv = $stmt->fetch();

    jsonResponse(['success' => true, 'cv' => $cv]);
}
