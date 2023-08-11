const gameBoard = [ 
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
//помню про комментирование, но еще лучше помню мем про комментарии джуна,
//в котором каждая очевидная строчка была разжевана зачем-то :)
//объявление переменных
let playerXName = '';
let playerOName = '';
let currentPlayer = 'X';
let gameOver = false;
let starterChosen = false;
//функциональность запуска игры
function startGame() {
  playerXName = document.getElementById('playerX').value || 'Игрок X';
  playerOName = document.getElementById('playerO').value || 'Игрок O';
  starterChosen = false;

  document.getElementById('playerX').disabled = true;
  document.getElementById('playerO').disabled = true;
  document.querySelector('button').disabled = true;

  document.getElementById('result').innerText = 'Выберите, кто начнет игру:';
  document.getElementById('choose-starter').style.display = 'block';
}
//после выбора игрока игра начинается
function setStarter(starter) {
  currentPlayer = starter;
  document.getElementById('choose-starter').style.display = 'none';
  document.getElementById('result').innerText = `Игра началась! Сейчас ходит ${currentPlayer === 'X' ? playerXName || 'X' : playerOName || 'O'}.`;
  gameOver = false;
}
//функциональность ходов
  function makeMove(row, col) {
    if (!gameOver && gameBoard[row][col] === '') {
      gameBoard[row][col] = currentPlayer;
      document.getElementById('result').innerText = '';
  
      document.getElementById('game-board').children[row * 3 + col].innerText = currentPlayer;
  
      if (checkWin(currentPlayer)) {
        const winnerName = getWinnerName();
        document.getElementById('result').innerText = `Победитель: ${winnerName}`;
        gameOver = true;
      } else if (isBoardFull()) {
        document.getElementById('result').innerText = 'Ничья!';
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('result').innerText = `Сейчас ходит ${currentPlayer === 'X' ? playerXName : playerOName}.`;
      }
    }
  }
//выясняем, победная комбинация или нет
//сначала хотел сделать через несколько массивов, в которых содержатся изначально посчитанные все 
//победные комбинации, но так мне показалось прикольнее:)
  function checkWin(player) {
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[i][0] === player && gameBoard[i][1] === player && gameBoard[i][2] === player ||
        gameBoard[0][i] === player && gameBoard[1][i] === player && gameBoard[2][i] === player
      ) {
        return true;
      }
    }
  
    if (
      gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === player ||
      gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === player
    ) {
      return true;
    }
  
    return false;
  }
//выясняем, чье имя выводить в строке победителя
  function getWinnerName() {
    if (currentPlayer === 'X') {
      return playerXName;
    } else {
      return playerOName;
    }
  }
//проверяю каждый ход(проверка в makeMov), закончились поля или нет
  function isBoardFull() {
    for (let row of gameBoard) {
      if (row.includes('')) {
        return false;
      }
    }
    return true;
  }
