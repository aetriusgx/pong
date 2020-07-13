/*
 *   CSSIx Mini Project 1
 *   Team 6 : 07/10/2020
 */

//Start of predefined
let display_mode = "desktop";

let sounds = {
    background: "background.mp3"
};

let colors = {
    bracket_one: 1,
    bracket_two: 220,
    background: 0,
    alt: 100
}

let status = {
    ball: false,
    score_counted: false,
    game_over: false,
    solo_mode: true,
    ball_movement: { //Default values
        x: 1,
        y: 1
    }
};

let scores = {
    limit: 7,
    one: 0,
    two: 0
};

let dialog = {
    start_game: {
        size: 16,
        text: "PRESS ENTER TO START GAME"
    },
    score_limit: {
        size: 14,
        text: `FIRST TO ${scores.limit} WINS`
    },
    controls: {
        size: 12,
        single_player: "USE ARROWS TO MOVE",
        multiplayer: "USE Q, A, P, L TO MOVE"
    },
    game_change: {
        size: 12,
        text: "PRESS SHIFT FOR "
    },
    scores: {
        size: 8
    }
};

let canvas = {};
let bracket = {};
let divider = {};
let ball = {};
let text = {};
let bounds = {};
let loaded_sounds = [];
let BracketHandler = {};
let ScoreHandler = {};
let TextHandler = {};
let SoundHandler = {};
let BallHandler = {};
let Behavior = {};
//End of predefined


//Functions Area
function preload() {
    loaded_sounds.push({
        background: loadSound(sounds.background)
    }); //loaded_sounds.background
}

function setup() {
    //Create the game canvas
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    //Create new variables in the canvas object for height and width
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    //Create new variables for graphics
    bracket.left = {};
    bracket.left.width = windowWidth * 0.025;
    bracket.left.height = windowHeight * 0.25;
    bracket.left.x = windowWidth * 0.05;
    bracket.left.y = windowHeight / 2 - bracket.left.height / 2;
    bracket.right = {};
    bracket.right.width = windowWidth * 0.025;
    bracket.right.height = windowHeight * 0.25;
    bracket.right.x = windowWidth * 0.95 - bracket.right.width;
    bracket.right.y = windowHeight / 2 - bracket.right.height / 2;

    bounds.left = windowWidth * 0.005;
    bounds.right = windowWidth * 0.995;

    ball.position = {};
    ball.position.x = windowWidth * 0.5;
    ball.position.y = windowHeight * 0.5;
    ball.diameter = windowWidth * 0.025;
    ball.radius = ball.diameter / 2;

    text.enter = {};
    text.enter.x = windowWidth * 0.5 - dialog.start_game.text.length;
    text.enter.y = windowHeight * 0.5 - dialog.start_game.size;
    text.score_limit = {};
    text.score_limit.x = windowWidth * 0.5 - dialog.score_limit.text.length;
    text.score_limit.y = windowHeight * 0.5 - dialog.score_limit.size;
    text.player_controls = {};
    text.player_controls.x = windowWidth * 0.5 - dialog.controls.single_player.length; //Default, change for 2 player
    text.player_controls.y = windowHeight * 0.5 - dialog.controls.size;
    text.change_mode = {};
    text.change_mode.x = windowWidth * 0.5 - dialog.game_change.text.length;
    text.change_mode.y = windowWidth * 0.5 - dialog.game_change.text.size;
    text.scoreboard = {};
    text.scoreboard.oneX = windowWidth * 0.5 - windowWidth * 0.05;
    text.scoreboard.twoX = windowWidth * 0.5 + windowWidth * 0.05;
    text.scoreboard.y = windowHeight * 0.1;

    if (Math.random() > 0.5) {
        status.ball_movement.x = 1;
        if (Math.random() > 0.5) status.ball_movement.y = -1;
        else status.ball_movement.y = 1;
    } else {
        status.ball_movement.x = -1;
        if (Math.random() > 0.5) status.ball_movement.y = -1;
        else status.ball_movement.y = 1;
    }
}

function draw() {
    background(colors.background);
    BracketHandler.draw();
};

function keyPressed() {
    switch(keyCode){
        case ENTER:
            if(!status.ball){
                status.ball = true;

            } else {
                status.ball = false;
                background(colors.background);
            }
            break;
        case SHIFT:
            break;
    }
};

BracketHandler.draw = () => {
    //Dividing line
    fill(colors.alt);
    stroke(100);
    line(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height);
    noStroke();
    //Left side bracket
    fill(colors.bracket_one, 100, 100);
    rect(bracket.left.x, bracket.left.y, bracket.left.width, bracket.left.height);
    //Right side bracket
    fill(colors.bracket_two, 100, 100);
    rect(bracket.right.x, bracket.right.y, bracket.right.width, bracket.right.height);
};

BallHandler.spawn = () => {
    noStroke();
    fill(colors.alt);
    ellipse(ball.position.x, ball.position.y, ball.diameter);
};
