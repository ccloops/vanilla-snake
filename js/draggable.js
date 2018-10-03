'use strict';

Alphabet.all = [];
let wordStaging = [];
let wordBank;

function Alphabet(letter) {
  this.letter = letter;
  this.left = 0;
  this.top = 0;
  this.isOnFridge = false;
  Alphabet.all.push(this);
}

let words = localStorage.getItem('words');

if(!words) {
  wordBank = [];
} else {
  wordBank = JSON.parse(words);
}

let storedAlphabet = localStorage.getItem('alphabet');

if(!storedAlphabet) {
  instantiateAlphabet();
} else {
  Alphabet.all = JSON.parse(storedAlphabet);
}

const myFreezer = document.getElementById('freezer');
const myDiv = document.getElementById('target');
const tropical = document.getElementById('tropical');
const underWater = document.getElementById('underwater');
const reset = document.getElementById('reset');
const save = document.getElementById('save');
const myWords = document.getElementById('show-words');

function changeTheme(event) {
  event.preventDefault();
  if(event.target.id === 'tropical') {
    myFreezer.setAttribute('class', 'tropical');
    myDiv.setAttribute('class', 'tropical');
  }

  if (event.target.id === 'underwater') {
    myFreezer.setAttribute('class', 'underwater');
    myDiv.setAttribute('class', 'underwater');
  }
}

function instantiateAlphabet() {
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

      if (event.target.id === 'target') {
        Alphabet.all[i].isOnFridge = true;
      }

      if (event.target.id === 'freezer') {
        Alphabet.all[i].isOnFridge = false;
      }
    }
  }

  localStorage.setItem('alphabet', JSON.stringify(Alphabet.all));

}

function renderLetterPosition() {
  for(let i in Alphabet.all) {
    if(Alphabet.all[i].left !== 0) {
      let elementSelected = document.getElementById(Alphabet.all[i].letter);
      elementSelected.style.position = 'absolute';
      elementSelected.style.zIndex = 1000;
      elementSelected.style.left = Alphabet.all[i].left;
      elementSelected.style.top = Alphabet.all[i].top;
    }
  }
}

function resetLetters(event) {
  Alphabet.all = [];
  localStorage.setItem('alphabet', JSON.stringify([]));
  instantiateAlphabet();
  location.reload();
}

function captureWord(event) {
  event.preventDefault();
  for(let i = 0; i < Alphabet.all.length; i++) {
    if(Alphabet.all[i].isOnFridge === true) {
      wordStaging.push(Alphabet.all[i]);
    }
  }
  wordStaging.sort(function (a, b) {
    return parseInt(a.left) - parseInt(b.left); 
  });

  addWordToBank();
}

function addWordToBank() {
  let newWord = '';
  for(let key of wordStaging) {
    newWord += key.letter;
  }
  if(!wordBank.includes(newWord)) {
    wordBank.push(newWord);

    let savedMessage = document.createElement('h3');
    savedMessage.textContent = 'saved!';
    save.appendChild(savedMessage);

    setTimeout(function () { 
      save.removeChild(savedMessage);
    }, 1000);

  } else if(!wordStaging.length) {

    let noLettersMessage = document.createElement('h3');
    noLettersMessage.textContent = 'no letters on board!';
    save.appendChild(noLettersMessage);

    setTimeout(function () {
      save.removeChild(noLettersMessage);
    }, 1000);

  } else if (wordBank.includes(newWord)) {

    let wordExistsMessage = document.createElement('h3');
    wordExistsMessage.textContent = 'word already exists!';
    save.appendChild(wordExistsMessage);

    setTimeout(function () {
      save.removeChild(wordExistsMessage);
    }, 1000); 

  } else {

    let wordExistsMessage = document.createElement('h3');
    wordExistsMessage.textContent = 'word already exists!';
    save.appendChild(wordExistsMessage);

    setTimeout(function () {
      save.removeChild(wordExistsMessage);
    }, 1000); 

    alert('something went wrong');
  }
  wordStaging = [];
  localStorage.setItem('words', JSON.stringify(wordBank));
}

function showWords(event) {
  for(let word of wordBank) {
    console.log(word);

    let newWord = document.createElement('p');
    newWord.textContent = word;
    newWord.setAttribute('draggable', 'true');
    newWord.addEventListener('dragstart', dragStartHandler);
    myFreezer.appendChild(newWord);
  }
}

createLetters();
renderLetterPosition();

myDiv.addEventListener('dragover', dragOverHandler);
myDiv.addEventListener('drop', dropHandler);

myFreezer.addEventListener('dragover', dragOverHandler);
myFreezer.addEventListener('drop', dropHandler);

tropical.addEventListener('click', changeTheme);
underWater.addEventListener('click', changeTheme);

reset.addEventListener('click', resetLetters);
save.addEventListener('click', captureWord);
myWords.addEventListener('click', showWords);
