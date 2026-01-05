<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];

    $conn = getDbConnection();

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $token = bin2hex(random_bytes(50));
        $expires = time() + 3600; // 1 hour

        $sql = "INSERT INTO password_resets (email, token, expires) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $email, $token, $expires);
        $stmt->execute();

        // For now, we will just display the link. In a real application, you would email this link.
        $reset_link = "http://localhost/MyApps/IMDB_Project/reset_password.php?token=" . $token;
        echo "Password reset link: <a href='" . $reset_link . "'>" . $reset_link . "</a>";
    } else {
        echo "No user found with that email address.";
    }

    $stmt->close();
    $conn->close();
}
?>