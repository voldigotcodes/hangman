<?php
require_once('_config.php');

use Hangman\HangmanEngine;

$engine = new HangmanEngine();
echo "bonjour";

echo "{$engine->displayOptions($engine->options)}";

// for ($i=1; $i<=5; $i++) {
//   echo "ROLL {$i}: {$d->roll()}<br>";
// }
?>