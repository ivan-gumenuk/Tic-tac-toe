function activePlayer(player, state) {
  const play = document.getElementsByClassName(player);

  if (!state) {
    play[0].style.color = "#003b63";
    play[0].style.textShadow = "none";
  }
  else {
    play[0].style.color = "#ffbc00";
    play[0].style.textShadow = "2px 2px 2px #24587a, 1px 1px 1em #ffda73";
  }
}

function checkPlayer(turn) {
  if (turn % 2 == 0) {
    activePlayer("pl1", true);
    activePlayer("pl2", false);
  }
  else {
    activePlayer("pl1", false);
    activePlayer("pl2", true);
  }
}

function showWinner(player) {
  let winner = document.getElementById("winner");
  const slider = document.getElementsByClassName("sidebar");

  if (player == 1)
    winner.innerText = `Player 1
     Won!!!`;
  else if (player == 2)
    winner.innerText = `Player 2
     Won!!!`;
  else
    winner.innerText = `It's a
    draw!`;
  if (player > 0)
    slider[0].style.backgroundColor = "#00ff73";
  else
    slider[0].style.backgroundColor = "#FF9640";
  return true;
}

function winRow(field1, field2, field3) {
  field1.style.backgroundColor = "#00ff73";
  field2.style.backgroundColor = "#00ff73";
  field3.style.backgroundColor = "#00ff73";
  return true;
}

function checkWin(char) {
  let field = document.getElementsByClassName('field');
  let result = false;

  if (field[0].innerHTML == char && field[1].innerHTML == char && field[2].innerHTML == char)
    result = winRow(field[0], field[1], field[2]);
  else if (field[3].innerHTML == char && field[4].innerHTML == char && field[5].innerHTML == char)
    result = winRow(field[3], field[4], field[5]);
  else if (field[6].innerHTML == char && field[7].innerHTML == char && field[8].innerHTML == char)
    result = winRow(field[6], field[7], field[8]);
  else if (field[0].innerHTML == char && field[3].innerHTML == char && field[6].innerHTML == char)
    result = winRow(field[0], field[3], field[6]);
  else if (field[1].innerHTML == char && field[4].innerHTML == char && field[7].innerHTML == char)
    result = winRow(field[1], field[4], field[7]);
  else if (field[2].innerHTML == char && field[5].innerHTML == char && field[8].innerHTML == char)
    result = winRow(field[2], field[5], field[8]);
  else if (field[0].innerHTML == char && field[4].innerHTML == char && field[8].innerHTML == char)
    result = winRow(field[0], field[4], field[8]);
  else if (field[2].innerHTML == char && field[4].innerHTML == char && field[6].innerHTML == char)
    result = winRow(field[2], field[4], field[6]);
  return result;
}

function checkWinner(turn) {
  let win = false;
  let field = document.getElementsByClassName('field');

  if (checkWin('X'))
    win = showWinner(1); // Player 1 won!
  else if (checkWin('O'))
    win = showWinner(2); // Player 2 won!
  else if (turn > 8)
    win = showWinner(0); // Draw!
  return win;
}

function startGame(turn) {
  let win = false;

  checkPlayer(turn);
  document.getElementById("turns").innerText = 0;
  document.getElementById("my-game").onclick = function (event) {
    if (event.target.className == "field" && turn <= 8 &&
        event.target.innerText == "" && !win) {
      if (turn % 2 == 0)
        event.target.innerText = "X";
      else
        event.target.innerText = "O";
      turn++;
      document.getElementById("turns").innerText = turn;
      checkPlayer(turn);
      win = checkWinner(turn);
    }
  }
}

let turn = document.getElementById("turns").innerText;

document.getElementById("restart").onclick = () => document.location.reload(true);
startGame(turn);