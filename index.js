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
        case '/':
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

//演算処理
const opratorButtons = document.querySelectorAll('.oprator'); //演算子ボタンをすべて取得
opratorButtons.forEach((button) => { // 各演算子ボタンに対して処理を追加
    button.addEventListener('click', () => {
        let op = button.textContent; // ボタンに書かれている文字（+ − × ÷ =）を取得
    
        //'='押された際の処理
        if (op === '=') {
            if(firstNumber !== null && operation !== null) {
                secondNumber = display.value;
                const result = calculate(firstNumber, secondNumber, operation);
                display.value = result;
                firstNumber = result;
                secondNumber = null;
                operation = null;
            }
            return;
        }
        //演算子を変換
        switch (op) {
            case '+':
            case '-':
            case '*':
            case '/':
                operation = op;
                break;
            default:
                return;
        }
        //すでに演算子押してあるかチェック
        if(firstNumber !== null && operation !== null) {
            secondNumber = display.value; //今、画面に表示されている数値を代入
            const result = calculate(firstNumber, secondNumber, operation);
            display.value = result;
            firstNumber = result;
            secondNumber = null;
        } else {
            firstNumber = display.value;
        }

        operation = op; //ここで演算子更新
        display.value = '0'; // 次の入力のために0を表示
    })
});
