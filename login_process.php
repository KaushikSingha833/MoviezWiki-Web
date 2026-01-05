<?php
session_start();
require_once 'config.php';

$conn = getDbConnection();

$username = $_POST['username'];
$password = $_POST['password'];

if (empty($username) || empty($password)) {
    die("Please fill all fields.");
}

$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $user, $hashed_password);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
        $_SESSION['loggedin'] = true;
        $_SESSION['id'] = $id;
        $_SESSION['username'] = $user;

        header("Location: index.php");
    } else {
        die("Invalid password.");
    }
} else {
    die("No user found with that username.");
}

$stmt->close();
$conn->close();
?>