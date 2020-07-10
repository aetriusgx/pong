/*
*   CSSIx Mini Project 1
*   Team 6
*   Project Name: Pong
*   Date: 7/10/20
*/

//Variables for the colours used in the background, brackets, and ball
//Values are for the colour hues
const colours = {
  background: 0,
  bracket_left: 1,
  bracket_right: 224,
  ball: 100
}

//Default canvas sizes
const canvas = {
  height: 1000,
  width: 1500
};

//Default values for the bracket positions and sizes
var bracket = {
  left: {
    x: canvas.width * 0.05,
    y: canvas.height * 0.25,
    width: canvas.width * 0.025,
    height: canvas.height * 0.25
  },
  right: {
    x: canvas.width * 0.925,
    y: canvas.height * 0.25,
    width: canvas.width * 0.025,
    height: canvas.height * 0.25
  }
};

//Default values for the ball position
//This is where it originally spawns
var ballPos = {
  x: canvas.width * 0.5,
  y: canvas.height * 0.5,
  dia: canvas.width * 0.025
};

//Variables for detecting the status of things
var presence = {
  ballIsSpawned: false,
  scoreCounted: false
};

//Variables for the starting text
var start = {
  color: {
    c: 0,
    saturation: 100,
    brightness: 100
  },
  textX: canvas.width/2 - 245,
  textY: canvas.height/2 - 150,
  textSize: 5
};

//Default scores
var score = {
	limit: 7,
  player1: "0",
  player2: "0",
  score1: 0,
  score2: 0
};

var moveKeys = {
	oneUp: 81,
	oneDown: 65,
	twoUp: 80,
	twoDown: 76
};

//Default ball speed
let defaultBallSpeed = 8;

//Default bot speed in pixels per frame
let botReactionSpeed = 5;

//Game mode
let mode = 'single';

function setup(){
	//Create a canvas that is the size of the windowHeight
	//and change the colour mode to HSB
	//and adjusting the canvas size variables from the default
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  canvas.width = windowWidth;
  canvas.height = windowHeight;

	//These all adjust the default values
  bracket.left.width = windowWidth * 0.025;
  bracket.left.height = windowHeight * 0.25;
  bracket.left.x = windowWidth * 0.05;
  bracket.left.y = windowHeight * 0.5 - bracket.left.height / 2;

  bracket.right.width = windowWidth * 0.025;
  bracket.right.height = windowHeight * 0.25;
	bracket.right.x = windowWidth * 0.925;
  bracket.right.y = windowHeight * 0.5 - bracket.right.height / 2;

  ballPos.x = windowWidth * 0.5;
  ballPos.y = windowHeight * 0.5;
  ballPos.dia = windowWidth * 0.025;

	start.textX = windowWidth / 2 - windowWidth / 7;
	start.textY = windowHeight / 2;

	//Removes the cursor cause it's not nessecary here
	noCursor();

  /*
  This gives randomness to which direction the ball will go
	when the game starts.
  */
    if(Math.random() > 0.5){
        movementMoveX = defaultBallSpeed;
        if(Math.random() > 0.5){
            movementMoveY = defaultBallSpeed;
        } else {
            movementMoveY = -defaultBallSpeed;
        }
    } else {
        movementMoveX = -defaultBallSpeed;
        if(Math.random() > 0.5){
            movementMoveY = defaultBallSpeed;
        } else {
            movementMoveY = -defaultBallSpeed;
        }
    }
}

function draw(){
	//Change the background to the background colour variable
  background(colours.background);
	//This one is a checker for the y-positions of the brackets
	moveOnSides();
	if(presence.ballIsSpawned){
		fill(colours.ball);
		//Pong ball
    ellipse(ballPos.x, ballPos.y, ballPos.dia);
    
		pongBounce();
    playerScore();
		fill(0);
		endGame();
		
		if(mode == 'single'){
   		BotMovement();
			if(keyIsDown(38)){
				bracket.left.y -= botReactionSpeed * 2;
			}
			if(keyIsDown(40)){
				bracket.left.y += botReactionSpeed * 2;
			}
  	} else {
			PlayerMovement();
		}
	}
	startGame();
  trackBoundsHit();

	//Dividing line
  fill(0);
  stroke(100);
  line(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height);
	noStroke();
  //Left side bracket
  fill(colours.bracket_left, 100, 100);
  rect(bracket.left.x, bracket.left.y, bracket.left.width, bracket.left.height);
  //Right side bracket
  fill(colours.bracket_right, 100, 100);
  rect(bracket.right.x, bracket.right.y, bracket.right.width, bracket.right.height);
}


