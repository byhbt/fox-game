export const modFox = function modFox(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
};

export const modSence = function modSence(state) {
  document.querySelector(".game").className = `game ${state}`;
};

export const togglePoopBag = function (show) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};
