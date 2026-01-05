<?php
header('Content-Type: application/json');

if (!function_exists('curl_init')) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL is not installed or enabled in your PHP configuration.']);
    exit;
}

require_once 'config.php';

if (!isset($OPENAI_API_KEY) || $OPENAI_API_KEY === 'YOUR_API_KEY' || $OPENAI_API_KEY === '') {
    http_response_code(500);
    echo json_encode(['error' => 'OpenAI API key not configured in api/config.php. Please enter your API key in that file.']);
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
    "model" => "gpt-3.5-turbo",
    "messages" => [
        ["role" => "system", "content" => "You are a concise assistant that helps summarize movies."],
        ["role" => "user", "content" => $prompt]
    ],
    "max_tokens" => 250,
    "temperature" => 0.7
];

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Add this to bypass SSL verification for local development.
// You should remove this in a production environment.
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $OPENAI_API_KEY
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
``` 


````php
// filepath: c:\xampp\htdocs\MyApps\IMDB_Project\api\gemini_proxy.php
<?php
header('Content-Type: application/json');

// read API key and model from env
$GEMINI_KEY = getenv('GEMINI_API_KEY');
$GEMINI_MODEL = getenv('GEMINI_MODEL') ?: 'models/text-bison-001'; // change to your model, e.g. "models/gemini-1.0" if available

if (!$GEMINI_KEY) {
    http_response_code(500);
    echo json_encode(['error' => 'Gemini API key not configured on server']);
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
    "prompt" => [
        "text" => $prompt
    ],
    "temperature" => 0.7,
    "maxOutputTokens" => 250
];

$endpoint = "https://generativelanguage.googleapis.com/v1beta2/{$GEMINI_MODEL}:generateText?key=" . urlencode($GEMINI_KEY);

$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
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