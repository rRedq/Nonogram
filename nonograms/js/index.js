import { createGame } from './game-create.js';
import { createNewElement } from './helpers.js';
import { createMenu } from './menu.js';
import { createWinModal } from './modal.js';

// createMenu();
(function init() {
  const header = createNewElement('header', 'header');
  const container = createNewElement('div', 'header__container');
  const btnBack = createNewElement('div', 'header__btn');
  const btnAchieve = createNewElement('div', 'header__btn');
  const logo = createNewElement('div', 'header__logo');
  document.body.append(header);
  header.append(logo);
  header.append(container);
  container.append(btnBack);
  container.append(btnAchieve);
  btnBack.textContent = 'На главную';
  btnAchieve.textContent = 'Достижения';
  logo.textContent = 'Nonograms online';

  btnBack.addEventListener('click', btnClick);
  logo.addEventListener('click', btnClick);

  function btnClick() {
    header.nextSibling.remove();
    createMenu();
  }
})();
// createGame(5);
createMenu();
// createWinModal();
