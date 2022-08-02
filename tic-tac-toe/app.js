"use strict";

let turn = "O";
const data = [];

for (let i = 0; i < 3; i++) {
  data.push([]);
}

function checkWinner(target) {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;

  // let rowIndex;
  // let cellIndex;

  // rows.forEach((row, ri) => {
  //   row.forEach((cell, ci) => {
  //     if (cell === target) {
  //       rowIndex = ri;
  //       cellIndex = ci;
  //     }
  //   });
  // });

  let hasWinner = false;

  if (
    rows[rowIndex][0].innerText === turn &&
    rows[rowIndex][1].innerText === turn &&
    rows[rowIndex][2].innerText === turn
  ) {
    hasWinner = true;
  }

  if (
    rows[0][cellIndex].innerText === turn &&
    rows[1][cellIndex].innerText === turn &&
    rows[2][cellIndex].innerText === turn
  ) {
    hasWinner = true;
  }

  if (
    rows[0][0].innerText === turn &&
    rows[1][1].innerText === turn &&
    rows[2][2].innerText === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].innerText === turn &&
    rows[1][1].innerText === turn &&
    rows[2][0].innerText === turn
  ) {
    hasWinner = true;
  }

  return hasWinner;
}

function callback(e) {
  if (e.target.innerText !== "") {
    console.log("빈칸이 아닙니다.");
    return;
  }
  console.log("빈칸입니다.");
  e.target.innerText = turn;

  if (checkWinner(e.target)) {
    $result.innerText = `${turn}님의 승리`;
    $table.removeEventListener("click", callback);
    return;
  }

  // let draw = true;
  // rows.forEach((row)=>{
  //   row.forEach((cell)=>{
  //     if(!cell.innerText){
  //       draw = false;
  //     }
  //   })
  // })

  let draw = rows.flat().every((cell) => {
    return cell.innerText;
  });

  if (draw) {
    $result.innerText = "무승부";
    return;
  }

  turn = turn === "X" ? "O" : "X";

  if (turn === "X") {
    const emptyCells = rows.flat().filter((item) => !item.innerText);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerText = 'X';

    const hasWinner = checkWinner(randomCell);
    if(hasWinner){
      $result.innerText = `${turn}님의 승리`;
      return;
    }

    let draw = rows.flat().every((cell) => {
      return cell.innerText;
    });
  
    if (draw) {
      $result.innerText = "무승부";
      return;
    }
  
    turn = turn === "X" ? "O" : "X";
    
  }
}

const $table = document.createElement("table");
const $result = document.createElement("div");
const rows = [];
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);

    $tr.append($td);
  }
  rows.push(cells);

  $table.append($tr);
}
$table.addEventListener("click", callback);

document.body.append($table);
document.body.append($result);
