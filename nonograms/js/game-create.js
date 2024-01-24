import { createNewElement } from './helpers.js';
import { firstOne } from './assets.js';
import { fieldLeftClick, fieldRightClick } from './clicks.js';
import { createMenu } from './menu.js';

let main = '';
let currentTimer = 0;
let interval = null;

function createGame(param) {
  main = createNewElement('main', 'main');
  const field = createNewElement('div', 'field');
  const game = createNewElement('section', 'game');
  const upperHints = createNewElement('div', 'upper-hints');
  const lowerHints = createNewElement('div', 'lower-hints');
  let size = param;

  document.body.append(main);
  createOffensive();
  main.append(game);
  game.append(upperHints);
  game.append(field);
  game.append(lowerHints);

  // console.table(firstOne);

  field.style.gridTemplateColumns = `repeat(${size}, 50px`;
  field.style.gridTemplateRows = `repeat(${size}, 50px`;
  upperHints.style.gridTemplateColumns = `repeat(${size}, 50px`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const elem = createNewElement('div', 'field__cell');
      elem.setAttribute('id', `${[i] + '-' + [j]}`);
      field.append(elem);
    }
  }

  for (let i = 0; i < size; i++) {
    const elem = createNewElement('div', 'upper-hints__line');
    elem.innerHTML = '1';
    upperHints.append(elem);
  }

  for (let i = 0; i < size; i++) {
    const elem = createNewElement('div', 'lower-hints__line');
    lowerHints.append(elem);
  }

  field.addEventListener('click', fieldLeftClick);
  field.addEventListener('contextmenu', fieldRightClick);
}

function createOffensive() {
  const offensive = createNewElement('section', 'offensive');
  const btn = createNewElement('div', 'offensive__btn');
  const timer = createNewElement('div', 'offensive__timer');
  main.append(offensive);
  offensive.append(btn);
  btn.textContent = 'На главную';
  offensive.append(timer);
  timer.textContent = '00:00';
  setTimer(timer);

  btn.addEventListener('click', btnClick);
}

function setTimer(param) {
  currentTimer = 0;
  let sec = parseInt(currentTimer % 60, 10);
  let min = parseInt(currentTimer / 60, 10);

  interval = setInterval(() => {
    currentTimer += 1;
    let sec = parseInt(currentTimer % 60, 10);
    let min = parseInt(currentTimer / 60, 10);
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    param.textContent = min + ':' + sec;

    // if (currentTimer >= 60) {
    //   currentTimer = 0;
    // }
  }, 1000);
}

function btnClick() {
  main.remove();
  clearInterval(interval);
  createMenu();
}

export { createGame };
