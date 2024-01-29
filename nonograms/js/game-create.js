import {
  createNewElement,
  timerFormatting,
  cleanSibling,
  changeCells,
} from './helpers.js';
import { templates } from './assets.js';
import {
  fieldLeftClick,
  fieldRightClick,
  setCount,
  saveGame,
} from './clicks.js';

let main = '';
let currentTimer = 0;
let interval = null;
let correctCount = 0;
let currentGame = [];
let gameFlag = 0;

function createGame(param, id) {
  setCount(0, 0);
  currentTimer = 0;
  gameFlag = 0;
  currentGame = templates[param][id].matrix;

  main = createNewElement('main', 'main');
  const field = createNewElement('div', 'field');
  const game = createNewElement('section', 'game');
  const upperHints = createNewElement('div', 'upper-hints');
  const lowerHints = createNewElement('div', 'lower-hints');
  const leftHints = setLeftHints(param, currentGame);
  const rightHints = setUpperHints(param, currentGame);

  document.body.append(main);
  createOffensive(param, id);
  main.append(game);
  game.append(upperHints);
  game.append(field);
  game.append(lowerHints);

  localStorage.currentField = param;
  localStorage.currentGame = id;

  // field.style.gridTemplateColumns = `repeat(${param}, 50px`;
  // field.style.gridTemplateRows = `repeat(${param}, 50px`;
  upperHints.style.gridTemplateColumns = `repeat(${param}, 50px`;
  upperHints.style.gridTemplateRows = '70px';
  lowerHints.style.gridTemplateColumns = '70px';
  lowerHints.style.gridTemplateRows = `repeat(${param}, 50px`;

  for (let i = 0; i < param; i++) {
    const parent = createNewElement('div', 'field__row');
    parent.style.width = `${param * 50}px`;
    parent.style.height = `50px`;
    field.append(parent);
    for (let j = 0; j < param; j++) {
      const elem = createNewElement('div', 'field__cell');
      elem.setAttribute('id', `${[i] + '-' + [j]}`);
      parent.append(elem);
    }
  }

  for (let i = 0; i < param; i++) {
    const elem = createNewElement('div', 'upper-hints__line');
    createHintElem(elem, rightHints[i]);
    upperHints.append(elem);
  }

  for (let i = 0; i < param; i++) {
    const elem = createNewElement('div', 'lower-hints__line');
    createHintElem(elem, leftHints[i]);
    lowerHints.append(elem);
  }

  field.addEventListener('click', fieldLeftClick);
  field.addEventListener('contextmenu', fieldRightClick);
}

function createOffensive(param, id) {
  const offensive = createNewElement('section', 'offensive');
  const timer = createNewElement('div', 'offensive__timer');
  const btns = createNewElement('div', 'offensive__btns');
  const resetBtn = createNewElement('div', 'offensive__btn');
  const solutionBtn = createNewElement('div', 'offensive__btn');
  const saveBtn = createNewElement('div', 'offensive__btn');

  main.append(offensive);
  offensive.append(timer);
  offensive.append(btns);
  btns.append(resetBtn);
  btns.append(solutionBtn);
  btns.append(saveBtn);
  resetBtn.textContent = 'Очистить';
  solutionBtn.textContent = 'Решение';
  saveBtn.textContent = 'Сохранить';
  timer.textContent = '00:00';

  resetBtn.addEventListener('click', clearGame);
  solutionBtn.addEventListener('click', openSolution);
  saveBtn.addEventListener('click', saveGame);
}

function continueSavedGame() {
  const storedMatrix = JSON.parse(localStorage.getItem('redq-matrix'));
  const storedOpenCount = localStorage.getItem('redq-openCount');
  const storedCount = localStorage.getItem('redq-count');
  const storedParam = localStorage.getItem('redq-param');
  const storedId = localStorage.getItem('redq-id');
  const storedTimer = localStorage.getItem('redq-timer');

  cleanSibling();
  createGame(storedParam, storedId);

  const elems = document.querySelectorAll('.field__cell');
  const timer = document.querySelector('.offensive__timer');
  timer.textContent = timerFormatting(storedTimer);
  changeCells(storedMatrix, elems);
  setCount(storedCount, storedOpenCount);
  setTimer(storedTimer);
}

function openSolution() {
  const elems = document.querySelectorAll('.field__cell');
  changeCells(currentGame, elems);
  setFlag(false);
}

function clearGame() {
  const id = localStorage.getItem('currentGame');
  const param = localStorage.getItem('currentField');
  setFlag(false);
  cleanSibling();
  createGame(param, id);
}

function setFlag(flag) {
  gameFlag = flag;
  console.log(gameFlag);
  setTimer(currentTimer);
}

function setTimer(timer) {
  const elem = document.querySelector('.offensive__timer');
  currentTimer = Number(timer);
  clearInterval(interval);

  if (gameFlag === true) {
    interval = setInterval(() => {
      currentTimer += 1;
      // console.log('timer = ' + currentTimer);
      // console.log(elem);

      elem.textContent = timerFormatting(currentTimer);
    }, 1000);
  }
}

function setLeftHints(param, matrix) {
  const current = matrix;
  const result = [];
  correctCount = 0;

  for (let i = 0; i < param; i++) {
    let sum = 0;
    let arr = [];
    for (let j = 0; j < param; j++) {
      if (current[i][j] === 1) {
        sum += 1;
        correctCount += 1;
      }
      if (current[i][j] === 0 && sum > 0) {
        arr.push(sum);
        sum = 0;
      }
      if ([j + 1] == param && sum > 0) {
        arr.push(sum);
      }
    }
    result.push(arr);
  }
  return result;
}
function setUpperHints(param, matrix) {
  const current = matrix;
  const result = [];

  for (let i = 0; i < param; i++) {
    let sum = 0;
    let arr = [];
    for (let j = 0; j < param; j++) {
      if (current[j][i] === 1) {
        sum += 1;
      }
      if (current[j][i] === 0 && sum > 0) {
        arr.push(sum);
        sum = 0;
      }
      if ([j + 1] == param && sum > 0) {
        arr.push(sum);
      }
    }
    result.push(arr);
  }
  return result;
}

function createHintElem(elem, arr) {
  for (let i = 0; i < arr.length; i++) {
    const newElem = createNewElement('p', 'line-text');
    newElem.textContent = arr[i];
    elem.append(newElem);
  }
}

export {
  createGame,
  currentGame,
  correctCount,
  currentTimer,
  gameFlag,
  setTimer,
  setFlag,
  continueSavedGame,
};
