import { createGame } from './game-create.js';
import { createNewElement, cleanSibling } from './helpers.js';
import { createMenu } from './menu.js';
import { createAchieveModal } from './modal.js';
import { checkSound, isSound } from './clicks.js';

// createMenu();
(function init() {
  const header = createNewElement('header', 'header');
  const container = createNewElement('div', 'header__container');
  const btnBack = createNewElement('div', 'header__btn');
  const btnAchieve = createNewElement('div', 'header__btn');
  const logo = createNewElement('div', 'header__logo');
  const sound = createNewElement('div', 'header__sound');
  document.body.append(header);
  header.append(logo);
  header.append(container);
  container.append(sound);
  container.append(btnAchieve);
  container.append(btnBack);
  btnBack.textContent = 'На главную';
  btnAchieve.textContent = 'Достижения';
  logo.textContent = 'Nonograms online';

  !isSound ? sound.classList.add('header__sound-off') : false;

  btnBack.addEventListener('click', btnClick);
  logo.addEventListener('click', btnClick);
  btnAchieve.addEventListener('click', createAchieveModal);
  sound.addEventListener('click', checkSound);

  function btnClick() {
    cleanSibling();
    createMenu();
  }
})();
createGame(5, 2);
// createMenu();
// createWinModal();
