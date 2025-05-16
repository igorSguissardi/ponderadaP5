// <reference path="https://cdn.jsdelivr.net/npm/p5@1.9.0/types/index.d.ts" />

// Determina a última posição do Mouse
let lastMousePos = [0, 0];
// Adiciona uma linha que segue o mouse 
let brushWidth = 10;

// Cria o background padrão 
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

// Função de desenhar os elementos na tela;
function draw() {
  if(mouseIsPressed) {
    fill(100, 100, 150);
    ellipse(mouseX, mouseY, brushWidth, brushWidth);
    // Adiciona uma linha entre as bolinhas
    if (true) line(lastMousePos[0], lastMousePos[1], mouseX, mouseY)
  }
//guarda a localização do último click do mouse
lastMousePos = [mouseX, mouseY];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
