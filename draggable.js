'use strict';

const myParagraph = document.getElementById('p1');
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
  console.log('event', event.x, event.y);
  console.log(event);
  myParagraph.style.position = 'absolute';
  myParagraph.style.zIndex = 1000;
  myParagraph.style.left = event.pageX - myParagraph.offsetWidth / 2 + 'px';
  myParagraph.style.top = event.pageY - myParagraph.offsetHeight / 2 + 'px';
}

myParagraph.addEventListener('dragstart', dragstart_handler);

myDiv.addEventListener('dragover', dragover_handler);
myDiv.addEventListener('drop', drop_handler);

myFreezer.addEventListener('dragover', dragover_handler);
myFreezer.addEventListener('drop', drop_handler);
