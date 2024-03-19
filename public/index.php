<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HANGMAN</title>

    <!-- StyleSheet -->
    <link rel="stylesheet" href="assets/style.css">
    <!-- Jquery -->
    <script src="assets/jquery-3.7.1.js"></script>
</head>
<body>
    <?php
    require_once('_config.php');

    use Hangman\HangmanEngine;

    $engine = new HangmanEngine();

    ?>
    <div class="title-container">
            <h1>HANGMAN : WEB EDITION</h1>
    </div>
    <div class="container">
    <div id="options-container"></div>
    <div id="keyboard-container" class="keyboard-container hide"></div>
    <div id="input-display-section"></div>
    <canvas id="canvas"></canvas>
    <div id="new-game-container" class="new-game-popup hide">
        <div id="result-text"></div>
        <button id="new-game-button">New Game</button>
    </div>
</div>

    <!--Script-->
    <script src="assets/script.js"></script>

</body>
</html>