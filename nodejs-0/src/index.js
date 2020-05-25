"use strict";

const sum = (x, y) => x + y;

const fibonacci = () => {
  let x = 0;
  let y = 1;
  let aux = sum(x, y);
  let numbersFibonacci = [x, y, aux];

  while (numbersFibonacci.length < 350) {
    aux = sum(x, y);
    x = y;
    y = aux;
    numbersFibonacci.push(sum(x, y))
  }

  return numbersFibonacci;
};

const isFibonnaci = (num) => fibonacci().some(n => n === num);

module.exports = {
  fibonacci,
  isFibonnaci,
};
