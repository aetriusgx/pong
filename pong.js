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
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);

    status.audioCanPlay = true;

    new Bracket(width * 0.05, height * 0.5, colors.bracket_one, [87, 83]);
    new Bracket(width * 0.9, height * 0.5, colors.bracket_two);

    new Ball(width * 0.5, height * 0.5, width * 0.025, staticvalues.ball_speed);

}

function draw() {
    background(colors.background);
    Bracket.DisplayAllBrackets();
    Ball.DisplayAllBalls();

    stroke('white');
    strokeWeight(3);
    line(width / 2, 0, width / 2, height);
}

class Bracket {
    /**@param {number} x Position of the bracket on the x-axis
     * @param {number} y Position of the bracket on the y-axis
     * @param {number} color Hue of the bracket
     * @param {?Array} controls (Optional) Array of the up and down controls*/
    constructor(x, y, color, controls) {
        //Positioning
        this.width = width * 0.025;
        this.height = height * 0.25;
        this.x = x;
        this.y = y - this.height / 2;

        //Shape
        this.color = color;
        this.points;

        //Controls
        if (controls) this.controllable = true, this.controls = controls;
        else this.controllable = false, this.controls = null;

        //Operational
        Bracket.instances.push(this);
    }

    draw() {
        noStroke();
        fill(this.color, 100, 80);
        rect(this.x, this.y, this.width, this.height);
        this.points = [this.x, this.y, this.width, this.height];
    }

    move() {
        if (this.controllable) {
            if (keyIsDown(this.controls[0])) this.y -= staticvalues.player_movement;
            if (keyIsDown(this.controls[1])) this.y += staticvalues.player_movement;
        } else {
            let midpoint = this.y + this.height / 2;
            for (var ball of Ball.instances) {
                if (ball.velocity[0] > 0) {
                    if (ball.y > midpoint) this.y += staticvalues.bot_movement;
                    if (ball.y <= midpoint) this.y -= staticvalues.bot_movement;
                }
            }
        }
    }

    restrictYOverflow() {
        if (this.y <= 0) this.y = 0;
        if (this.y + this.height >= height) this.y = height - this.height;
    }

    static instances = [];

    static DisplayAllBrackets() {
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

        let chance = Math.random();
        if (chance < 0.5) this.velocity[0] = -this.speed;
        if (chance >= 0.5) this.velocity[0] = this.speed;
        if (chance > 0.25 && chance <= 0.75) this.velocity[1] = -this.speed;
        if (chance <= 0.25 || chance > 0.75) this.velocity[1] = this.speed;

        Ball.instances.push(this);
    }

    draw() {
        fill(100);
        ellipse(this.x, this.y, this.radius);

        if (this.x < 0 || this.x > width) {
            this.y = height / 2;
            this.x = width / 2;
            let chance = Math.random();
            if (chance < 0.5) this.velocity[0] = -this.speed;
            if (chance >= 0.5) this.velocity[0] = this.speed;
            if (chance > 0.25 && chance <= 0.75) this.velocity[1] = -this.speed;
            if (chance <= 0.25 || chance > 0.75) this.velocity[1] = this.speed;
        }
    }

    move() {
        this.x += this.velocity[0];
        this.y += this.velocity[1];
        if (this.y <= 0 || this.y >= height) {
            this.velocity[1] *= -1;
        }
    }

    collision() {
        for(var bracket of Bracket.instances){
            let check = collideRectCircle(bracket.x, bracket.y, bracket.width, bracket.height, this.x, this.y, this.radius);
            //West and East
            if(this.y >= bracket.y && this.y <= bracket.y + bracket.height){
                if(check) this.velocity[0] *= -1;
            }
            
            //North and South
            if(this.x >= bracket.x && this.x <= bracket.x + bracket.width){
                if(check) this.velocity[1] *= -1;
            }
        }
    }

    static instances = [];

    static DisplayAllBalls() {
        for (var ball of this.instances) {
            ball.draw();
            ball.move();
            ball.collision();
        }
    }
}