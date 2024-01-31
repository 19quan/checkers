<?php
include "db.php";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Default sorting by 'won_games' if no sorting parameter is provided
$sortBy = isset($_GET['sort']) ? $_GET['sort'] : 'won_games';

// Fetch leaderboard data from the database based on the sorting criteria
$query = "SELECT username, won_games, games_played, time_played FROM users ORDER BY $sortBy DESC LIMIT 10"; // Adjust the query to suit your needs
$result = $conn->query($query);

if ($result->num_rows > 0) {
  echo "<table border='1'>
    <tr>
    <th><a href='leaderboard.php?sort=username'>Username</a></th>
    <th><a href='leaderboard.php?sort=won_games'>Games Won</a></th>
    <th><a href='leaderboard.php?sort=games_played'>Games Played</a></th>
    <th><a href='leaderboard.php?sort=time_played'>Time Played</a></th>
    </tr>";

  // Output data of each row
  while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['username'] . "</td>";
    echo "<td>" . $row['won_games'] . "</td>";
    echo "<td>" . $row['games_played'] . "</td>";
    echo "<td>" . $row['time_played'] . "</td>";
    echo "</tr>";
  }

  echo "</table>";
} else {
  echo "No leaderboard data available.";
}

// Close the database connection
$conn->close();
