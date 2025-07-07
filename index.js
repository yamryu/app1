//数字保持用変数宣言　
let firstNumber = null; //
let secondNumber = null; //
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

// 数字と小数点のボタン処理
const numButtons = document.getElementsByClassName('button');
for (let i = 0; i < numButtons.length; i++) {
  const text = numButtons[i].textContent;

  if (/^[0-9.]$/.test(text)) {
    numButtons[i].addEventListener('click', () => {
      let current = display.value;

      // 小数点が押されたとき
      if (text === '.') {
        if (current.includes('.')) return;
        if (current === '0') {
          display.value = '0.';
        } else {
          display.value = current + '.';
        }
        return;
      }

      // 数字が押されたとき
      // 小数点が含まれるかどうかで処理を分ける
      if (current.includes('.')) {
        // 小数点がある場合：そのまま末尾に追加
        display.value = current + text;
      } else {
        // カンマを除去 → 数値追加 → カンマ付き表示
        let rawValue = current.replace(/,/g, '');
        if (rawValue === '0') {
          rawValue = text;
        } else {
          rawValue += text;
        }
        display.value = Number(rawValue).toLocaleString();
      }
    });
  }
}


// 演算処理
const opratorButtons = document.querySelectorAll('.oprator'); //演算子ボタンをすべて取得
opratorButtons.forEach((button) => { // 各演算子ボタンに対して処理を追加
    button.addEventListener('click', () => {
        let op = button.textContent; // ボタンに書かれている文字（+ − × ÷ =）を取得
    
        // '='押された際の処理
        if (op === '=') {
            if(firstNumber !== null && operation !== null) {
                secondNumber = display.value.replace(/,/g, ''); // 現在の画面の値を取得
                const result = calculate(firstNumber, secondNumber, operation);
                if (typeof result === 'number') {
                    display.value = result.toLocaleString();
                } else {
                    display.value = result;
                }
                firstNumber = result; // 結果を firstNumber に格納
                secondNumber = null;
                operation = null; // 結果が出たので演算子をリセット
            }
            return;
        }
        
        // 演算子が押された場合の処理
        if (firstNumber !== null && operation !== null) {
            // 前回の計算結果を使って新しい演算を行う
            secondNumber = display.value.replace(/,/g, ''); // 今の値を secondNumber として設定
            const result = calculate(firstNumber, secondNumber, operation);
            if (typeof result === 'number') {
                display.value = result.toLocaleString();
            } else {
                display.value = result;
            }
            firstNumber = result; // 新しい計算結果を firstNumber に格納
            secondNumber = null;
        } else {
            // 最初の数字を firstNumber として設定
            firstNumber = display.value.replace(/,/g, '');
        }

        operation = op; // 演算子を設定
        display.value = '0'; // 次の入力のために表示をリセット
    });
});
