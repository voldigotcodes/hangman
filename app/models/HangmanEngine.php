<?php
namespace Hangman;
class HangmanEngine{

    private $options = [
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
    public $length;
    public $badAnswerCount=0;
    public $goodAnswerCount=0;
    public $GAME_STATE = '';

    function generateWord($type){
        $this->choosenWord =$this->options[$type][rand(0, count($this->options))];
        return $this->choosenWord;
    }

    function isContained($letter){
        if(str_contains(strtolower($this->choosenWord), strtolower($letter))){
            return true;
        }
        return false;
    }

    function giveAnswer($good){
        if($good){
            $this->goodAnswerCount +=1;
        }else{
            $this->badAnswerCount +=1;
        }

        //Do the $_POST with the correct information
            if($this->goodAnswerCount == strlen($this->choosenWord)){
                //WIN
                $GAME_STATE = 'WIN';
            }elseif($this->badAnswerCount>=6){
                //LOOSE
                $GAME_STATE = 'LOOSE';
                // $request = json_encode();
            }
    }

    function getWord(){
        return $this->choosenWord;
    }

}

$engine = new HangmanEngine();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    // $value = $_POST["value"];
    //echo var_dump($_POST);
    // switch($exec){
    //     case "generate":
    $value = $_POST["value"];
    echo $engine->generateWord($value);
    //         break;
    //     case "key":
    //         break;
    //     default:
    //     break;
    //     }
}

if($_SERVER['REQUEST_METHOD'] == 'GET' ){
    $path = $_REQUEST["path"];
    switch($path){
        case "word":
            echo json_encode($engine->getWord());
            break;
            case "keyURL":
                $key = $_REQUEST["key"];
                if($engine->isContained($key)){
                    $engine->giveAnswer(true);
                    echo json_encode(true);
                }else{
                    $engine->giveAnswer(false);
                    echo json_encode(false);
                }
                break;
            default:
            break;
    }
}

?>