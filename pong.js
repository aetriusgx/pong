/*
 *   CSSIx Mini Project 1
 *   Team 6 : 07/10/2020
 */

//Start of predefined
let display_mode = "desktop";

let sounds = {
    unloaded: {
        background: "background.mp3"
    },
    loaded: {}
};

let colors = {
    bracket_one: 1,
    bracket_two: 220,
    background: 5,
    alt: 100
}

let status = {
    audioCanPlay: false,
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

let staticvalues = {
    bot_movement: 5,
    player_movement: 10,
    ball_speed: 10
}

function preload() {}

function setup() {
    //Create a canvas with the aspects of the window
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);

    //Let audio be playable
    status.audioCanPlay = true;

    //Create two brackets
    new Bracket(width * 0.05, height * 0.5, colors.bracket_one, [87, 83]);
    new Bracket(width * 0.9, height * 0.5, colors.bracket_two);

    //Create the base ball
    //ONLY HERE FOR TESTING PURPOSES
    new Ball(width * 0.5, height * 0.5, width * 0.025, staticvalues.ball_speed);

}

function draw() {
    //Change the background to the variable
    background(colors.background);
    //Bracket functions
    Bracket.DisplayAllBrackets();
    //Ball functions
    Ball.DisplayAllBalls();

    //Add the divider line
    stroke('white');
    strokeWeight(3);
    line(width / 2, 0, width / 2, height);
}

class Bracket {
    constructor(x, y, color, controls) {
        //Positioning
        this.width = width * 0.025;
        this.height = height * 0.25;
        this.x = x;
        this.y = y - this.height / 2; //For these brackets, the y means the midpoint of the bracket instead of the top

        //Shape
        this.color = color;
        this.points;

        //Controls
        if (controls) this.controllable = true, this.controls = controls; //If a control array was given
        else this.controllable = false, this.controls = null;

        //Operational
        Bracket.instances.push(this);
    }

    draw() {
        noStroke(); //Get rid of the border
        fill(this.color, 100, 80); //Change the color of the bracket
        rect(this.x, this.y, this.width, this.height); //Draw the bracket
        this.points = [this.x, this.y, this.width, this.height]; //DEBUGGING ONLY
    }

    move() {
        if (this.controllable) { //If the bracket is controllable
            if (keyIsDown(this.controls[0])) this.y -= staticvalues.player_movement; //Up key, subtract from the y by the movement speed
            if (keyIsDown(this.controls[1])) this.y += staticvalues.player_movement; //Down key, add to the y by the movement speed
        } else {
            let midpoint = this.y + this.height / 2; //The bracket's midpoint
            for (var ball of Ball.instances) { //Gather all the instances of the static array from ball class
                if (ball.velocity[0] > 0) { //Static for just the right side at the moment, checks if the ball's velocity is towards the right
                    if (ball.y > midpoint) this.y += staticvalues.bot_movement; //Move the bracket down if the ball's y value is less than the midpoint
                    if (ball.y <= midpoint) this.y -= staticvalues.bot_movement; //Vice versa ^^
                }
            }
        }
    }

    restrictYOverflow() { 
        if (this.y <= 0) this.y = 0; //If the bracket's y is less or equal to 0 then force the bracket's y to be 0
        if (this.y + this.height >= height) this.y = height - this.height; //If the bracket is beyond the canvas height, force it to flush the bottom
    }

    static instances = []; //Array for the class instances because it's not built in for some reason

    static DisplayAllBrackets() { //Loop through the array and run all the methods
        for (var bracket of this.instances) {
            bracket.draw();
            bracket.move();
            bracket.restrictYOverflow();
        }
    }
}


class Ball {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.diameter = radius * 2;
        this.speed = speed;
        this.velocity = [];

        //The x and y velocity are random when they are initiated
        let chance = Math.random();
        if (chance < 0.5) this.velocity[0] = -this.speed;
        if (chance >= 0.5) this.velocity[0] = this.speed;
        if (chance > 0.25 && chance <= 0.75) this.velocity[1] = -this.speed;
        if (chance <= 0.25 || chance > 0.75) this.velocity[1] = this.speed;

        Ball.instances.push(this); //Push this instance to the instance array
    }

    draw() {
        fill(100); //Change color to white, temporary atm
        ellipse(this.x, this.y, this.radius); //Draw the ball as an ellipse

        if (this.x < 0 || this.x > width) { //CURRENTLY A TEMPORARY IF STATEMENT
            this.y = height / 2;
            this.x = width / 2;
            let chance = Math.random();
            if (chance < 0.5) this.velocity[0] = -this.speed;
            if (chance >= 0.5) this.velocity[0] = this.speed;
            if (chance > 0.25 && chance <= 0.75) this.velocity[1] = -this.speed;
            if (chance <= 0.25 || chance > 0.75) this.velocity[1] = this.speed;
        }
    }

    move() { //Move's the ball according to the velocity array
        this.x += this.velocity[0];
        this.y += this.velocity[1];
        if (this.y <= 0 || this.y >= height) { //Let's the ball bounce when it hit's the top and bottom
            this.velocity[1] *= -1;
        }
    }

    collision() {
        for(var bracket of Bracket.instances){ //Go through each instance of Bracket
            /**@todo Check for the corners */
            //Use the 2D collision library to check if a ball hit's a bracket
            let check = collideRectCircle(bracket.x, bracket.y, bracket.width, bracket.height, this.x, this.y, this.radius);
            //West and East side of the bracket
            if(this.y >= bracket.y && this.y <= bracket.y + bracket.height){
                if(check) this.velocity[0] *= -1; //Flips the x-velocity
            }
            
            //North and South side of the bracket
            if(this.x >= bracket.x && this.x <= bracket.x + bracket.width){
                if(check) this.velocity[1] *= -1; //Flips the y-velocity
            }
        }
    }

    static instances = []; //Array for the class instances because it's not built it for some reason

    static DisplayAllBalls() { //Runs every method for each ball
        for (var ball of this.instances) {
            ball.draw();
            ball.move();
            ball.collision();
        }
    }
}