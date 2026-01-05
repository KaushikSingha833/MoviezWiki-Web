<?php
require_once 'config.php';

$conn = getDbConnection();

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

if (empty($username) || empty($email) || empty($password)) {
    die("Please fill all fields.");
}

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $username, $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    die("Username or email already taken.");
}

$stmt->close();

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashed_password);

if ($stmt->execute()) {
    header("Location: login.html?registration=success");
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>