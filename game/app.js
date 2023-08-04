// event listenter
// element.addEventListener(<event-name>, <callback>, <use-capture>)
    // EVENT-NAME (string): the name or type of event you would like to listen to (click, mousedown, touchstart transtionEnd, etc.)
    // CALLBACK (function): the function that gets called whenever the event happens. The event object, containing data about the event, is passed as the first argument.
    // USE-CAPTURE (boolean): declares whether the callback should be fired in the "capture" phase

// --------- Cached DOM Elements
const gameRules = document.getElementById('game-rules');
const gameRulesBtn = document.getElementById('game-rules-btn')
const mainMenu = document.getElementsByClassName('main-menu')
const enterTwoPlayerGame = document.getElementById('twoPlayer')
const logo = document.getElementById('logo')
console.log(enterTwoPlayerGame)

// console.log(mainMenu)


gameRulesBtn.addEventListener('click', handleClick);

function handleClick(evt) {
    gameRulesBtn.style.display = "none";
    enterTwoPlayerGame.style.display = "none";
    logo.style.display = "none";
    gameRules.style.display = "block";
}