<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['username'])) {
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

    // Update user's game stats in the database
    $username = $_SESSION['username'];

    // Increment games played by 1
    $updateQuery = "UPDATE users SET games_played = games_played + 1 WHERE username = '$username'";
    $conn->query($updateQuery);

    // Update other game stats as needed, for example, won_games and time_played

    // Close the database connection
    $conn->close();
}
?>
