<?php
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  echo "<script>console.log('Connection failed: " . $conn->connect_error . "');</script>";
} else {
  echo "<script>console.log('Connected successfully');</script>";
}

// Create database
$dbname = "checkers";
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";

if ($conn->query($sql) === TRUE) {
  echo "<script>console.log('Database created successfully');</script>";
} else {
  echo "<script>console.log('Error creating database: " . $conn->error . "');</script>";
}

$conn->select_db($dbname);

// Create table within the selected database
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
  echo "<script>console.log('Users table created successfully');</script>";
} else {
  echo "<script>console.log('Error creating table: " . $conn->error . "');</script>";
}

$conn->close();
