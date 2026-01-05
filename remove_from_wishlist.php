<?php
session_start();
require_once 'config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$movie_title = $data['movie_title'] ?? '';
$user_id = $_SESSION['user_id'];

$conn = getDbConnection();

if (empty($movie_title)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid movie data']);
    exit;
}

$sql = "DELETE FROM wishlist WHERE user_id = ? AND movie_name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $user_id, $movie_title);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Removed from wishlist']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to remove from wishlist']);
}

$stmt->close();
$conn->close();
?>