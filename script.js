// <reference path="https://cdn.jsdelivr.net/npm/p5@1.9.0/types/index.d.ts" />

let lastMousePos = [0, 0];
let brushWidth = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  if(mouseIsPressed) {
    fill(100, 100, 150);
    ellipse(mouseX, mouseY, brushWidth, brushWidth);
    if (true) line(lastMousePos[0], lastMousePos[1], mouseX, mouseY)
  }
lastMousePos = [mouseX, mouseY];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
