let Word = require("./word.js");

let Letter = require("./letter.js");

let inquirer = require("inquirer");

let computerChoices = ["taco", "burger", "pizza", "cookies", "panini", "sandwhich", "burrito"];

let count = 0;

let winCount = 0;

let guessCount = 18;

let guessSoFar = [];


Word.prototype.splitWord = function (selectedWord) {
    let selectedLetters = [];
    selectedLetters = selectedWord.split("");
    this.matches = selectedLetters.length
    return selectedLetters
};

Letter.prototype.findMatches = function (userGuess, computerArray) {
 

    let indexes = [],i;
    for (i = 0; i <computerArray.length; i++)
        if( computerArray[i]===userGuess.value) {
        indexes.push(i);
        }
    return indexes;
};


// create and store new word object

let computerWord = new Word(computerChoices);
let computerGuess = computerWord.selectedWord;

computerArray = computerWord.splitWord(computerGuess);


displayArray = computerWord.emptyDisplayWord(computerArray.length);
console.log(displayArray.join(""));


function resetAll() {

    count = 0;
    guessCount=18;

    guessSoFar= [];


}

let askQuestion = function () {
    if (count <18) {


        inquirer.prompt([
            {
                name: "userGuess",
                message: "What letter do you choose? "
            }

           
        ]).then(function (answers) {
            //
            let newLetter = answers.userGuess;

            if(guessSoFar.indexOf(newLetter) < 0){
                guessSoFar.push(newLetter);
            }

            console.log("Letters Used[" +guessSoFar.join(",") + "]");

            guessCount--;

            console.log("Number of Guesses:" + guessCount + "");
            console.log("");

            let matches = computerWord.CheckAnswer(newLetter,computerArray);
           

            displayArray = computerWord.displayLetters;

            console.log(displayArray.join(""));
            console.log("");

            if (matches === 0) {
                console.log("Chyeeeahhh You Da Best!");

                resetAll()
            }
            else {
                count++;
                askQuestion();
            }
    });

    }
    else {
        inquirer.prompt([
        {
            type: "confirm",
            message:" would you like to end game",
            name: "end",
            default: false

        }
    ]).then(function(answer) {
        if (answer.confirm) {
            resetAll();

        }
        else {
            console.log("You are literally the worst!")
            resetAll();
        }

    });

    }

};

askQuestion();