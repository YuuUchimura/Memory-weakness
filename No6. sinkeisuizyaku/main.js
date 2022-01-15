let cards = [];
let flgFirst = true;
let cardFirst;
let count = 0;

//裏返す関数だけ時間セットする
let setTimer;

window.onload = function load() {
  let arr = [];

  for (let i = 1; i < 5; i++) {
    arr.push(i);
    arr.push(i);
  }

  shuffle(arr);

  const panel = document.getElementById('panel');

  for (i = 0; i < 8; i++) {
    const div = document.createElement('div');
    div.className = 'card back';
    div.index = i;
    div.number = arr[i];
    div.innerHTML = '';
    div.onclick = turn;
    panel.appendChild(div);
    cards.push(div);
  }
};
// });

const shuffle = function(arr) {
  for (let i = arr.length - 1; 0 < i; i--) {
    //フィッシャーイェーツのシャッフル
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; //分割代入構文
  }
};

let div;

const turn = function(e) {
  div = e.target;

  if (div.innerHTML === '') {
    div.className = 'card';
    div.innerHTML = div.number;
  } else {
    return;
  }

  if (flgFirst) {
    cardFirst = div;
    flgFirst = false;
  } else {
    if (cardFirst.number === div.number) {
      count++;
      timer = setInterval('cardClear(div)', 500);
      if (count === 4) {
        setTimeout(function() {
          alert('終了です');
          document.location.reload();
        }, 500);
      }
    } else {
      timer = setInterval('cardBack(div)', 500);
    }
    flgFirst = true;
  }
};

const cardBack = function(div) {
  div.className = 'card back';
  div.innerHTML = '';
  cardFirst.className = 'card back';
  cardFirst.innerHTML = '';
  cardFirst = null;
  backTimer = NaN;
  clearInterval(timer);
};

const cardClear = function(div) {
  div.className = 'card finish';
  cardFirst.className = 'card finish';
  clearInterval(timer);
};
