import { createNewElement, timerFormatting, cleanSibling } from './helpers.js';
import { currentTimer } from './game-create.js';
import { createMenu } from './menu.js';
import { templates } from './assets.js';
import { playSound } from './clicks.js';

function createOverlay() {
  const overlay = createNewElement('div', 'overlay');
  const modal = createNewElement('div', 'modal');
  const container = createNewElement('div', 'modal__container');
  document.body.append(overlay);
  overlay.append(modal);
  overlay.append(modal);
  modal.append(container);

  setTimeout(() => {
    modal.classList.add('modal-active');
  }, 10);

  return { overlay, modal, container };
}
function createWinModal() {
  const { modal, overlay, container } = createOverlay();
  const label = createNewElement('div', 'modal__label');
  const text = createNewElement('div', 'modal__text');
  const btns = createNewElement('div', 'modal__btns');
  const closeBtn = createNewElement('div', 'modal__btn');
  const menuBtn = createNewElement('div', 'modal__btn');
  container.append(label);
  container.append(text);
  container.append(btns);
  btns.append(menuBtn);
  btns.append(closeBtn);
  label.textContent = 'You have won!';
  text.textContent = `Great! You have solved the nonogram in ${currentTimer} seconds`;
  menuBtn.textContent = 'Select another game';
  closeBtn.textContent = 'Close';

  playSound('win');
  setAchieve();

  closeBtn.addEventListener('click', (e) => {
    closeModal(overlay, modal);
  });
  menuBtn.addEventListener('click', (e) => {
    cleanSibling();
    closeModal(overlay, modal);
    createMenu();
  });
}

function setAchieve() {
  const id = localStorage.getItem('redq-currentId');
  const param = localStorage.getItem('redq-currentParam');
  const newGame = {
    name: templates[param][id].name,
    timer: currentTimer,
    field: param,
    picture: templates[param][id].picture,
  };
  const arr =
    JSON.parse(localStorage.getItem('redq-achieve')) !== null
      ? JSON.parse(localStorage.getItem('redq-achieve'))
      : [];

  if (arr.length > 4) {
    arr.shift();
    arr.push(newGame);
  } else {
    arr.push(newGame);
  }

  localStorage.setItem('redq-achieve', JSON.stringify(arr));
}

function createAchieveModal() {
  const arr =
    JSON.parse(localStorage.getItem('redq-achieve')) !== null
      ? JSON.parse(localStorage.getItem('redq-achieve'))
      : [];

  const { overlay, modal, container } = createOverlay();
  const backBtn = createNewElement('div', 'modal__btn');
  const label = createNewElement('div', 'modal__label');
  modal.classList.add('modal__achieve');
  label.textContent = 'High score: ';
  container.append(label);

  if (arr.length > 0) {
    arr.sort(function (a, b) {
      return a.timer - b.timer;
    });
    for (let i = 0; i < arr.length; i++) {
      const cover = createNewElement('div', 'modal__cover');
      const coverLeft = createNewElement('div', 'modal__cover-left');
      const coverRight = createNewElement('div', 'modal__cover-right');
      const elem = createNewElement('div', 'modal__text-achieve');
      const elem2 = createNewElement('div', 'modal__text-achieve');
      const field = createNewElement('div', 'modal__text-achieve');
      const img = createNewElement('img', 'modal__img');
      elem.innerHTML = `<span>${arr[i].name}</span>` + '';
      elem2.innerHTML =
        'Time: ' + `<span>${timerFormatting(arr[i].timer)}</span>` + '';
      field.innerHTML =
        'Field: ' + `<span>${arr[i].field + 'x' + arr[i].field}</span>` + '';
      img.src = `./img/${arr[i].picture}.png`;

      container.append(cover);
      cover.append(coverLeft);
      cover.append(coverRight);
      coverLeft.append(img);
      coverRight.append(elem);
      coverRight.append(field);
      coverRight.append(elem2);
    }
  } else {
    const elem = createNewElement('div', 'modal__text');
    elem.textContent = "You haven't achievement yet";
    container.append(elem);
  }

  container.append(backBtn);
  backBtn.textContent = 'Close';

  backBtn.addEventListener('click', () => {
    closeModal(overlay, modal);
  });
}

function closeModal(param1, param2) {
  param2.classList.remove('modal-active');

  setTimeout(() => {
    param2.remove();
    param1.remove();
  }, 300);
}

export { createWinModal, createAchieveModal };
