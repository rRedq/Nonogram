import { createNewElement, cleanSibling } from './helpers.js';
import { templates } from './assets.js';
import { createGame } from './game-create.js';
import { createMenu } from './menu.js';

function levelChoose(size) {
  const obj = templates[size];
  const menu = createNewElement('div', 'level');
  const level = createNewElement('div', 'level__options');
  const headline = createNewElement('div', 'level__headline');
  const desc = createNewElement('div', 'level__desc');
  const fields = createNewElement('div', 'level__fields');
  const btn = createNewElement('div', 'level__btn');
  document.body.append(menu);
  menu.append(level);
  level.append(desc);
  level.append(headline);
  level.append(fields);
  level.append(btn);

  desc.textContent = `Поле ${size}x${size}`;
  headline.textContent = 'Выберете игру:';
  btn.textContent = 'Назад';

  for (let i = 0; i < Object.keys(obj).length; i++) {
    const elem = createNewElement('div', 'level__field');
    elem.textContent = obj[i].name;
    elem.setAttribute('id', `${size}-${[i]}`);
    elem.addEventListener('click', levelClick);
    fields.append(elem);
  }

  btn.addEventListener('click', backBtn);
}

function levelClick(e) {
  const param1 = e.target.getAttribute('id').split('-')[0];
  const param2 = e.target.getAttribute('id').split('-')[1];
  document.querySelector('header').nextSibling.remove();
  createGame(param1, param2);
}

function backBtn() {
  cleanSibling();
  createMenu();
}

export { levelChoose };
