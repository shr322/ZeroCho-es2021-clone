const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1);
const shuffle = [];
while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
  const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
  const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내어
  shuffle.push(value); // shuffle 배열에 넣기
}

// for문
// const candidate = Array(45).fill().map((v, i) => i + 1);
// const shuffle = [];
// for (let i = candidate.length; i > 0; i--) {
//     const random = Math.floor(Math.random() * i);
//     const spliceArray = candidate.splice(random, 1);
//     const value = spliceArray[0];
//     shuffle.push(value);
// }
// console.log(shuffle);

const winBalls = shuffle.splice(0, 6).sort((a, b) => a - b);
const bonus = shuffle[6];

const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");

function drawBall(number, $parent) {
  const $ball = document.createElement("div");
  $ball.classList.add("ball");
  $ball.innerText = number;
  $parent.append($ball);
}

for (let i = 0; i < winBalls.length; i++) {
  setTimeout(() => {
    drawBall(winBalls[i], $result);
  }, 1000 * (i + 1));
}
setTimeout(() => {
  drawBall(bonus, $bonus);
}, 7000);
