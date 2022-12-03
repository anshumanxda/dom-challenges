const container = document.querySelector(".container");
const currentPlayerNode = document.querySelector(".current-player");
const playerWon = document.querySelector(".player-won");
const col = document.querySelectorAll(".col");

let currentPlayer = 1;
const togglePlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentPlayerNode.textContent = currentPlayer;
};

const SIGN = {
  1: "X",
  2: "O",
};

let player1 = [];
let player2 = [];

let gameOver = false;

const winCheck = () => {
  const winningPosiblities = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  let contains = false;

  for (let outer = 0; outer < winningPosiblities.length; outer++) {
    contains = false;

    let count = 0;
    let currentPlayerArr = currentPlayer === 1 ? player1 : player2;

    for (let inner = 0; inner < winningPosiblities[outer].length; inner++) {
      contains = currentPlayerArr.includes(winningPosiblities[outer][inner]);

      if (contains) {
        ++count;
      }

      if (count === 3) {
        gameOver = true;
        playerWon.textContent = `Player ${currentPlayer} that is "${SIGN[currentPlayer]}" won`;
        Array.from(col).forEach((el) => {
          el.style.cursor = "default";
          el.style.transform = "scale(1)";
        });
        winningPosiblities[outer].map((el) => {
          const box = document.querySelector(`.box-count-${el}`);
          box.style.backgroundColor = "rgb(230, 127, 127)";
        });
        break;
      }
    }
  }
};

const handleClick = (e) => {
  const boxCount = e.target.dataset.boxcount;
  const currentBox = document.querySelector(`.box-count-${boxCount}`);
  if (!currentBox.classList.contains("disabled")) {
    currentBox.textContent = SIGN[currentPlayer];
    currentBox.classList.add("disabled");

    if (currentPlayer === 1) player1.push(parseInt(boxCount));
    else player2.push(parseInt(boxCount));

    if (player1.length > 2 || player2.length > 2) winCheck();

    if (!gameOver) togglePlayer();
  }
};

container.addEventListener("click", (e) => {
  if (!gameOver) handleClick(e);
});
