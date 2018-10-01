'use strict';

const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = 'salmon';

let game = document.getElementById('game');

let ctx = game.getContext('2d');
ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
ctx.strokestyle = CANVAS_BORDER_COLOR;

ctx.fillRect(0, 0, game.width, game.height);
ctx.strokeRect(0, 0, game.width, game.height);