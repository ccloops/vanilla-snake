'use strict';

const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = 'salmon';
const SNAKE_COLOR = 'forestGreen';
const SNAKE_BORDER_COLOR = 'darkGreen';
const FOOD_COLOR = 'red';
const FOOD_BORDER_COLOR = 'darkRed';

let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150},
];

let score = 0;
let foodX;
let foodY;

let dx = 10;
let dy = 0;

let game = document.getElementById('game');

let ctx = game.getContext('2d');
ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
ctx.strokestyle = CANVAS_BORDER_COLOR;

ctx.fillRect(0, 0, game.width, game.height);
ctx.strokeRect(0, 0, game.width, game.height);

main();
createFood();

document.addEventListener('keydown', changeDirection);

function main() {

  if(didGameEnd()) return;
  // if (pauseGame()) return;

  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;

  ctx.fillRect(0, 0, game.width, game.height);
  ctx.strokeRect(0, 0, game.width, game.height);
}

function didGameEnd() {
  for(let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if(didCollide) return true;
  }

  const leftWallCollision = snake[0].x < 0;
  const rightWallCollision = snake[0].x > game.width - 10;
  const topWallCollision = snake[0].y < 0;
  const bottomWallCollision = snake[0].y > game.height - 10;

  return leftWallCollision || rightWallCollision || topWallCollision || bottomWallCollision;
}

function drawFood() {
  ctx.fillStyle = FOOD_COLOR;
  ctx.strokestyle = FOOD_BORDER_COLOR;
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  snake.unshift(head);

  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if(didEatFood) {
    score += 10;

    document.getElementById('score').innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, game.width - 10);
  foodY = randomTen(0, game.height - 10);

  snake.forEach(function isFoodOnSnake(piece) {
    const foodIsOnSnake = piece.x === foodX && piece.y === foodY;
    if (foodIsOnSnake) {
      createFood();
    }
  })
}

function drawSnakePiece(snek) {
  ctx.fillStyle = SNAKE_COLOR;
  ctx.strokestyle = SNAKE_BORDER_COLOR;

  ctx.fillRect(snek.x, snek.y, 10, 10);
  ctx.strokeRect(snek.x, snek.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePiece);
}

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

function pauseGame(event) {
  if (event.keyCode === 80) {
    return true;
  }
}

document.addEventListener('keydown', pauseGame);


