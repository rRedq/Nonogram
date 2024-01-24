import { createNewElement } from './helpers.js';
import { firstOne } from './assets.js';
import { fieldLeftClick, fieldRightClick } from './clicks.js';

function createGame(param) {
  const field = createNewElement('div', 'field');
  const game = createNewElement('section', 'game');
  const upperHints = createNewElement('div', 'upper-hints');
  const lowerHints = createNewElement('div', 'lower-hints');
  let size = param;

  document.body.append(game);
  game.append(upperHints);
  game.append(field);
  game.append(lowerHints);
  console.table(firstOne);

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

export { createGame };
