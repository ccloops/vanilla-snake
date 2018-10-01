'use strict';

const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = 'salmon';
const SNAKE_COLOR = 'forestGreen';
const SNAKE_BORDER_COLOR = 'darkGreen';

let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150},
];

let dx = 10;
let dy = 0;

let game = document.getElementById('game');

let ctx = game.getContext('2d');
ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
ctx.strokestyle = CANVAS_BORDER_COLOR;

ctx.fillRect(0, 0, game.width, game.height);
ctx.strokeRect(0, 0, game.width, game.height);

dx = 0;
dy = -10;

drawSnake();

function drawSnakePiece(snek) {
  ctx.fillStyle = SNAKE_COLOR;
  ctx.strokestyle = SNAKE_BORDER_COLOR;

  ctx.fillRect(snek.x, snek.y, 10, 10);
  ctx.strokeRect(snek.x, snek.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePiece);
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  snake.unshift(head);
  snake.pop();
}

function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;

  ctx.fillRect(0, 0, game.width, game.height);
  ctx.strokeRect(0, 0, game.width, game.height);
}

function main() {
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

// main();

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  console.log(event.keyCode);
  console.log(event);

  if(keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }  

  if(keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if(keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if(keyPressed === DOWN_KEY && !goingDown) {
    dx = 0;
    dy = 10;
  }
}

document.addEventListener('keydown', changeDirection);

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, game.width - 10);
  foodY = randomTen(0, game.height - 10);

  snake.forEach(function isFoodOnSnake(piece) {
    const foodIsOnSnake = part.x === foodX && part.y === foodY;
    if(foodIsOnSnake) {
      createFood();
    }
  })
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.strokestyle = 'darkred';
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}