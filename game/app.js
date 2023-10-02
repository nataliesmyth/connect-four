// event listenter
// element.addEventListener(<event-name>, <callback>, <use-capture>)
    // EVENT-NAME (string): the name or type of event you would like to listen to (click, mousedown, touchstart transtionEnd, etc.)
    // CALLBACK (function): the function that gets called whenever the event happens. The event object, containing data about the event, is passed as the first argument.
    // USE-CAPTURE (boolean): declares whether the callback should be fired in the "capture" phase

// --------- Cached DOM Elements
const gameRules = document.getElementById('game-rules');
const gameRulesBtn = document.getElementById('game-rules-btn')
const mainMenu = document.getElementById('mainMenu')
const enterTwoPlayerGame = document.getElementById('twoPlayer')
const logo = document.getElementById('logo')
console.log(enterTwoPlayerGame)
const exitRulesBtn = document.getElementById('exitRulesBtn')


gameRulesBtn.addEventListener('click', handleClick);
exitRulesBtn.addEventListener('click', handleExitRulesClick);

function handleClick() {
    gameRulesBtn.style.display = "none";
    enterTwoPlayerGame.style.display = "none";
    logo.style.display = "none";
    gameRules.style.display = "block";
}


function handleExitRulesClick() {
    gameRules.style.display = 'none';
    gameRulesBtn.style.display = "flex";
    enterTwoPlayerGame.style.display = "flex";
    logo.style.display = "flex";
}