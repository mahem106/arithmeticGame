'use strict';

var ans = '';
var solution;
var num1;
var num2;
var operator = '';
var max1;
var max2;
var score = 0;
var skipped = 0;


document.addEventListener('DOMContentLoaded', init);

function init() {
  document.querySelector('#skip').addEventListener('click', newProblem);
  document.querySelector('#check').addEventListener('click', checkAnswer);
  document.querySelector('#clear').addEventListener('click', clearAnswer);
  document.querySelector('#reset').addEventListener('click', resetGame);
  var nums = document.querySelectorAll('button.number');
  for (var i = 0; i < nums.length; i++) {
    nums[i].addEventListener('click', numberClick);
  }
  document.querySelector('#negative').addEventListener('click', negate);
  document.querySelector('#decimal').addEventListener('click', decimal);
  document.getElementById("skipped").innerHTML = 'Skipped: ' + skipped;
  document.getElementById("score").innerHTML = 'Score: ' + score;
  generateProblem();
}

function generateProblem() {
  opGen();
  solutionGen();
  document.getElementById("firstNumber").innerHTML = num1;
  document.getElementById("operator").innerHTML = operator;
  document.getElementById("secondNumber").innerHTML = num2;
  clearAnswer();
}

function opGen() {
  var num = Math.floor(Math.random() * 4) + 1;
  if (num === 1) {
    operator = '+';
    max1 = 100;
    max2 = 100;
  } else if (num === 2) {
    operator = '-';
    max1 = 100;
    max2 = 50;
  } else if (num === 3) {
    operator = 'x';
    max1 = 20;
    max2 = 10;
  } else if (num === 4) {
    operator = '÷';
    max1 = 100;
    max2 = 10;
  }
}

function solutionGen() {
  num1 = Math.floor(Math.random() * max1) + 1;
  num2 = Math.floor(Math.random() * max2) + 1;
  if (operator === '+') {
    solution = num1 + num2;
  }
  if (operator === '-') {
    solution = num1 - num2;
  }
  if (operator === 'x') {
    solution = num1 * num2;
  }
  if (operator === '÷') {
    solution = (num1 / num2);
    if (solution.toString().includes('.')) {
      solution = solution.toFixed(1);
    }
  }
}

function newProblem() {
  document.getElementById("result").innerHTML = 'The answer is: ' + solution;
  window.setTimeout(generateProblem, 2000);
  skipped++;
  setSkipped();
  if (skipped % 5 === 0) {
    score--;
    setScore();
  }
}

function checkAnswer() {
  if (solution == ans) {
    document.getElementById("result").innerHTML = 'Correct!';
    var correct = setTimeout(generateProblem, 1500);
    score++;
    setScore();
    if (score % 10 === 0 && score !== 0) {
      clearTimeout(correct);
      document.getElementById("result").innerHTML = "Good job! You've solved " + score + " problems correctly! Keep up the good work!"
      window.setTimeout(generateProblem, 4000);
    }
  } else {
    document.getElementById("result").innerHTML = 'Try again!';
    window.setTimeout(clearAnswer, 1000);
    score--;
    setScore();
  }
}

function clearAnswer() {
  ans = '';
  setAnswer();
  document.getElementById("result").innerHTML = '';
}

function resetGame() {
  score = 0;
  skipped = 0;
  setScore();
  setSkipped();
  generateProblem();
}

function setScore() {
  document.getElementById("score").innerHTML = 'Score: ' + score;
}

function setSkipped() {
  document.getElementById("skipped").innerHTML = 'Skipped: ' + skipped;
}

function setAnswer() {
  document.getElementById("inputField").innerHTML = ans;
}

function numberClick() {
  ans += this.value;
  setAnswer();
}

function negate() {
  if (ans != '') {
    ans = parseFloat(ans) * (-1);
    setAnswer();
  } else {
    ans += '-';
    setAnswer();
  }
}

function decimal() {
  if (ans === '') {
    ans += '0.';
    setAnswer();
  } else if (!ans.includes('.')) {
    ans += '.'
    setAnswer();
  } else {
    return;
  }
}
