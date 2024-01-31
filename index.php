<?php
include "db.php";
session_start();

// Check if the user is logged in
if (isset($_SESSION['username'])) {
  $welcomeMessage = 'Welcome to Checkers, ' . $_SESSION['username'];
} else {
  $welcomeMessage = 'Welcome to Checkers, Guest';
}
?>

<!DOCTYPE html>
<html>

<head>
  <title>Checkers Game</title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
  <header>
    <h1>
      <img class="center-image" src="img/Fresno_State_Bulldogs.png" alt="Bulldogs Image">
      <?php echo $welcomeMessage; ?>
    </h1>
  </header>

  <main>
    <nav>
      <ul>
        <li><a href="game.html">Play Game</a></li>
        <li><a href="help.html">Help</a></li>
        <?php
        if (isset($_SESSION['username'])) {
          // If the user is logged in, display the sign-out button
          echo '<li><a href="logout.php">Logout</a></li>';
        } else {
          // If the user is not logged in, display the login and register buttons
          echo '<li><a href="login.html">Login</a></li>';
          echo '<li><a href="register.html">Register</a></li>';
        }
        ?>
        <li><a href="leaderboard.php">Leaderboard</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </main>
</body>

</html>