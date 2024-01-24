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
  const prevHint = localStorage.getItem("redqCurrentHint");
  const curr = randomNumber(0, len - 1);

  if (prevHint === curr.toString()) {
    return randomHint(len);
  }

  localStorage.setItem("redqCurrentHint", curr);
  return curr;
}

export { createNewElement, randomNumber, randomHint };
