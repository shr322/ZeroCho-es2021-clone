//  0 <= Math.random() < 1

const $input = document.querySelector('#input[type="text"]');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

let out = 0;

// // for 문
// const numbers = [];
// for (let i = 0; i < 9; i++) {
//     numbers.push(i + 1);
// }

// map함수
const numbers = Array(9).fill(1).map(function (item, i) {
    return item + i;
})

// // while 문
// const numbers = [];
// let i = 0;
// while (i < 9) {
//     numbers.push(i + 1);
//     i++
// }

const answer = [];
for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * numbers.length);
    answer.push(numbers[index])
    numbers.splice(index, 1)
}

const tries = [];

// 검사하는 코드
function checkInput(value) {
    if (value.includes(0)) {
        return alert(`1~9 숫자만 입력할수 있습니다.`)
    }

    if (value.length !== 4) { // value 몇자리인지 체크
        return alert('4자리 숫자를 입력해 주세요.');
    }
    if (tries.includes(value)) { // 이미 시도한 값인지 체크
        return alert('이미 시도한 값입니다.')
    }

    // if (new Set(value).size !== 4) { // 중복되는 숫자 체크
    //     return alert('중복되지 않게 입력해 주세요.')
    // }

    // 다른 중복 제거방법 
    const overLap = value.split('');
    const overLapArray = [];
    overLap.forEach((item, i) => {
        if (!overLapArray.includes(item)) {
            overLapArray.push(item);
        }
    })

    if (overLapArray.length !== 4) { // 중복되는 숫자 체크
        return alert('중복되지 않게 입력해 주세요.')
    }
    return true;
}

//중복제거 코드
/* 
    const dupArr = [1, 2, 3, 1, 2];

    let uniqueArr = [];
    dupArr.forEach((element) => {
        if (!uniqueArr.includes(element)) {
            uniqueArr.push(element);
        }
    });

    dupArr.forEach((element) => {
        if (!(uniqueArr.indexOf(element) > -1)) {
            uniqueArr.push(element);
        }
    });


    uniqueArr => [1, 2, 3];
*/


function message(text) {
    const p = document.createElement('p');
    p.innerText = text;
    $logs.append(p);
}

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = $input.value;
    $input.value = ''

    //문제있음
    if (!checkInput(value)) {
        return
    }

    // 홈런 시
    if (answer.join('') === value) {
        message('홈런')
        return;
    }

    //정답 10번 입력 시 
    if (tries.length >= 9) {
        message(`패배! 정답은${answer.join()}입니다.`);
        return
    }

    let strike = 0;
    let ball = 0;

    for (let i = 0; i < answer.length; i++) {
        const index = value.indexOf(answer[i])
        if (index > -1) {
            if (index === i) {
                strike++
            } else {
                ball++
            }
        }
    }

    if (strike === 0 && ball === 0) {
        out++;
        message(`${out}아웃`)
    } else {
        message(`${value} / ${strike} / ${ball}`)
    }

    if (out === 3) {
        message(`${out}아웃 패배! 정답은${answer.join()}입니다.`)
    }


    tries.push(value);
})