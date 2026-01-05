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
$movie_poster = $data['movie_poster'] ?? '';
$user_id = $_SESSION['user_id'];

$conn = getDbConnection();

if (empty($movie_title) || empty($movie_poster)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid movie data']);
    exit;
}

// Check if the movie is already in the wishlist
$sql_check = "SELECT * FROM wishlist WHERE user_id = ? AND movie_name = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("is", $user_id, $movie_title);
$stmt_check->execute();
$result = $stmt_check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Movie already in wishlist']);
    exit;
}

$sql = "INSERT INTO wishlist (user_id, movie_name, movie_image) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $user_id, $movie_title, $movie_poster);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Added to wishlist']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to add to wishlist']);
}

$stmt->close();
$conn->close();
?>