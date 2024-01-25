import { createNewElement } from './helpers.js';
import { templates } from './assets.js';
import { createGame } from './game-create.js';

function levelChoose(size) {
  const obj = templates[size];
  const menu = createNewElement('div', 'level');
  const level = createNewElement('div', 'level__options');
  const headline = createNewElement('div', 'level__headline');
  const desc = createNewElement('div', 'level__desc');
  document.body.append(menu);
  menu.append(level);
  level.append(desc);
  level.append(headline);
  desc.textContent = `Поле ${size}x${size}`;
  headline.textContent = 'Выберете игру:';

  for (let i = 0; i < Object.keys(obj).length; i++) {
    const elem = createNewElement('div', 'level__field');
    elem.textContent = obj[i].name;
    elem.setAttribute('id', `${size}-${[i]}`);
    elem.addEventListener('click', levelClick);
    level.append(elem);
  }
}

function levelClick(e) {
  const param1 = e.target.getAttribute('id').split('-')[0];
  const param2 = e.target.getAttribute('id').split('-')[1];
  document.querySelector('header').nextSibling.remove();
  createGame(param1, param2);
}

export { levelChoose };
