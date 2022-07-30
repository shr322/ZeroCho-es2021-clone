"use strict";

const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

// 태그.classList.replace('기존클래스명','수정할클래스명')

let startTime = null;
let endTime = null;
const records = [];
let timeoutId = null;
$screen.addEventListener("click", (e) => {
  if (e.target.classList.contains("waiting")) {    // 시작전
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.innerText = "초록색이 되면 클릭하세요.";

    timeoutId = setTimeout(() => {
      startTime = new Date();
      $screen.classList.remove("ready");
      $screen.classList.add("now");
      $screen.innerText = "클릭하세요.";
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (e.target.classList.contains("ready")) {    // 시작중
    $screen.classList.remove("ready");
    $screen.classList.add("waiting");
    $screen.innerText = "너무 성급하시군요!";
    clearInterval(timeoutId);
  } else if (e.target.classList.contains("now")) {    //시작후
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);

    const highRecords = records.sort((a, b) => a - b).slice(0, 5);

    /*
      배열.reduce((누적값, 현재값) =>{
        return 새로운 누적값;
      }, 초기값)
      
      초기값이 없으면 첫번째 값으로 작동.
      [1,2,3,4].reduce((a,c)=> a+c , 초기값)  // 10

      a: 0 c: 1
      a: 1 c: 2
      a: 3 c: 3
      a: 6 c: 4

      정답 : 10


      ['영희','철수','형래','수지'].reduce((a,c,i)=> {a[i]=c; return a},{});

      a: {} c: 철수 i:0
      a: {0: 철수} c: 영희 i:1
      a: {0: 철수, 1:영희} c: 현엉 i:2
      a: {0: 철수, 1:영희, 2:현엉} c: 한솔 i:3
      a: {0: 철수, 1:영희, 2:현엉 3:한솔}


      {0: '영희', 1: '철수', 2: '형래', 3: '수지'}
    */
    const average = records.reduce((a, b) => a + b) / records.length;
    $result.innerText = `현재 ${current}ms, 평균 ${average}ms,`;
    highRecords.forEach((item, i) => {
      const p = document.createElement("p");
      p.append(`${i + 1}위 : ${item}ms \n`);
      $result.append(p)
      // $result.append(
      //   document.createElement('br'),
      //   `${i + 1}위 : ${item}ms` 
      // );
    });
    startTime = null;
    endTime = null;
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    $screen.innerText = "클릭해서 시작하세요.";
  }
});

/*
 셀프체크 

 지금까지는 반응속도의 평균만 보여주었습니다. 추가로 가장 빠른 다섯 번의 시도가 몇 초인지를 보여주세요. 6번 이상 시도한 경우에도 상위 6개만 보여주세요.
*/
