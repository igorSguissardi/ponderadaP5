// <reference path="https://cdn.jsdelivr.net/npm/p5@1.9.0/types/index.d.ts" />

let snake = [];
let brushWidth = 30;
let snakeLength = 40
let timer = 0;
let variance = 1;
let lastPos = [0, 0];
let draggingUI = false;
let brushSlider
let lengthSlider
let amplitudeSlider
let wavelengthSlider
let snakeColor
let streamLine = false;
let streamLineButton

function setup() {
  for(let i = 0; i < snakeLength; i++) {
    snake.push({ x: 100+i*10, y: 200});
  }
  createCanvas(windowWidth, windowHeight);
  background(220);
  let uiOffset = 0
  let uiSpacing = 30

  // SLIDERS E BOTÕES PARA CUSTOMIZAR TODAS AS VARIÁVEIS!
  // No código, o valor desses elementos é usado para os cálculos
  lengthSlider = createSlider(2, 100, 40, 1)
  lengthSlider.position(0, uiOffset)
  .mousePressed(() => {draggingUI = true})
  .mouseReleased(() => {draggingUI = false})
  uiOffset += uiSpacing

  amplitudeSlider = createSlider(0, 30, 10, 0)
  amplitudeSlider.position(0, uiOffset)
  .mousePressed(() => {draggingUI = true})
  .mouseReleased(() => {draggingUI = false})
  uiOffset += uiSpacing

  wavelengthSlider = createSlider(0.2, 1, 0.5, 0)
  wavelengthSlider.position(0, uiOffset)
  .mousePressed(() => {draggingUI = true})
  .mouseReleased(() => {draggingUI = false})
  uiOffset += uiSpacing

  brushSlider = createSlider(1, 80, 30, 0)
  brushSlider.position(0, uiOffset)
  .mousePressed(() => {draggingUI = true})
  .mouseReleased(() => {draggingUI = false})
  uiOffset += uiSpacing

  snakeColor = createColorPicker("rgb(100, 100, 150)");
  snakeColor.position(0, uiOffset)
  .mousePressed(() => {draggingUI = true})
  .mouseReleased(() => {draggingUI = false})
  uiOffset += uiSpacing

  streamLineButton = createButton("StreamLine")
  streamLineButton.position(0, uiOffset)
  .mousePressed(() => {draggingUI = true})
  .mouseReleased(() => {draggingUI = false})
  .mouseClicked(() => {
  // Troca a estilização do botão para exibir se está ativo ou não
    streamLine = !streamLine
    if (streamLine) streamLineButton.style('background-color', '#88cc88')
    else streamLineButton.style('background-color', '#ffffff')
  })
}
function draw() {
  brushWidth = brushSlider.value()
  snakeLength = lengthSlider.value();
  timer += 0.5;
  background(220);

  // Apenas adiciona elementos à cobra se o mouse for clicado
  // e não estiver clicando em um elemento de UI

  // A variável snake nada mais é do que um registro das últimas
  // posições do mouse do usuário
  if (mouseIsPressed && !draggingUI) {
    snake.push({ x: mouseX, y: mouseY });
    timer += 4;
  }

  // Se a array ultrapassa o limite, remove o elemento mais antigo
  // First one in, first one out
  if (snake.length > snakeLength) {
    snake.shift();
  }

  // Traça uma linha para cada elemento da array
  for (let i = 1; i < snake.length; i++) {
    let p1 = snake[i - 1];
    let p2 = snake[i];

    // Ângulo entre o ponto anterior e esse
    let angle = atan2(p2.y - p1.y, p2.x - p1.x);

    const amp = amplitudeSlider.value();
    const wav = wavelengthSlider.value();
    // Offset perpendicular para o movimento da cobra
    let waveOffset = (sin(timer * 0.1 + i * wav) * amp)
    if (streamLine) waveOffset *= ((snake.length-i)/snake.length)
    let offsetX = cos(angle + HALF_PI) * waveOffset;
    let offsetY = sin(angle + HALF_PI) * waveOffset;

    // Pega o fim da linha anterior e traça até a sua posição, criando uma nova linha
    stroke(snakeColor.color());
    strokeWeight(brushWidth);
    if (i != 1) line(lastPos[0], lastPos[1], p2.x + offsetX, p2.y + offsetY);
    lastPos = [p2.x + offsetX, p2.y + offsetY] // A posição é salva para o próximo loop
    // Se for o último ponto, desenhar cabeça
    if(i >= snake.length-1) {

      // Cabeça
      noStroke();
      fill(snakeColor.color());
      circle(p2.x + offsetX, p2.y + offsetY, brushWidth);

      // Posicionamento dos olhos
      let eyeOffset = brushWidth / 3;
      let eyeSize = brushWidth / 1.6;
      let eyeL = {
        x: p2.x + offsetX + cos(angle + HALF_PI) * eyeOffset,
        y: p2.y + offsetY + sin(angle + HALF_PI) * eyeOffset
      };
      let eyeR = {
        x: p2.x + offsetX + cos(angle - HALF_PI) * eyeOffset,
        y: p2.y + offsetY + sin(angle - HALF_PI) * eyeOffset
      };

      // Desenha olhos
      fill(255);
      stroke(0);
      strokeWeight(3);
      circle(eyeL.x, eyeL.y, eyeSize);
      circle(eyeR.x, eyeR.y, eyeSize);

      // Desenha pupilas
      let pupilSize = brushWidth / 5;
      let pupilOffset = brushWidth/10;
      fill(0);
      noStroke();
      circle(eyeL.x + cos(angle) * pupilOffset, eyeL.y + sin(angle) * pupilOffset, pupilSize);
      circle(eyeR.x + cos(angle) * pupilOffset, eyeR.y + sin(angle) * pupilOffset, pupilSize);
    }     
  }
}