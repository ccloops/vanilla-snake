'use strict';

const myParagraph = document.getElementById('p1');
const myOtherParagraph = document.getElementById('p2');
const myDiv = document.getElementById('target');
const myFreezer = document.getElementById('freezer');

function dragstart_handler(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dropEffect = "move";
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move"
}

function drop_handler(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text/plain");
  ev.target.appendChild(document.getElementById(data));
}

myOtherParagraph.addEventListener('dragstart', dragstart_handler);
myParagraph.addEventListener('dragstart', dragstart_handler);

myDiv.addEventListener('dragover', dragover_handler);
myDiv.addEventListener('drop', drop_handler);

myFreezer.addEventListener('dragover', dragover_handler);
myFreezer.addEventListener('drop', drop_handler);

