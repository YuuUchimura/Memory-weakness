const panel = document.getElementById("panel");
let arr = [];
let flgFirst = true;
let cardFirst;
let isJudgeTime = false;
for (let i = 1; i <= 4; i++) {
    arr.push(i);
    arr.push(i);
}

let newArray = [];
while (arr.length > 0) {
    let n = arr.length;
    let k = Math.floor(Math.random() * n);
    newArray.push(arr[k]);
    arr.splice(k, 1);
}
let div;
for (let i = 0; i < 8; i++) {
    div = document.createElement("div");
    div.setAttribute("id", "id" + i)
    panel.appendChild(div);
    div.classList.add("back", "card");
}

// ここからチャレンジ問題
const nextPlayer = document.getElementById("nextPlayer");
const player1Point = document.getElementById("player1Point");
const player2Point = document.getElementById("player2Point");

let point1 = 0;
let point2 = 0;
let num = 0;
const change = () => {
    if (num % 2 === 0) {
        nextPlayer.textContent = `次はplayer2の番です`;
    } else {
        nextPlayer.textContent = `次はplayer1の番です`;
    }
}
// チャレンジ問題表示の初期値
nextPlayer.textContent = `次はplayer1の番です`;
player1Point.textContent = `player1:${point1}`;
player2Point.textContent = `player2:${point2}`;

const cards = document.getElementsByClassName("card");
let turn = 0;
let timeOut;
for (let i = 0; i < 8; i++) {
    const card = document.getElementById(`id${i}`);
    card.addEventListener("click", () => {
        //チャレンジ問題
        num++;
        //ここまで
        if (card.textContent == "") {
            card.textContent = newArray[i];
            card.classList.remove("back");
        } else {
            return;// 表示されているカードと比較はしない
        }
        if (flgFirst) {
            cardFirst = card;
            flgFirst = false;
            // ２枚めの処理
        } else {
            // あっている時
            if (cardFirst.textContent == card.textContent) {
                // チャレンジ問題
                if (true) {
                    num++;
                }
                if (num % 2 === 0) {
                    point2++;
                } else {
                    point1++;
                }
                // ここまで
                turn++;
                isJudgeTime = true;
                if (isJudgeTime === true) {
                    for (let j = 0; j < 8; j++) {
                        cards[j].classList.add("not-cursor");
                    }
                }
                timeOut = setTimeout(function () {
                    card.classList.add("finish");
                    cardFirst.classList.add("finish");
                    if (turn === 4) {
                        console.log("終了")
                    }
                    isJudgeTime = false;
                    for (let j = 0; j < 8; j++) {
                        cards[j].classList.remove("not-cursor");
                    }
                }, 500);
                // 間違っている時
            } else {
                isJudgeTime = true;
                if (isJudgeTime === true) {
                    for (let j = 0; j < 8; j++) {
                        cards[j].classList.add("not-cursor");
                    }
                }
                timeOut = setTimeout(function () {
                    card.textContent = "";
                    card.classList.add("back");
                    cardFirst.textContent = "";
                    cardFirst.classList.add("back");
                    isJudgeTime = false;
                    for (let j = 0; j < 8; j++) {
                        cards[j].classList.remove("not-cursor");
                    }
                }, 500);
            }
            flgFirst = true;
            // チャレンジ問題
            change();
            num--;
            // ここまで
        }
        player1Point.textContent = `player1:${point1}`;
        player2Point.textContent = `player2:${point2}`;
        console.log(num)
    });
}
console.log(newArray)
