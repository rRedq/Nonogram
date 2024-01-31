import { createGame } from './game-create.js';
import { createNewElement, cleanSibling } from './helpers.js';
import { createMenu } from './menu.js';
import { createAchieveModal } from './modal.js';
import { checkSound, isSound, checkTheme, chooseGame } from './clicks.js';

// createMenu();
(function init() {
  const header = createNewElement('header', 'header');
  const container = createNewElement('div', 'header__container');
  const btnBack = createNewElement('div', 'header__btn');
  const btnAchieve = createNewElement('div', 'header__btn');
  const logo = createNewElement('div', 'header__logo');
  const sound = createNewElement('div', 'header__sound');
  const theme = createNewElement('div', 'header__theme-light');
  document.body.append(header);
  header.append(logo);
  header.append(container);
  container.append(theme);
  container.append(sound);
  container.append(btnAchieve);
  container.append(btnBack);
  btnBack.textContent = 'На главную';
  btnAchieve.textContent = 'Достижения';
  logo.textContent = 'Nonograms online';

  isDark(theme);
  !isSound ? sound.classList.add('header__sound-off') : false;

  btnBack.addEventListener('click', chooseGame);
  logo.addEventListener('click', chooseGame);
  btnAchieve.addEventListener('click', createAchieveModal);
  sound.addEventListener('click', checkSound);
  theme.addEventListener('click', checkTheme);
})();

function isDark(elem) {
  const theme = localStorage.getItem('redq-theme');
  if (theme === null) return false;

  if (theme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    elem.classList.add('header__theme-dark');
  }
}

createGame(5, 2);
// createMenu();
