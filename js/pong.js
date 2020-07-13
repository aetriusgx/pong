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
let text = {};
let loaded_sounds = [];
let ScoreHandler = {};
let TextHandler = {};
let SoundHandler = {};
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

    let LeftBracket = new Bracket(windowWidth * 0.05)
    LeftBracket.controlled = true
    LeftBracket.controls = [81, 65]
    LeftBracket.goal = LeftBracket.x - LeftBracket.width / 4

    let RightBracket = new Bracket(windowWidth * 0.9)
    RightBracket.goal = RightBracket.x + RightBracket.width + RightBracket.width / 4
}

function draw() {
    background(colors.background);
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
