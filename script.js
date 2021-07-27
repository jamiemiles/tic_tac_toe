const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setGridLocation = (boardIndex, symbol) => {
    console.log(`Board Updated at pos:${boardIndex} and symbol: ${symbol}`);
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

  gridElements.forEach((square) => {
    square.addEventListener("click", (e) => {
      if (square.textContent) return;
      else {
        square.textContent = gameLogic.playGame().getCurrentPlayerSymbol();
        gameLogic.playGame().incrementRound();
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
})();

// Factory Function creates player objects.
const createPlayer = (name, symbol) => {
  const setName = () => name;
  const getSymbol = () => {
    return symbol;
  };
  return { setName, getSymbol };
};

const gameLogic = (() => {
  const dataAttribute = document.querySelectorAll("[data-index]");
  let gameRound = 0;

  const playGame = () => {
    const handleClick = () => {
      dataAttribute.forEach((dataPoint) => {
        let dataAttributeIndex = dataPoint.getAttribute("data-index");
        dataPoint.addEventListener("click", () => {
          gameBoard.setGridLocation(
            dataAttributeIndex,
            getCurrentPlayerSymbol()
          );
        });
      });
    };

    const incrementRound = () => {
      gameRound++;
      if (gameRound === 9) handleDraw();
    };

    const getCurrentPlayerSymbol = () => {
      return gameRound % 2 === 0
        ? playerOne.getSymbol()
        : playerTwo.getSymbol();
    };

    const handleDraw = () => {
      console.log("It's a draw!");
      gameOver();
    };

    const gameOver = () => {
      gameRound = 0;
    };

    const handleWin = () => {
      const winningPossibilities = [
        // Horizontally.
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertically.
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonally.
        [0, 4, 8],
        [2, 4, 6],
      ];
    };
    return {
      handleClick,
      handleDraw,
      handleWin,
      getCurrentPlayerSymbol,
      gameOver,
      incrementRound,
    };
  };
  return { playGame };
})();

const playerOne = createPlayer("Jamie", "X");
const playerTwo = createPlayer("Simone", "O");
