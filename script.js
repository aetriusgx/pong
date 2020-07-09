const colours = {
  background: 0
}

const canvas = {
  height: 1000,
  width: 1500
};

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

function setup(){
  createCanvas(canvas.width, canvas.height);
  colorMode(HSB, 365, 100, 100);
}

function draw(){
  background(colours.background);
  moveOnSides();

  
  //Pong ball
  fill(100);
  ellipse(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.05);

  fill(0);
  //Left side bracket
  rect(bracket.left.x, bracket.left.y, bracket.left.width, bracket.left.height);
  //Right side bracket
  rect(bracket.right.x, bracket.right.y, bracket.right.width, bracket.right.height);
  //Dividing line
  stroke(100);
  line(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height);
}

function moveOnSides(){
  if(mouseX > 0 && mouseX < canvas.width * 0.5){
    if(mouseY <= 0){
      bracket.left.y = 0;
    }
    else if(mouseY >= canvas.height - bracket.left.height){
      bracket.left.y = canvas.height - bracket.left.height;
    } else {
      bracket.left.y = mouseY;
    }
  }
  else if(mouseX > canvas.width * 0.5 && mouseX < canvas.width){
    if(mouseY <= 0){
      bracket.right.y = 0;
    }
    else if(mouseY >= canvas.height - bracket.right.height){
      bracket.right.y = canvas.height - bracket.right.height;
    } else {
      bracket.right.y = mouseY;
    }
  }
}
