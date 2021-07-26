// gameboard module.
const gameBoard = (() => {
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return board;
})();

const renderBoard = (() => {
  let section = document.querySelector(".board");
  for (let i = 0; i < gameBoard.length; i++) {
    let square = document.createElement("div");
    square.setAttribute("square-number", [i]);
    square.classList.add("square-border");
    section.appendChild(square);
  }
})();

// player factory function.
const player = (name, token) => {
  const playerName = () => name;
  const playerToken = () => token;
  return {
    playerName,
    playerToken,
  };
};
