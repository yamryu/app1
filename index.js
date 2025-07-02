//数字保持用変数宣言　
let firstNumber = null; //最初に押したもの
let secondNumber = null; //いこーる前に押したもの
let operation = null; //
const display = document.getElementById('display');

//四則演算用処理
const calculate = (firstNumber, secondNumber, operation) => {
    const x = Number(firstNumber);
    const y = Number(secondNumber);

    switch (operation) {
        case '+': // ← 半角に合わせる
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '÷':
            if (y !== 0) {
                return x / y; 
            } else {
                return 'error!';
            }
        default:
            return 'Invalid operation';
    }
}

//Cボタン処理
const clearButton = document.querySelector('.clear.button');
clearButton.addEventListener('click', () => {
    const currentValue = display.value;
    if(currentValue === '0') {
        return;
    } else {
        display.value = '0';
    }
});

//ACボタン処理
const allClearButton = document.querySelector('.all-clear');
allClearButton.addEventListener('click', () => {
    display.value = '0';
    firstNumber = null;
    secondNumber = null;
    operation = null;
    });

//数字ボタン処理
const numButtons = document.getElementsByClassName('button');
for (let i = 0; i < numButtons.length; i++) {
  const text = numButtons[i].textContent;

 if (/^[0-9]$/.test(text)) {
    numButtons[i].addEventListener('click', () => {
      if (display.value === '0') {
        display.value = text;
      } else {
        display.value += text;
      }
    });
  }
}