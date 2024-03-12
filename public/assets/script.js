const keyboardContainer = document.getElementById("keyboard-container");
const optionsContainer = document.getElementById("options-container");
const inputDisplaySection = document.getElementById("input-display-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let hangmanApi = {
    randomWord : function() {
        $.ajax({
            type: "GET",
            url: "hangman.php/exec=init?",
            success: function (type) {
                randomWord(type)
            }
        })
    }
};

let options = {
    fruits : [
        "Pomme",
        "Bleuets",
        "Mandarine",
        "Anana",
        "Pomergranade",
        "Watermelon"
    ],
    animals:["Herisson", "Rinoceros", "Ecureuil", "Panther", "Zebre"],
    countries :["Congo", "Canada", "Royaume Unis", "France", "Chine"],
};

answerCount = 0;
goodAnswerCount = 0;

let choosenWord = " ";

function displayOptions(){
    optionsContainer.innerHTML += "<H3> Please Select An Option</H3>";

    let optionButton = document.createElement("div");
    for (let value in options) {
        optionButton.innerHTML += '<button class="options" onclick=randomWord("'+value+'")>'+ value + '</button>';
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
function randomWord(type){
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

   let optionsArray = options[type]
   choosenWord = optionsArray[Math.floor(Math.random()* optionsArray.length)];
   choosenWord =  choosenWord.toUpperCase()

   let wordDisplay = choosenWord.replace(/./g, '<span class="dash">_|</span>')
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
            if(choosenWord.includes(key.innerText)){
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