function keyPressed(){
  switch(keyCode){
		//Checks if ENTER is pressed
    case ENTER:
			//If the ball isn't on the board 
      if(!presence.ballIsSpawned){
				//Change the presence of the ball so it exists
        presence.ballIsSpawned = true;
				//And reset the player scores
        score.player1 = 0;
        score.player2 = 0;
        score.score1 = 0;
        score.score2 = 0;
				//Reset the ball speed as well
        movementMoveX = defaultBallSpeed;
        movementMoveY = defaultBallSpeed;
				//Reset the ball position to the center and the diameter size
        ballPos.x = canvas.width * 0.5;
        ballPos.y = canvas.height * 0.5;
        ballPos.dia = canvas.width * 0.025;
    	}
			//If the ball does exist then do this
			else {
				//Set the presence variable to not existing
        presence.ballIsSpawned = false;
				//Reset the bracket positions
				bracket.left.y = canvas.height * 0.5 - bracket.left.height / 2;
				bracket.right.y = canvas.height * 0.5 - bracket.right.height / 2;
				//And make the ball disappear by provinding a new background
        background(colours.background);
      }
      break;
		case SHIFT:
			if(!presence.ballIsSpawned){
				if(mode == 'single'){
					mode = 'two';
				} else {
					mode = 'single';
				}
			}
			break;
  }
}

/*
This function checks if the game has started and if it has not then it prints "PRESS ENTER TO START GAME".
*/
function startGame() {
  if(!presence.ballIsSpawned) {
    fill(start.color.c, start.color.saturation, start.color.brightness);
    stroke(start.color.c, start.color.saturation, start.color.brightness)
    textSize(30);
    text("PRESS ENTER TO START GAME", start.textX, start.textY);
    textSize(20);
    text("(First to 7 Wins)", start.textX + start.textX * 0.275, start.textY + start.textY / 16);
		
		if(mode == 'single'){
			textSize(14);
			text("USE ARROWS TO MOVE", start.textX + start.textX * 0.25, start.textY + start.textY * 0.125);
			textSize(10);
			text("PRESS SHIFT FOR TWO PLAYER", start.textX + start.textX * 0.255, start.textY + start.textY * 0.16);
		}
		if(mode == 'two'){
			textSize(14);
			text("USE Q, A, P, L TO MOVE", start.textX + start.textX * 0.25, start.textY + start.textY * 0.125);
			textSize(10);
			text("PRESS SHIFT FOR ONE PLAYER", start.textX + start.textX * 0.255, start.textY + start.textY * 0.16);
		}
		
    start.color.c += 1;
    if(start.color.c > 359) {
      start.color.c = 0;
    }
  }
}

/*
This scene gives the result of the winning player and stops the game
*/
function endGame() {
  fill(start.color.c,start.color.saturation, start.color.brightness);
  stroke(start.color.c,start.color.saturation,start.color.brightness);
  if(score.score1 == score.limit) {
      start.color.c+=2;
      textSize(70);
      background(colours.background);
      text("Player 1 Wins!", start.textX, start.textY);
      movementMoveX = 0;
      movementMoveY = 0;
  }
  if(score.score2 == score.limit) {
      start.color.c+=2;
      textSize(70);
      background(colours.background);
      text("Player 2 Wins", start.textX, start.textY);
      movementMoveX = 0;
      movementMoveY = 0;
  }
  if(start.color.c > 360) start.color.c = 0
} 
 
