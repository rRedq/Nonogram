import {
  createNewElement,
  timerFormatting,
  cleanSibling,
  changeCells,
} from './helpers.js';
import { templates } from './assets.js';
import { setRandomGame } from './menu.js';
import {
  fieldLeftClick,
  fieldRightClick,
  setCount,
  saveGame,
  openSolution,
  clearGame,
  chooseGame,
} from './clicks.js';

let main = '';
let currentTimer = 0;
let interval = null;
let correctCount = 0;
let currentGame = [];
let gameFlag = 0;
let isAdaptive = 'normal';

function createGame(param, id) {
  setCount(0, 0);
  currentTimer = 0;
  setFlag(0);
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
  createOffensiveBottom();

  localStorage.setItem('redq-currentParam', param);
  localStorage.setItem('redq-currentId', id);

  const cWidth =
    document.documentElement.clientWidth < 690 && Number(param) === 15
      ? 25
      : 35;

  upperHints.style.gridTemplateColumns = `repeat(${param}, ${cWidth}px`;
  upperHints.style.gridTemplateRows = 'auto';
  lowerHints.style.gridTemplateColumns = 'auto';
  lowerHints.style.gridTemplateRows = `repeat(${param}, ${cWidth}px`;

  for (let i = 0; i < param; i++) {
    const parent = createNewElement('div', 'field__row');
    parent.style.width = `${param * cWidth}px`;
    parent.style.height = `${cWidth}px`;
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
  main.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

function createOffensive(param, id) {
  const offensive = createNewElement('section', 'offensive');
  const timer = createNewElement('div', 'offensive__timer');
  const label = createNewElement('div', 'offensive__label');

  main.append(offensive);
  offensive.append(label);
  offensive.append(timer);
  label.textContent = `${templates[param][id].name} `;
  label.innerHTML += `<span>${param}x${param}</span>`;
  timer.textContent = '00:00';
}

function createOffensiveBottom() {
  const offensive = createNewElement('section', 'offensive__bottom');
  const btns = createNewElement('div', 'offensive__btns');
  const resetBtn = createNewElement('div', 'offensive__btn');
  const solutionBtn = createNewElement('div', 'offensive__btn solution');
  const saveBtn = createNewElement('div', 'offensive__btn save');
  const chooseBtn = createNewElement('div', 'offensive__btn choose');
  const downloadBtn = createNewElement('div', 'offensive__btn download');
  const randomBtn = createNewElement('div', 'offensive__btn random');

  main.append(offensive);
  offensive.append(btns);
  btns.append(resetBtn);
  btns.append(randomBtn);
  btns.append(chooseBtn);
  btns.append(saveBtn);
  btns.append(downloadBtn);
  btns.append(solutionBtn);
  resetBtn.textContent = 'Reset game';
  chooseBtn.textContent = 'New game';
  solutionBtn.textContent = 'Solution';
  saveBtn.textContent = 'Save game';
  downloadBtn.textContent = 'Continue last game';
  randomBtn.textContent = 'Random game';

  localStorage.getItem('redq-openCount') === null
    ? downloadBtn.classList.add('disable')
    : false;

  resetBtn.addEventListener('click', clearGame);
  solutionBtn.addEventListener('click', openSolution);
  saveBtn.addEventListener('click', saveGame);
  chooseBtn.addEventListener('click', chooseGame);
  downloadBtn.addEventListener('click', continueSavedGame);
  randomBtn.addEventListener('click', setRandomGame);
}

function continueSavedGame() {
  const storedMatrix = JSON.parse(localStorage.getItem('redq-matrix'));
  if (storedMatrix === null) return false;
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

function setFlag(flag) {
  gameFlag = flag;
  setTimer(currentTimer);

  const save = document.querySelector('.save');
  const solution = document.querySelector('.solution');

  if (gameFlag === false && save !== null) {
    save.classList.add('disable');
    solution.classList.add('disable');
  }
}

function setTimer(timer) {
  const elem = document.querySelector('.offensive__timer');
  currentTimer = Number(timer);
  clearInterval(interval);

  if (gameFlag === true) {
    interval = setInterval(() => {
      currentTimer += 1;

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

function resizeGame() {
  const param = localStorage.getItem('redq-currentParam');

  if (param !== '15') return false;

  const elem = document.querySelector('.game');
  const cWidth = document.documentElement.clientWidth;

  if (cWidth < 690 && elem !== null && isAdaptive === 'normal') {
    setAdaptive(25);
    isAdaptive = 'small';
  } else if (cWidth > 720 && elem !== null && isAdaptive === 'small') {
    setAdaptive(35);
    isAdaptive = 'normal';
  }
}

function setAdaptive(size) {
  const param = localStorage.getItem('redq-currentParam');
  const fieldCell = document.querySelectorAll('.field__cell');
  const fieldRow = document.querySelectorAll('.field__row');
  const upper = document.querySelector('.upper-hints');
  const lower = document.querySelector('.lower-hints');

  for (let i = 0; i < fieldCell.length; i++) {
    fieldCell[i].style.maxWidth = `${size}px`;
    fieldCell[i].style.maxHeight = `${size}px`;
  }

  for (let i = 0; i < fieldRow.length; i++) {
    fieldRow[i].style.width = `${param * size}px`;
    fieldRow[i].style.height = `${size}px`;
  }

  upper.style.gridTemplateColumns = `repeat(${param}, ${size}px`;
  lower.style.gridTemplateRows = `repeat(${param}, ${size}px`;
}

window.addEventListener('resize', resizeGame);

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
