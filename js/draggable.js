'use strict';

Alphabet.all = [];

function Alphabet(letter) {
  this.letter = letter;
  this.left = 0;
  this.top = 0;
  Alphabet.all.push(this);
}

let storedAlphabet = localStorage.getItem('alphabet');

if(!storedAlphabet) {

  new Alphabet('a');
  new Alphabet('b');
  new Alphabet('c');
  new Alphabet('d');
  new Alphabet('e');
  new Alphabet('f');
  new Alphabet('g');
  new Alphabet('h');
  new Alphabet('i');
  new Alphabet('j');
  new Alphabet('k');
  new Alphabet('l');
  new Alphabet('m');
  new Alphabet('n');
  new Alphabet('o');
  new Alphabet('p');
  new Alphabet('q');
  new Alphabet('r');
  new Alphabet('s');
  new Alphabet('t');
  new Alphabet('u');
  new Alphabet('v');
  new Alphabet('w');
  new Alphabet('x');
  new Alphabet('y');
  new Alphabet('z');

  localStorage.setItem('alphabet', JSON.stringify(Alphabet.all));
} else {
  Alphabet.all = JSON.parse(storedAlphabet);
}

const myFreezer = document.getElementById('freezer');
const myDiv = document.getElementById('target');
const tropical = document.getElementById('tropical');
const underWater = document.getElementById('underwater');

function changeTheme(event) {
  event.preventDefault();
  console.log(event.target.id);
  if(event.target.id === 'tropical') {
    myFreezer.setAttribute('class', 'tropical');
    myDiv.setAttribute('class', 'tropical');
  }

  if (event.target.id === 'underwater') {
    myFreezer.setAttribute('class', 'underwater');
    myDiv.setAttribute('class', 'underwater');
  }
}

function createLetters() {
  for(let i = 0; i < Alphabet.all.length; i++) {
    let magnet = document.createElement('p');
    magnet.textContent = Alphabet.all[i].letter;
    magnet.setAttribute('draggable', 'true');
    magnet.setAttribute('id', Alphabet.all[i].letter);
    magnet.addEventListener('dragstart', dragStartHandler);
    myFreezer.appendChild(magnet);
  }
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

  for(let i = 0; i < Alphabet.all.length; i++) {
    if(data === Alphabet.all[i].letter) {
      Alphabet.all[i].left = elementSelected.style.left;
      Alphabet.all[i].top = elementSelected.style.top;
    }
  }

  localStorage.setItem('alphabet', JSON.stringify(Alphabet.all));

}

createLetters();

myDiv.addEventListener('dragover', dragOverHandler);
myDiv.addEventListener('drop', dropHandler);

myFreezer.addEventListener('dragover', dragOverHandler);
myFreezer.addEventListener('drop', dropHandler);

tropical.addEventListener('click', changeTheme);
underWater.addEventListener('click', changeTheme);
