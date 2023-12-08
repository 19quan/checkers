<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "checkers";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    won_games INT DEFAULT 0,
    games_played INT DEFAULT 0,
    time_played TIME DEFAULT '00:00:00'
)";

if ($conn->query($sql) === TRUE) {
    echo "users created";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
