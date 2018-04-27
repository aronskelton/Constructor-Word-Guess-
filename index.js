var Word = require("./word.js");
var Letter = require("./letter.js") 
var inquirer = require("inquirer"); 
let computerChoices = ["tacos", "pizza", "ramen", "burger", "cookies"]; 
let count = 0; 
let winCount=0;
let guessCount=10;
let guesses = [];

Word.prototype.splitWord = function(selectedWord) {
    let selectedLetters=[];
    let selectedLetters= selectedWord.split("");
    this.matches = selectedLetters.length
    return selectedLetters
}; 

Letter.prototype.findMatches = function (guess, computerArray){
    let indexes = [], i; 
    for (i= 0; i<computerArray.length; i++)
    if(computerArray[i]===guess.value) {
        indexes.push(i);
    }
    return indexes; 
};


//create and store the new word object

let computerWord = new Word(computerChoices);
let ComputerGuess= computerWord.selectedWord; 

computerArray = computerWord.splitWord(ComputerGuess);

displayArray = computerWord.emptyDisplayWord(computerArray.length); 
console.log(displayArray.join(""));

function resetAll(){
    count=0;
    guessCount=10;
    guesses[];
}

let askQuestion = function(){
    if(count<10){
        inquirer.prompt([
            { 
                name:"userGuess",
                message:"Choose a letter",

            }
        ]).then(function(answers){
            let newLetter=answers.userGuess; 
            if(guessSoFar.indexOf(newLetter)< 0){
                guessSoFar.push(newLetter);
            }
            console.log("----Guesses so far---- [" + guessSoFar.join(",")+ "]----");
            console.log("");

            if (matches===0){
                console.log("Chyeaah! You Win!!");
                resetAll()
            }
            else {
                count ++;
                askQuestion();
            }
        });
    }
    else{
        inquirer.prompt([
            {
                type:"confirm",
                message:"would you like to end game?",
                name:"end",
                default: true

            }
        ]).then(function (answer) {
            if (answer.confirm){
                resetAll();
            }
            else {
                console.log("You are literally the worst")
                resetAll();
            }
        })
    }

}; 

askQuestion();