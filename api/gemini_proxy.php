<?php
header('Content-Type: application/json');

if (!function_exists('curl_init')) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL is not installed or enabled in your PHP configuration.']);
    exit;
}

require_once 'config.php';

if (!isset($GEMINI_API_KEY) || $GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY' || $GEMINI_API_KEY === '') {
    http_response_code(500);
    echo json_encode(['error' => 'Gemini API key not configured in api/config.php. Please enter your API key in that file.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'POST required']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
$prompt = $body['prompt'] ?? '';
if (!is_string($prompt) || trim($prompt) === '') {
    http_response_code(400);
    echo json_encode(['error' => 'prompt required']);
    exit;
}

$payload = [
    'contents' => [
        [
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ]
];

// FIX APPLIED HERE: Changed 'gemini-pro' to 'gemini-2.5-flash'
$url = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' . $GEMINI_API_KEY;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Kept for local dev, user confirmed they have issues
curl_setopt($ch, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'curl_exec failed', 'curl_error' => $curlErr]);
    exit;
}

http_response_code($http ?: 500);
echo $response;
?>