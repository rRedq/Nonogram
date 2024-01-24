import { firstOne } from './assets.js';
let count = 0;

function fieldLeftClick(e) {
  const value = e.target;
  const arr = firstOne;

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
    } else {
      value.classList.add('fill');
    }
  }
}
function fieldRightClick(e) {
  e.preventDefault();
  console.log(e.target);
  const value = e.target;
  const arr = firstOne;

  if (value.classList.contains('field__cell')) {
    const col = value.getAttribute('id').split('-')[0];
    const row = value.getAttribute('id').split('-')[1];

    if (arr[col][row] === 1 && value.classList.contains('fill')) {
      count -= 1;
    }

    if (value.classList.contains('fill')) {
      value.classList.remove('fill');
    }

    if (value.classList.contains('cross')) {
      value.classList.remove('cross');
    } else {
      value.classList.add('cross');
    }
  }
}

export { fieldLeftClick, fieldRightClick };
