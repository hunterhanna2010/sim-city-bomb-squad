console.log('loaded!');

//VARIABLE DECLARATIONS
const STARTING_TIME = 30;
var remainingTime = 0;
var gameOver = false;
var countdown = null;
var delay = null;


var wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
}

var wiresToCut = [];

//DOM REFERENCES
var timer = document.getElementById('timer');
var wireBox = document.getElementById('wirebox');
var resetButton = document.querySelector('button');

//TO DO: ADD AUDIO ELEMENTS


//EVENT LISTENERS
resetButton.addEventListener('click', reset);

//clicking on the children of the wirebox
wireBox.addEventListener('click', function(e) {
    //make sure it is NOT already cut using e.target.alt via the "alt" text of the images
    var color = e.target.alt;
    if (!wireState[color] && !gameOver && color) {
        //if wire is not cut and game is not over...
        //change the image
        e.target.src = `img/cut-${color}-wire.png`
        //TO DO: PLAY CUT AUDIO
        //set any color clicked to true
        wireState[color] = true;
        //check for correctness
        var wireIndex = wiresToCut.indexOf(color);
        if (wireIndex > -1) {
            //correct wire cut
            console.log(`${color} at index ${wireIndex} was correct`);
            wiresToCut.splice(wireIndex, 1);
            if (checkForWin()) {
                endGame(true);
            }
        }   else {
            //incorrect wire cut
            console.log(`${color} at index ${wireIndex} was wrong`);
            delay = setTimeout(endGame, 750, false);
        }
        
    }
})

//FUNCTION DECLARATIONS
function init() {
    wiresToCut.length = 0;
    remainingTime = STARTING_TIME;
    //randomize wires to cut using a for/in loop
    for (let wire in wireState) {
        var rand = Math.random();
        if (rand > 0.5) {
            wiresToCut.push(wire);
        }
    }
    console.log(wiresToCut);
    resetButton.disabled = true;
    //TO DO: PLAY THE SIREN
    countdown = setInterval(updateClock, 1000);
}

function reset() {
    //marking all wires cut
    for (let wire in wireState) {
        wireState[wire] = false;
    }
    for (let i = 0; i < wireBox.children.length; i++) {
        wireBox.children[i].src = `img/uncut-${wireBox.children[i].alt}-wire.png`;
    }
    gameOver = false;
    document.body.classList.remove('exploded');
    timer.classList.remove('green');
    clearTimeout(delay);
    clearInterval(countdown);

    //TO DO: STOP PLAYING AUDIO FILES
    init();
}

function checkForWin() {
    //if wires to cut is 0, gameOver is false with a winner
    return wiresToCut.length ? false : true;
}

function endGame(win) {
    clearTimeout(delay);
    clearInterval(countdown);
    gameOver = true;
    resetButton.disabled = false;

    if (win) {
        console.log(`you saved the city`)
        timer.classList.add('green')
        //TO DO: AUDIO FILE
    } else {
        console.log(`boom`);
        document.body.classList.add('exploded');
    }
}

function updateClock() {
    remainingTime--;
    if (remainingTime <= 0) {
        endGame(false);
    }
    timer.textContent = `0:00:${remainingTime}`;
}
init();