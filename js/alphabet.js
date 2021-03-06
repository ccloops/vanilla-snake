'use strict';

Alphabet.all = [];
Word.all = [];
let wordStaging = [];
let wordBank;

const myLetters = document.getElementById('letters');
const myDiv = document.getElementById('drop-zone');
const wordsContainer = document.getElementById('words');
const dropDown = document.getElementById('drop-down');
const reset = document.getElementById('reset');
const trash = document.getElementById('trash');
const save = document.getElementById('save');

function Alphabet(letter) {
  this.letter = letter;
  this.left = 0;
  this.top = 0;
  this.isOnFridge = false;
  Alphabet.all.push(this);
}

function Word(word) {
  this.word = word;
  this.left = 0;
  this.top = 0;
  this.onFridge = false;
  Word.all.push(this);
}

let words = localStorage.getItem('words');

if (!words) {
  wordBank = [];
} else {
  wordBank = JSON.parse(words);
  showWords();
}

let storedAlphabet = localStorage.getItem('alphabet');

if (!storedAlphabet) {
  instantiateAlphabet();
} else {
  Alphabet.all = JSON.parse(storedAlphabet);
}

let storedTheme = localStorage.getItem('theme');

if(storedTheme) {
  console.log('hello');
  if (storedTheme === 'tropical') {
    console.log('hitting tropical');
    myDiv.style.backgroundImage = `url(./img/coconut.jpg)`
    myDiv.style.backgroundSize = 'cover';
    localStorage.setItem('theme', JSON.stringify(event.target.value));
  }

  if (storedTheme === 'underwater') {
    console.log('hitting underwater');
    myDiv.style.backgroundImage = `url(./img/abstract-aqua-blue-261403.jpg)`
    myDiv.style.backgroundSize = 'cover';
    localStorage.setItem('theme', JSON.stringify(event.target.value));
  }

  if (storedTheme === 'surprise') {
    console.log('hitting surprise');
    let images = ['./img/space-photo.JPG', './img/me-mooshy.JPG'];
    let randomIndex = Math.floor(Math.random() * images.length);
    myDiv.style.backgroundImage = 'url("' + images[randomIndex] + '")';
    myDiv.style.backgroundSize = '10em';
    localStorage.setItem('theme', JSON.stringify(event.target.value));
  }
}

function handleTheme(event) {
  event.preventDefault();
  console.log(event.target.value);
    if (event.target.value === 'tropical') {
      myDiv.style.backgroundImage = `url(./img/coconut.jpg)`
      myDiv.style.backgroundSize = 'cover';
      localStorage.setItem('theme', JSON.stringify(event.target.value));
    }

    if (event.target.value === 'underwater') {
      console.log('hitting underwater');
      myDiv.style.backgroundImage = `url(./img/abstract-aqua-blue-261403.jpg)`
      myDiv.style.backgroundSize = 'cover';
      localStorage.setItem('theme', JSON.stringify(event.target.value));
    }

    if (event.target.value === 'surprise') {
      console.log('hitting surprise');
      let images = ['./img/space-photo.JPG', './img/me-mooshy.JPG'];
      let randomIndex = Math.floor(Math.random() * images.length);
      myDiv.style.backgroundImage = 'url("' + images[randomIndex] + '")';
      myDiv.style.backgroundSize = '10em';
      localStorage.setItem('theme', JSON.stringify(event.target.value));
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
  for (let i = 0; i < Alphabet.all.length; i++) {
    let magnet = document.createElement('p');
    magnet.textContent = Alphabet.all[i].letter;
    magnet.setAttribute('draggable', 'true');
    magnet.setAttribute('id', Alphabet.all[i].letter);
    magnet.addEventListener('dragstart', dragStartHandler);
    myLetters.appendChild(magnet);
  }
}

function dragStartHandler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dropEffect = "move";
}

function dragOverHandler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
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
  
  for (let i = 0; i < Alphabet.all.length; i++) {
    if (data === Alphabet.all[i].letter) {
      Alphabet.all[i].left = elementSelected.style.left;
      Alphabet.all[i].top = elementSelected.style.top;

      if (event.target.id === 'drop-zone') {
        Alphabet.all[i].isOnFridge = true;
      }

      if (event.target.id === 'letters') {
        Alphabet.all[i].isOnFridge = false;
      }
    }
  }

  localStorage.setItem('alphabet', JSON.stringify(Alphabet.all));

}

function renderLetterPosition() {
  for (let i in Alphabet.all) {
    if (Alphabet.all[i].left !== 0) {
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
  for (let i in Alphabet.all) {
      let elementSelected = document.getElementById(Alphabet.all[i].letter);
      // elementSelected.style.padding = '0.5em';
      // elementSelected.style.left = 0;
  }
  location.reload();
}

function captureWord(event) {
  event.preventDefault();
  for (let i = 0; i < Alphabet.all.length; i++) {
    if (Alphabet.all[i].isOnFridge === true) {
      wordStaging.push(Alphabet.all[i]);
    }
  }
  wordStaging.sort(function (a, b) {
    return parseInt(a.left) - parseInt(b.left); 
  });

  addWordToBank();
  resetLetters();
}

function addWordToBank() {
  let newWord = '';
  for (let key of wordStaging) {
    newWord += key.letter;
  }

  if (newWord === 'snake') {
    window.location.href = './html/snake.html';
  }

  if (!wordBank.includes(newWord)) {
    wordBank.push(newWord);

    let savedMessage = document.createElement('h3');
    savedMessage.textContent = 'saved!';
    save.appendChild(savedMessage);

    setTimeout(function () { 
      save.removeChild(savedMessage);
    }, 1000);

  } else if (!wordStaging.length) {

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
  for (let word of wordBank) {

    if (word === '') {
      console.log('word cannot be blank');
    } else {
        new Word(word);
    
        let newWord = document.createElement('p');
        newWord.textContent = word;
        newWord.setAttribute('draggable', 'true');
        newWord.setAttribute('id', word);
        newWord.addEventListener('dragstart', dragStartHandler);
        wordsContainer.appendChild(newWord);
    }
    console.log(word);
  }

  wordBank = wordBank.filter(word => word !== '');
}

function removeItemHandler(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  event.target.appendChild(document.getElementById(data));

  let elementSelected = document.getElementById(data);
  trash.removeChild(elementSelected);

  wordBank = wordBank.filter(word => {
    if (word !== elementSelected.id) console.log('they equal');    
    return word !== elementSelected.id
  });

  localStorage.setItem('words', JSON.stringify(wordBank));
  resetLetters();
}

createLetters();
renderLetterPosition();

myDiv.addEventListener('dragover', dragOverHandler);
myDiv.addEventListener('drop', dropHandler);

trash.addEventListener('dragover', dragOverHandler);
trash.addEventListener('drop', removeItemHandler)

dropDown.addEventListener('change', handleTheme);

reset.addEventListener('click', resetLetters);
save.addEventListener('click', captureWord);