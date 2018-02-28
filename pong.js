var puck = {
  x: 200,
  y: 200,
  xSpeed: 1,
  ySpeed: -1,
  r: 9
};
var edgeOffset = 30;

var player1 = {
  x: edgeOffset,
  y: 200,
  ht: 50,
  wd: 10
};

var player2 = {
  x: 400-edgeOffset,
  y: 200,
  ht: 50,
  wd: 10
};

var score1 = {
  x: 175,
  y: 20,
  r: 10
};

var score2 = {
  x: 275,
  y: 20,
  r: 10
};


function setup() {
  createCanvas(400, 400);
  fill(0);
}

function draw() {
  background(255);

  
  // draw puck
  ellipse(puck.x, puck.y, puck.r*2);
  
  // draw midline/borders
  strokeWeight(3);
  line(200,0,200,400);
  line(0,0,400,0);
  line(0,0,0,400);
  line(400,0,398,398);
  line(0,400,398,398);
  
  
  // move puck
  if (puck.y < puck.r || puck.y > height - puck.r) {
    puck.ySpeed = -puck.ySpeed;
  }
  
  puck.x += puck.xSpeed;
  puck.y += puck.ySpeed;
  
  // draw paddles
  rect(player1.x, player1.y, player1.wd, player1.ht);
  rect(player2.x-player2.wd, player2.y, player2.wd, player2.ht);
  
  // paddle movement
  if (player1.paddleDown && ! player1.paddleUp) {
    player1.y += 3;
  }
  if (player1.paddleUp && ! player1.paddleDown) {
    player1.y -= 3;
  } 

  if (player2.paddleDown && ! player2.paddleUp) {
    player2.y += 3;
  }
  if (player2.paddleUp && ! player2.paddleDown) {
    player2.y -= 3;
  }
  
  // don't let paddles outside of the play area
  player1.y = constrain(player1.y, 0, height-player1.ht-1);
  player2.y = constrain(player2.y, 0, height-player2.ht-1);
  
  // bounce puck on paddles -- player 1 -- based on x-coordinate
  if (puck.x - puck.r < player1.x + player1.wd) {
    // check if puck is within paddle height...
    if (puck.y > player1.y && puck.y < player1.y + player1.ht) {
      puck.xSpeed = abs(puck.xSpeed) + 0.2;
      puck.ySpeed = abs(puck.ySpeed) + abs(random(1,2) * 0.2)
      player2.y = player2.y + 0.075;
    } else if (puck.x < 0) { 
      // ???
      ellipse(score2.x, score2.y, score2.r);
      puck.xSpeed = 0;
      puck.ySpeed = 0;
    }
  }
  
  // bounce puck on paddles -- player 2 -- based on x-coordinate
  if (puck.x + puck.r > player2.x - player2.wd) {
    // check if puck is within paddle height...
    if (puck.y > player2.y && puck.y < player2.y + player2.ht) {
      puck.xSpeed = -abs(puck.xSpeed) - 0.2;
      puck.ySpeed = -abs(puck.ySpeed) - abs(random(1,2) * 0.2)
      player1.y = player1.y + 0.075;
    } else if (puck.x > 400) {
      // ???
      ellipse(score1.x, score1.y, score1.r);
      puck.xSpeed = 0;
      puck.ySpeed = 0;
    }
  }
}

// keyboard input
function keyPressed() {
  print(key);
  if (key == 'A') {
    player1.paddleDown = true;
  } else if (key == 'Q') {
    player1.paddleUp = true;
  }
  
  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = true;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = true;
  }
}

function keyReleased() {
  if (key == 'A') {
    player1.paddleDown = false;
  } else if (key == 'Q') {
    player1.paddleUp = false;
  }
  
  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = false;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = false;
  }
}
