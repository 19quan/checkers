<?php
session_start();

// Establish a connection to MySQL database
$servername = "localhost"; // Change this to your server name if different
$username = "root";
$password = "";
$dbname = "checkers";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process the login form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Retrieve user data from the database based on the provided username
    $sql = "SELECT id, username, password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        // Verify the password
        if (password_verify($password, $row["password"])) {
            // Password is correct, set session variables and redirect to a dashboard or home page
            $_SESSION["username"] = $row["username"];
            $_SESSION["user_id"] = $row["id"];
            header("Location: index.php"); // Redirect to a dashboard or home page
            exit();
        } else {
            echo "Invalid password";
        }
    } else {
        echo "User not found";
    }
}

$stmt->close();
$conn->close();
?>
