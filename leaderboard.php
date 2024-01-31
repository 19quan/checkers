<!DOCTYPE html>
<html>

<head>
  <title>Leaderboard</title>
  <link rel="stylesheet" type="text/css" href="css/leaderboard.css">
</head>

<body>
  <img src="img/Fresno_State_logo.png" alt="Fresno State Logo">
  <div class="homebutton">
    <a href="index.php">Back to Home</a>
  </div>
  <p>Click on a tab to sort by that parameter!</p>
  <div id="leaderboard" class="center-table">
    <?php include "display_leaderboard.php"; ?>
  </div>

  <script>
    function sortLeaderboard(sortBy) {
      // Reload the page with the sorting criteria as a URL parameter
      window.location.href = `leaderboard.php?sort=${sortBy}`;
    }
  </script>
</body>

</html>