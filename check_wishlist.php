<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);
$movies = $data['movies'] ?? [];

$conn = getDbConnection();

if (empty($movies)) {
    echo json_encode([]);
    exit;
}

$placeholders = implode(',', array_fill(0, count($movies), '?'));
$sql = "SELECT movie_name FROM wishlist WHERE user_id = ? AND movie_name IN ($placeholders)";
$stmt = $conn->prepare($sql);

$types = 'i' . str_repeat('s', count($movies));
$params = array_merge([$user_id], $movies);

// Create a new array for bind_param arguments
$bind_params = [];
$bind_params[] = $types;
for ($i = 0; $i < count($params); $i++) {
    $bind_params[] = &$params[$i];
}

call_user_func_array([$stmt, 'bind_param'], $bind_params);

$stmt->execute();
$result = $stmt->get_result();

$wishlist_movies = [];
while ($row = $result->fetch_assoc()) {
    $wishlist_movies[] = $row['movie_name'];
}

echo json_encode($wishlist_movies);

$stmt->close();
$conn->close();
?>