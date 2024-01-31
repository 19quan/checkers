<?php
session_start();

if (isset($_SESSION['username']) && isset($_POST['whitePieceCount']) && isset($_POST['totalSeconds'])) {
  // Establish a connection to MySQL database
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "checkers";

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check the connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $username = $_SESSION['username'];
  $whitePieceCount = intval($_POST['whitePieceCount']);
  $totalSeconds = intval($_POST['totalSeconds']);

  // Update user's game stats in the database
  $updateQuery = "UPDATE users SET games_played = games_played + 1";

  // Check if the game is won
  if ($whitePieceCount === 0) {
    $updateQuery .= ", won_games = won_games + 0"; // Increment won_games if player 1 (white) wins
  } else {
    $updateQuery .= ", won_games = won_games + 1";
  }

  // Update time_played
  $updateQuery .= ", time_played = SEC_TO_TIME(TIME_TO_SEC(time_played) + $totalSeconds)"; // Assuming time_played is in TIME format

  // Complete the query by specifying the user
  $updateQuery .= " WHERE username = '$username'";

  // Execute the update query
  if ($conn->query($updateQuery) === TRUE) {
    echo "Game stats updated successfully.";
  } else {
    echo "Error updating game stats: " . $conn->error;
  }

  $conn->close();
}
