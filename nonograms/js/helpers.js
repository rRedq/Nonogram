function createNewElement(param1, param2) {
  const element = document.createElement(param1);
  element.className = param2;
  return element;
}

function randomNumber(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomHint(len) {
  const prevHint = localStorage.getItem('redqCurrentHint');
  const curr = randomNumber(0, len - 1);

  if (prevHint === curr.toString()) {
    return randomHint(len);
  }

  localStorage.setItem('redqCurrentHint', curr);
  return curr;
}
function timerFormatting(param) {
  let sec = parseInt(param % 60, 10);
  let min = parseInt(param / 60, 10);
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  return '0:' + min + ':' + sec;
}

export { createNewElement, randomNumber, randomHint, timerFormatting };
