import {
  currentGame,
  correctCount,
  currentTimer,
  gameFlag,
  setTimer,
  setFlag,
} from './game-create.js';
import { createWinModal } from './modal.js';
import { changeCells, cleanSibling } from './helpers.js';
import { createGame } from './game-create.js';
import { createMenu } from './menu.js';

let count = 0;
let openCount = 0;
let isSound =
  localStorage.getItem('isSound') !== null
    ? localStorage.getItem('isSound') === 'true'
      ? true
      : false
    : true;

function fieldLeftClick(e) {
  if (gameFlag === false) {
    return false;
  } else if (gameFlag === 0) {
    setFlag(true);
  }

  const value = e.target;
  const arr = currentGame;

  if (value.classList.contains('field__cell')) {
    const col = value.getAttribute('id').split('-')[0];
    const row = value.getAttribute('id').split('-')[1];

    if (arr[col][row] === 1 && !value.classList.contains('fill')) {
      count += 1;
    } else if (arr[col][row] === 1 && value.classList.contains('fill')) {
      count -= 1;
    }

    if (value.classList.contains('cross')) {
      value.classList.remove('cross');
    }

    if (value.classList.contains('fill')) {
      value.classList.remove('fill');
      openCount -= 1;
      playSound('eraser');
    } else {
      value.classList.add('fill');
      playSound('left-click');
      openCount += 1;
    }
  }

  if (count === correctCount && openCount === count) {
    createWinModal();
    setFlag(false);
  }
}

function fieldRightClick(e) {
  e.preventDefault();

  if (gameFlag === false) {
    return false;
  } else if (gameFlag === 0) {
    // setTimer(0, true);
    setFlag(true);
  }

  const value = e.target;
  const arr = currentGame;

  if (value.classList.contains('field__cell')) {
    const col = value.getAttribute('id').split('-')[0];
    const row = value.getAttribute('id').split('-')[1];

    if (arr[col][row] === 1 && value.classList.contains('fill')) {
      count -= 1;
    }

    if (value.classList.contains('fill')) {
      value.classList.remove('fill');
      openCount -= 1;
    }

    if (value.classList.contains('cross')) {
      value.classList.remove('cross');
      playSound('eraser');
    } else {
      value.classList.add('cross');
      playSound('right-click');
    }
  }

  if (count === correctCount && openCount === count) {
    createWinModal();
    // setCount();
    setFlag(false);
  }
}

function setCount(param, param2) {
  count = Number(param);
  openCount = Number(param2);
}

function saveGame() {
  if (gameFlag === false) return false;

  const id = localStorage.getItem('redq-currentId');
  const param = localStorage.getItem('redq-currentParam');
  const cells = document.querySelectorAll('.field__cell');
  const newMatrix = JSON.parse(JSON.stringify(currentGame));

  for (const value of cells) {
    const col = value.getAttribute('id').split('-')[0];
    const row = value.getAttribute('id').split('-')[1];

    if (value.classList.contains('fill')) {
      newMatrix[col][row] = 1;
    } else if (value.classList.contains('cross')) {
      newMatrix[col][row] = 2;
    } else {
      newMatrix[col][row] = 0;
    }
  }
  localStorage.setItem('redq-matrix', JSON.stringify(newMatrix));
  localStorage.setItem('redq-openCount', openCount);
  localStorage.setItem('redq-count', count);
  localStorage.setItem('redq-param', param);
  localStorage.setItem('redq-id', id);
  localStorage.setItem('redq-timer', currentTimer);

  document.querySelector('.download').classList.remove('disable');
}

function checkSound(e) {
  if (e.target.className !== 'header__sound') {
    isSound = true;
  } else {
    isSound = false;
  }

  e.target.classList.toggle('header__sound-off');
  localStorage.setItem('isSound', isSound);
}

function playSound(value) {
  if (!isSound) return false;
  const audio = new Audio(`./sounds/${value}.wav`);
  audio.play();
}

function openSolution() {
  if (gameFlag === false) return false;

  const elems = document.querySelectorAll('.field__cell');
  changeCells(currentGame, elems);
  setFlag(false);
}

function clearGame() {
  const id = localStorage.getItem('redq-currentId');
  const param = localStorage.getItem('redq-currentParam');
  setFlag(false);
  cleanSibling();
  createGame(param, id);
}

function checkTheme(e) {
  const elem = document.querySelector('.body');
  // e.target.classList.toggle('header__theme-dark');
  if (e.target.className === 'header__theme-light') {
    e.target.classList.add('header__theme-dark');
    elem.setAttribute('data-theme', 'dark');
    localStorage.setItem('redq-theme', 'dark');
  } else {
    e.target.classList.remove('header__theme-dark');
    elem.setAttribute('data-theme', 'light');
    localStorage.setItem('redq-theme', 'light');
  }
}

function chooseGame() {
  cleanSibling();
  createMenu();
}

export {
  fieldLeftClick,
  fieldRightClick,
  setCount,
  saveGame,
  checkSound,
  playSound,
  isSound,
  openSolution,
  clearGame,
  checkTheme,
  chooseGame,
};
