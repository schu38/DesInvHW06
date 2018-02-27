var circles = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  for (var index = 0; index < 100; index = index + 1) {
    // new "circle" object, with x, y, xd, yd, and c properties:
    circles[index] = {
      x: width / 2,
      y: height / 2,
      xd: random(-2, 2),
      yd: random(-2, 2),
      c: color(random(360), 60, 100),
      r: random(10,30)
    }
  }
}

function draw() {
  background(0);
  noStroke();

  for (var index = 0; index < 100; index = index + 1) {
    // get circle object
    var circle = circles[index];

    // draw it
    fill(circle.c);
    ellipse(circle.x, circle.y, circle.r);

    // move it according to direction
    circle.x = circle.x + circle.xd;
    circle.y = circle.y + circle.yd;

    // check boundaries and update directions
    if(circle.x > width || circle.y > height || circle.x < 0 || circle.y < 0) {
      stroke(255);
      strokeWeight(5);
      line(0,0,400,0);
      line(0,0,0,400);
      line(400,0,0,0);
      line(0,400,0,0);
    }
    
    if (circle.x > width || circle.x < 0) {
      circle.xd = -circle.xd;
      circle.r = circle.r * 0.75;
    }
    if (circle.y > height || circle.y < 0) {
      circle.yd = -circle.yd;
      circle.r = circle.r * 0.75;
    }
    if (circle.r < 5) {
      circle.x = 30;
      circle.y = 30;
      circle.r = random(10,30);
      
    }
  }
}
