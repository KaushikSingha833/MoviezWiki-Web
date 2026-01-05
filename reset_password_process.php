<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST['token'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password !== $confirm_password) {
        die("Passwords do not match.");
    }

    $conn = getDbConnection();

    $sql = "SELECT * FROM password_resets WHERE token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($row['expires'] >= time()) {
            $email = $row['email'];
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            $sql = "UPDATE users SET password = ? WHERE email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $hashed_password, $email);
            $stmt->execute();

            $sql = "DELETE FROM password_resets WHERE token = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $token);
            $stmt->execute();

            header("Location: login.html?message=Password reset successful. Please login.");
        } else {
            echo "Token has expired.";
        }
    } else {
        echo "Invalid token.";
    }

    $stmt->close();
    $conn->close();
}
?>