<?php
namespace Hangman;
class HangmanEngine{

    public $options = [
        "fruits" => [
            "Pomme",
            "Bleuets",
            "Mandarine",
            "Anana",
            "Pomergranade",
            "Watermelon"
        ],
        "animals" => ["Herisson", "Rinoceros", "Ecureuil", "Panther", "Zebre"],
        "countries" => ["Congo", "Canada", "Royaume Unis", "France", "Chine"],
    ];

    private $choosenWord = " ";

    function displayOptions($options){
        $optionContainer = "<H3> Please Select An Option</H3>";

        foreach ($options as $key){ 
            $optionContainer += '<button class="options" onclick=randomWord('{$key}')>'{$key}'</button>';
        }

        return $optionContainer;
    }

}

$fullpath = $_GET["exec"];

?>