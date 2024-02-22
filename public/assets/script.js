const keyboardContainer = document.getElementById("keyboard-container");
const optionsContainer = document.getElementById("options-container");
const inputDisplaySection = document.getElementById("input-display-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

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

   let wordDisplay = choosenWord.replace(/./g, '<span class="dash">[_]</span>')
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

            for(i in charWord){
                if(charWord[i] == key.innerText){
                    indexes.push(i);
                }
            }

            for(i of indexes){
                Array.from(inputDisplaySection.children)[i].innerHTML ="";
                Array.from(inputDisplaySection.children)[i].innerHTML += key.innerText
                Array.from(inputDisplaySection.children)[i].classList.add("displayed")
                Array.from(inputDisplaySection.children)[i].classList.remove("dash")
            }
            console.log(choosenWord)
            console.log(indexes);
        })

        keyboardContainer.append(key)
    }
    

    displayOptions();
}

start();



