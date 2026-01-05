<?php
header('Content-Type: application/json');

if (!function_exists('curl_init')) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL is not installed or enabled in your PHP configuration.']);
    exit;
}

require_once 'config.php';

if (!isset($MISTRAL_API_KEY) || $MISTRAL_API_KEY === 'YOUR_MISTRAL_API_KEY' || $MISTRAL_API_KEY === '') {
    http_response_code(500);
    echo json_encode(['error' => 'Mistral AI API key not configured in api/config.php. Please enter your API key in that file.']);
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
    'model' => 'mistral-small-latest',
    'messages' => [
        [
            'role' => 'user',
            'content' => $prompt
        ]
    ]
];

$url = 'https://api.mistral.ai/v1/chat/completions';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Should be true in production
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $MISTRAL_API_KEY
]);
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