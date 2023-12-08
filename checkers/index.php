<?php
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
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <script src="js/script.js"></script>
</head>

<body>
  <header>
    <h1>
      <?php echo $welcomeMessage; ?>
    </h1>
    <nav>
      <ul>
        <li><a href="game.php">Play Game</a></li>
        <li><a href="help.php">Help</a></li>
        <?php
        if (isset($_SESSION['username'])) {
          // If the user is logged in, display the sign-out button
          echo '<li><a href="logout.php">Logout</a></li>';
        } else {
          // If the user is not logged in, display the login and register buttons
          echo '<li><a href="login.html">Login</a></li>';
          echo '<li><a href="signup.html">Register</a></li>';
        }
        ?>
        <li><a href="leaderboard.php">Leaderboard</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- Main content here -->
  </main>

  <footer>
    <a href="contact.php">Contact</a>
  </footer>
</body>

</html>