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
    solo_mode: true
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

function preload(){

}

function setup(){

}

function draw() {

}

