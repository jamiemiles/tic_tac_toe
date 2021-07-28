// Factory Function creates player objects.
const createPlayer = (name, symbol) => {
  const setName = () => name;
  const getSymbol = () => symbol;
  return { setName, getSymbol };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setGridLocation = (boardIndex, symbol) => {
    board[boardIndex] = symbol;
  };

  const getGridLocation = (boardIndex) => {
    return board[boardIndex];
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getGridLocation, setGridLocation, resetBoard };
})();

const displayController = (() => {
  const gridElements = document.querySelectorAll(".square-border");
  const resetButton = document.querySelector(".reset-btn");
  const resetBtn = document.querySelector("button");
  const body = document.querySelector("body");

  gridElements.forEach((square) => {
    square.addEventListener("click", (e) => {
      if (square.textContent) return;
      else {
        square.textContent = gameLogic.getCurrentPlayerSymbol();
        playRound.checkRound();
        playRound.gameRound++;
      }
    });
  });

  resetButton.addEventListener("click", () => {
    gameBoard.resetBoard();
    updateBoard();
    gameLogic.gameOver();
  });

  const updateBoard = () => {
    for (let i = 0; i < gridElements.length; i++) {
      gridElements[i].textContent = "";
    }
  };
  return { gridElements, resetBtn, body };
})();

const playRound = (() => {
  let gameRound = 0;

  const checkRound = () => {
    if (gameLogic.handleWin()) {
      gameLogic.gameOver();
      console.log("Winner!!");
    } else if (playRound.gameRound === 8) {
      gameLogic.handleDraw();
    }
  };

  return {
    checkRound,
    gameRound,
  };
})();

const gameLogic = (() => {
  const dataAttribute = document.querySelectorAll("[data-index]");

  const getCurrentPlayerSymbol = () => {
    return playRound.gameRound % 2 === 0
      ? playerOne.getSymbol()
      : playerTwo.getSymbol();
  };

  const handleClick = () => {
    gameLogic.dataAttribute.forEach((dataPoint) => {
      let dataAttributeIndex = dataPoint.getAttribute("data-index");
      dataPoint.addEventListener("click", () => {
        gameBoard.setGridLocation(dataAttributeIndex, getCurrentPlayerSymbol());
      });
    });
  };

  const handleWin = () => {
    const winCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // If player symbols has index pos equal to a winning combination, player wins.
    return winCombination.some((combination) => {
      return combination.every((index) => {
        return dataAttribute[index].textContent === getCurrentPlayerSymbol();
      });
    });
  };

  const handleDraw = () => {
    console.log("It's a draw!");
    gameOver();
  };

  const gameOver = () => {
    displayController.resetBtn.classList.remove("hide");
    displayController.resetBtn.classList.add("show");
    playRound.gameRound = 0;
  };

  return {
    getCurrentPlayerSymbol,
    handleClick,
    handleWin,
    handleDraw,
    gameOver,
    dataAttribute,
  };
})();
const playerOne = createPlayer("Jamie", "X");
const playerTwo = createPlayer("Simone", "O");
