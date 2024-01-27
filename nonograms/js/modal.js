import { createNewElement, timerFormatting } from './helpers.js';
import { currentTimer } from './game-create.js';
import { createMenu } from './menu.js';

function createOverlay() {
  const overlay = createNewElement('div', 'overlay');
  const modal = createNewElement('div', 'modal');
  const container = createNewElement('div', 'modal__container');
  document.body.append(overlay);
  overlay.append(modal);
  overlay.append(modal);
  modal.append(container);

  return { overlay, modal, container };
}
function createWinModal() {
  const { modal, overlay, container } = createOverlay();
  const label = createNewElement('div', 'modal__label');
  const text = createNewElement('div', 'modal__text');
  const timer = createNewElement('div', 'modal__label');
  const textAchieve = createNewElement('div', 'modal__text');
  const closeBtn = createNewElement('div', 'modal__btn');
  const menuBtn = createNewElement('div', 'modal__btn');
  container.append(label);
  container.append(text);
  container.append(timer);
  container.append(textAchieve);
  container.append(menuBtn);
  container.append(closeBtn);
  label.textContent = 'Вы победили!';
  text.textContent = 'Затраченное время:';
  timer.textContent = timerFormatting(currentTimer);
  textAchieve.textContent =
    'Свои лучшие результаты вы можете посмотреть во вкладке достижения';
  menuBtn.textContent = 'Выбрать новую игру';
  closeBtn.textContent = 'Закрыть';

  setTimeout(() => {
    modal.classList.add('modal-active');
  }, 10);

  closeBtn.addEventListener('click', (e) => {
    closeModal(overlay, modal);
  });
  menuBtn.addEventListener('click', (e) => {
    const main = document.querySelector('main');
    main.remove();
    closeModal(overlay, modal);
    createMenu();
  });
}

function closeModal(param1, param2) {
  param2.classList.remove('modal-active');

  setTimeout(() => {
    param2.remove();
    param1.remove();
  }, 300);
}

export { createWinModal };
