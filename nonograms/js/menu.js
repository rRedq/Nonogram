import { createNewElement, cleanSibling, randomNumber } from './helpers.js';
import { createGame, setFlag } from './game-create.js';
import { levelChoose } from './level.js';

function createMenu() {
  setFlag(false);
  const menu = createNewElement('div', 'menu');
  const menuStart = createNewElement('div', 'menu__start');
  const menuFirstP = createNewElement('div', 'menu__label');
  const menuSecondP = createNewElement('div', 'menu__text');
  const levelFirst = createNewElement('div', 'menu__level one');
  const levelSecond = createNewElement('div', 'menu__level two');
  const levelThird = createNewElement('div', 'menu__level three');
  const randomGame = createNewElement('div', 'menu__level');
  document.body.append(menu);
  menu.append(menuStart);
  menuStart.append(menuFirstP);
  menuStart.append(menuSecondP);
  menuStart.append(levelFirst);
  menuStart.append(levelSecond);
  menuStart.append(levelThird);
  menuStart.append(randomGame);
  menuFirstP.textContent = 'Новая игра!';
  menuSecondP.textContent = 'Выберете уровень сложности:';
  levelFirst.textContent = 'Уровень слизняка';
  levelSecond.textContent = 'Уровень червяка';
  levelThird.textContent = 'Уровень хакера';
  randomGame.textContent = 'Рандомная игра!';

  levelFirst.addEventListener('click', setLevel);
  levelSecond.addEventListener('click', setLevel);
  levelThird.addEventListener('click', setLevel);
  randomGame.addEventListener('click', setRandomGame);
}

function setRandomGame() {
  const fields = [5, 10, 15];
  const index = randomNumber(0, 2);

  cleanSibling();
  createGame(fields[index], randomNumber(0, 1));
}

function setLevel(e) {
  if (e.target.classList.contains('one')) {
    levelChoose(5);
  } else if (e.target.classList.contains('two')) {
    levelChoose(10);
  } else {
    levelChoose(15);
  }
  cleanSibling();
}

export { createMenu };
