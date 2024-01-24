import { fieldLeftClick, fieldRightClick } from './clicks.js';
import { createGame } from './game-create.js';
import { createNewElement } from './helpers.js';
import { createMenu } from './menu.js';

// createGame(5);
// createMenu();
(function init() {
  const header = createNewElement('header', 'header');
  const btnBack = createNewElement('div', 'header__btn');
  const btnAchieve = createNewElement('div', 'header__btn');
  document.body.append(header);
  header.append(btnBack);
  header.append(btnAchieve);
  btnBack.textContent = 'На главную';
  btnAchieve.textContent = 'Достижения';

  btnBack.addEventListener('click', btnClick);

  function btnClick() {
    header.nextSibling.remove();
    createMenu();
  }
})();

createMenu();
