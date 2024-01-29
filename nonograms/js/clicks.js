import {
  currentGame,
  correctCount,
  currentTimer,
  gameFlag,
  setTimer,
  setFlag,
} from './game-create.js';
import { createWinModal } from './modal.js';

let count = 0;
let openCount = 0;

function fieldLeftClick(e) {
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
    } else {
      value.classList.add('fill');
      openCount += 1;
    }
  }

  // console.log('openC = ' + openCount);
  // console.log('rightCount = ' + count);
  console.log(currentTimer);
  console.log(currentGame);

  if (count === correctCount && openCount === count) {
    createWinModal();
    // setCount();
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
    } else {
      value.classList.add('cross');
    }
  }

  console.log('openC = ' + openCount);
  console.log('count = ' + count);

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
  const id = localStorage.getItem('currentGame');
  const param = localStorage.getItem('currentField');
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
}

export { fieldLeftClick, fieldRightClick, setCount, saveGame };