function pongBounce(){
	//Move the ball position according to the set speed
  ballPos.x+=movementMoveX;
  ballPos.y+=movementMoveY;

  if(ballPos.x >= canvas.width || ballPos.x <= 0){
    if(Math.random() > 0.5){
      movementMoveX = defaultBallSpeed;
        if(Math.random() > 0.5){
          movementMoveY = defaultBallSpeed;
        } else {
          movementMoveY = -defaultBallSpeed;
        }
    } else {
      movementMoveX = -defaultBallSpeed;
      if(Math.random() > 0.5){
        movementMoveY = defaultBallSpeed;
      } else {
        movementMoveY = -defaultBallSpeed;
      }
    }
    presence.scoreCounted = false;
    ballPos.x = canvas.width * 0.5;
    ballPos.y = canvas.height * 0.5;
  }
  if(ballPos.y >= canvas.height - ballPos.dia || ballPos.y <= 0 + ballPos.dia / 2){
    movementMoveY = movementMoveY * -1;
  }
}


function trackBoundsHit(){
	//Check if the ball y values are within the y values of the brackets
	//After that, check if the x values are past or equal to the bracket, taking the ball's radius into account
	//When conditions are met, change the horizontal direction of the ball
  if(ballPos.y >= bracket.left.y && ballPos.y <= bracket.left.y + bracket.left.height){
    if(ballPos.x <= bracket.left.x + bracket.left.width + ballPos.dia / 2 && ballPos.x > bracket.left.x){
    	movementMoveX = movementMoveX * -1;
			defaultBallSpeed = defaultBallSpeed ^ 1.5;
    }
  }
  if(ballPos.y >= bracket.right.y && ballPos.y <= bracket.right.y + bracket.right.height){
    if(ballPos.x >= bracket.right.x - ballPos.dia / 2 && ballPos.x <= bracket.right.x + bracket.right.width){
      movementMoveX = movementMoveX * -1;
			defaultBallSpeed = defaultBallSpeed ^ 1.5;
    }
  }
}

function moveOnSides(){
  //This area of code keeps the bracket on the surface
  //when the bracket hits the bottom of the play area
  if(bracket.left.y < 0) {
    bracket.left.y = 0;
  }
  if(bracket.left.y > canvas.height - 180) {
    bracket.left.y = canvas.height - 180;
  }
  if(bracket.right.y < 0) {
    bracket.right.y = 0;
  }
  if(bracket.right.y > canvas.height - 180) {
    bracket.right.y = canvas.height - 180;
  }
}

function PlayerMovement(){
	if(keyIsDown(moveKeys.oneUp)){
		bracket.left.y-=botReactionSpeed * 2;
	}
	if(keyIsDown(moveKeys.oneDown)){
		bracket.left.y+=botReactionSpeed * 2;
	}
	if(keyIsDown(moveKeys.twoUp)){
		bracket.right.y-=botReactionSpeed * 2;
	}
	if(keyIsDown(moveKeys.twoDown)){
		bracket.right.y+=botReactionSpeed * 2;
	}
}

function BotMovement(){
	let centerOfBracket = bracket.right.y + bracket.right.height / 2;
	//Detect if the pong is moving in its direction
	if(movementMoveX > 0){
		//If the ball is lower than the 
		//center of the bracket on the y-axis
		//Move down at the speed defined
		if(ballPos.y > centerOfBracket){
			bracket.right.y+=botReactionSpeed;
		} 
		if(ballPos.y < centerOfBracket) {
			bracket.right.y-=botReactionSpeed;
		}
	}
}

function playerScore() {
  if(presence.ballIsSpawned) {
    fill(0, 0, 100);
    //if ball is greater than 1500 then add 1 to the score //of player 1
    if(ballPos.x >= bracket.right.x + bracket.right.width * 0.01) {
        if(!presence.scoreCounted){
            score.player1++;
            score.score1++;
            presence.scoreCounted = true;
        }
    }
    //if ball is less than 0 then add 1 to the score of //player 2
    if(ballPos.x <= bracket.left.x + bracket.left.width * 0.01) {
      if(!presence.scoreCounted){
            score.player2++;
            score.score2++;
            presence.scoreCounted = true;
        }
    }
		textSize(16);
		//Update the scoreboard and incse the ball speed
    text(score.player1, windowWidth/2 - 30, windowHeight/10 - 50);
    text(score.player2, windowWidth/2 + 15, windowHeight/10 - 50);
		defaultBallSpeed = defaultBallSpeed ^ 1.5;
  }
}
