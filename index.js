//(0の場合)
// 「0」ボタンを取得
const zeroButton = document.querySelector('.button.zero');
// ディスプレイの要素を取得
const display = document.getElementById('display');
// クリックイベントを追加
zeroButton.addEventListener('click', () => {
    const currentValue = display.value;
    if(currentValue === '0') {
        return;
    } else { 
        display.value += '0';  // 「0」を追加表示
    }
});

//(C)の場合
const clearButton = document.querySelector('.clear.button');
clearButton.addEventListener('click', () => {
    const currentValue = display.value;
    if(currentValue === '0') {
        return;
    } else {
        display.value = '0';
    }
});

//(1)の場合
const numButton = document.getElementsByClassName('button');
numButton.addEventListener('click', () => {
    const currentValue = display.value;
    display.value = currentValue;
});

// iuiui_

