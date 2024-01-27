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

  console.log('openC = ' + openCount);
  console.log('rightCount = ' + count);

  if (count === correctCount && openCount === count) {
    createWinModal();
    setCount();
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
  console.log('rightCount = ' + count);

  if (count === correctCount && openCount === count) {
    createWinModal();
    setCount();
    setFlag(false);
  }
}

function setCount(param) {
  count = param;
  openCount = param;
}

export { fieldLeftClick, fieldRightClick, setCount };
