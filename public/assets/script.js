const keyboardContainer = document.getElementById("keyboard-container");
const optionsContainer = document.getElementById("options-container");
const inputDisplaySection = document.getElementById("input-display-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

// $(document).ready(function(){
//     $.ajax({
//         type: "POST",
//         url: "/app/models/hangmanEngine.php",
//         data: {
//             "exec" : "init",
//             "value" : "",
//             "key" : ""
//         },
//         success : function(word){
//             console.log("initialized")
//         }
//     })
// })

let hangmanApi = {
    WordList : function() {
        $.ajax({
            type: "POST",
            url: "hangmanEngine.php/exec=init?",
            success: function (list) {f
                randomWord(list)
            }
        })
    },
    generateWord : function(_type){
        $.post("/app/models/hangmanEngine.php", {"value" : _type},
            function (data, status) {
                alert("hey " + data + " status : " + status)
                result = data;
                randomWord(_type, data)
            },
        );
    //     $.ajax({
    //         type: "POST",
    //         url: "/app/models/hangmanEngine.php",
    //         contentType: "application/json; charset=utf-8",
    //         success : function(){
    //             randomWord(_type)
                
    //         }
    //     })
    },
    getWord : function(){
        wordShow = ""
        // var xmlhttp = new XMLHttpRequest();
  
        // xmlhttp.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         myObj = JSON.parse(this.responseText);
        //         wordShow = myObj;
        //         console.log("the word is: " + myObj)
        //     }
        // };
        // xmlhttp.open("GET", "/app/models/HangmanEngine.php?path=word", true);
        // xmlhttp.send();

        $.ajax({
            type: "GET",
            url: "/app/models/hangmanEngine.php",
            data: {
                "path" : "word"
            },
            success : function(item){
                wordShow = item
                console.log("voici le mot " + JSON.parse(item))
            }
        })
        return wordShow
    },
    containsKey : function(key){
        $.ajax({
            type: "GET",
            url: "/app/models/hangmanEngine.php",
            data: {
                "path" : "keyURL",
                "key" : key
            },
            success : function(word){
                console.log(word)
            }
        })
    },
    testOut : function(item){
        var xmlhttp = new XMLHttpRequest();
  
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                console.log(myObj.options[item]);
            }
        };
        xmlhttp.open("GET", "/app/models/HangmanEngine.php", true);
        xmlhttp.send();
    }
};

let options = [
    "fruits",
    "animals",
    "countries"
];

answerCount = 0;
goodAnswerCount = 0;

let choosenWord = " ";

function displayOptions(){
    optionsContainer.innerHTML += "<H3> Please Select An Option</H3>";

    let optionButton = document.createElement("div");
    for (let value of options) {
       optionButton.innerHTML += '<button class="options" onclick=hangmanApi.generateWord("'+value+'")>'+ value + '</button>';
    }
    optionsContainer.appendChild(optionButton);
}

//disable all the buttons
function disableButtons(){
    let optionsButton = document.querySelectorAll(".options");
    let keyboardButtons = document.querySelectorAll(".key");

    //disable all the options
    optionsButton.forEach((button) => {
        button.disabled = true;
    })

    //disable all the keys
    keyboardButtons.forEach((button) => {
        button.disabled = true;
    })

    newGameContainer.classList.remove("hide");
}

//generate the word used for the game
function randomWord(type, word){
   let optionsButton = document.querySelectorAll(".options")

   //we highlight the selected button and block the rest
   optionsButton.forEach((button) => {
        if(button.innerText.toLowerCase() === type){
            button.classList.add("active");
        }
        button.disabled = true;
   });

   //Remove anything that may have been left and unhide the keyboard container
   keyboardContainer.classList.remove("hide");
   inputDisplaySection.innerHTML = "";

   //API parameter
   let wordDisplay = word.toUpperCase().replace(/./g, '<span class="dash">_|</span>')
   console.log(wordDisplay)
   inputDisplaySection.innerHTML += wordDisplay
}

function start(){
    keyboardContainer.classList.add("hide")
    document.querySelectorAll(".options").disabled = false

    //initializing all the keys of the keyboard
    for (let i = 65; i < 91; i++) {
        let key = document.createElement("button");
        key.classList.add("key");
        key.innerText = String.fromCharCode(i);

        key.addEventListener("click", ()=>{
            key.disabled = true;
            let charWord = choosenWord.split("");
            var indexes = [];

            //Verifying if the key pressed is included in the word
            if(hangmanApi.containsKey(key.innerText)){
                console.log("We got the key")
            for(i in charWord){
                if(charWord[i] == key.innerText){
                    indexes.push(i);
                    goodAnswerCount++;
                }
            }
        }else{
            answerCount++;
            //Draw a part of the stickman when the wrong key is pressed
            draw(answerCount);
            
        }

            //Changing the display to show the letters
            let dashes = Array.from(inputDisplaySection.children)
            for(i of indexes){
                dashes[i].innerHTML ="";
                dashes[i].innerHTML += key.innerText
                dashes[i].classList.add("displayed")
                dashes[i].classList.remove("dash")
            }

            //Verifying if we completed the word
            if(goodAnswerCount == dashes.length){
                //Win scenario
                disableButtons();
                resultText.classList.add("win-msg");
                resultText.innerHTML+='<h2>YOU WON !</h2>'
                resultText.innerHTML += "<p>Want to try a different category ?</p>";
            }else if(answerCount == 6){
                //answerCount == 6 for the head, body, left hand, right hand, left foot and right foot
                //Loose scenario
                disableButtons();
                resultText.classList.add("lose-msg");
                resultText.innerHTML+='<h2>YOU LOST !</h2>'
                resultText.innerHTML += "<p>Poor man died because you couldn't recognize : "+choosenWord + " </p>";
                return;
            }


            console.log(answerCount)
            console.log(choosenWord)
        })

        keyboardContainer.append(key);

    }
    

    displayOptions();
}

function restart() {
    newGameButton.addEventListener("click", () =>{
            optionsContainer.innerHTML = "";
            keyboardContainer.innerHTML = "";
            inputDisplaySection.innerHTML = "";

            newGameContainer.classList.add("hide");
            resultText.innerHTML = "";

            resultText.classList.remove("lose-msg");
            resultText.classList.remove("win-msg");

            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);

            answerCount = 0;
            goodAnswerCount = 0;
            choosenWord = "";

            start();
            
    })
}

function draw(bodyPart){
    let pen = canvas.getContext("2d");

    switch (bodyPart) {
        case 1:
            pen.beginPath();
            pen.arc(45, 25, 20, 0, 2 * Math.PI);
            pen.stroke();
            break;
        case 2:
            pen.moveTo(45, 45);
            pen.lineTo(45, 90);
            pen.stroke();
            break;
        case 3:
            pen.moveTo(45, 45);
            pen.lineTo(23, 68);
            pen.stroke();
            break;
        case 4:
            pen.moveTo(45, 45);
            pen.lineTo(68, 68);
            pen.stroke();
            break;
            case 5:
                pen.moveTo(45, 90);
                pen.lineTo(23, 113);
                pen.stroke();
                break;
            case 6:
                pen.moveTo(45, 90);
                pen.lineTo(68, 113);
                pen.stroke();
                break;
        default:
            break;
    }
}

start();
restart();



