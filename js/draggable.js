'use strict';

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const myFreezer = document.getElementById('freezer');
const myDiv = document.getElementById('target');
let magnet;

for(let letter of alphabet) {
  magnet = document.createElement('p');
  magnet.textContent = letter;
  magnet.setAttribute('draggable', 'true');
  magnet.setAttribute('id', letter);
  magnet.addEventListener('dragstart', dragStartHandler);
  myFreezer.appendChild(magnet);
}

function dragStartHandler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dropEffect = "move";
}

function dragOverHandler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move"
}

function dropHandler(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  event.target.appendChild(document.getElementById(data));

  let elementSelected = document.getElementById(data);

  elementSelected.style.position = 'absolute';
  elementSelected.style.zIndex = 1000;
  elementSelected.style.left = event.pageX - elementSelected.offsetWidth / 2 + 'px';
  elementSelected.style.top = event.pageY - elementSelected.offsetHeight / 2 + 'px';
}


myDiv.addEventListener('dragover', dragOverHandler);
myDiv.addEventListener('drop', dropHandler);

myFreezer.addEventListener('dragover', dragOverHandler);
myFreezer.addEventListener('drop', dropHandler);
