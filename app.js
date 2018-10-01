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

moveSnake();

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
  const head = {x: snake[0].x + dx, y: snake[0].y};

  snake.unshift(head);
  snake.pop();
}


