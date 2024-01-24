import { createNewElement } from './helpers.js';
import { createGame } from './game-create.js';

function createMenu() {
  const menu = createNewElement('div', 'menu');
  const menuStart = createNewElement('div', 'menu__start');
  const menuFirstP = createNewElement('div', 'menu__label');
  const menuSecondP = createNewElement('div', 'menu__text');
  const levelFirst = createNewElement('div', 'menu__level one');
  const levelSecond = createNewElement('div', 'menu__level two');
  const levelThird = createNewElement('div', 'menu__level three');
  document.body.append(menu);
  menu.append(menuStart);
  menuStart.append(menuFirstP);
  menuStart.append(menuSecondP);
  menuStart.append(levelFirst);
  menuStart.append(levelSecond);
  menuStart.append(levelThird);
  menuFirstP.textContent = 'Новая игра!';
  menuSecondP.textContent = 'Выберете уровень сложности:';
  levelFirst.textContent = 'Уровень слизняка';
  levelSecond.textContent = 'Уровень червяка';
  levelThird.textContent = 'Уровень хакера';

  function setLevel(e) {
    if (e.target.classList.contains('one')) {
      closeMenu(menu, 5);
    } else if (e.target.classList.contains('two')) {
      closeMenu(menu, 10);
    } else {
      closeMenu(menu, 15);
    }
  }

  levelFirst.addEventListener('click', setLevel);
  levelSecond.addEventListener('click', setLevel);
  levelThird.addEventListener('click', setLevel);
}

function closeMenu(elem, size) {
  elem.remove();
  createGame(size);
}

export { createMenu };
