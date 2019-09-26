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
//clicking on the children of the wirebox
wireBox.addEventListener('click', function(e) {
    //make sure it is NOT already cut using e.target.alt via the "alt" text of the images
    var color = e.target.alt;
    if (!wireState[color] && !gameOver) {
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
            //TO DO: check for a win here
        }   else {
            //incorrect wire cut
            console.log(`${color} at index ${wireIndex} was wrong`);
            //TO DO: KICKOFF TIME DELAY


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
    //TO DO: START THE COUNTDOWN
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