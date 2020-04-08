/*
 * Задача 2: «FizzBuzz»
 *
 * Напишите функцию fizzBuzz(n), принимающую как аргумент натуральное число.
 * Функция должна выводить в консоль числа от 1 до n, заменяя числа:
 *
 * • кратные трём — на fizz;
 * • кратные пяти — на buzz;
 * • кратные и трём, и пяти одновременно — на fizzbuzz.
 *
 */

function fizzBuzz(num) {
    if (!num) {
        console.log("Введите целое число");
    } else if (typeof num !== "number") {
        console.log("Введите целое число");
    } else if (num % 1 !== 0) {
        console.log("Введите целое число");
    } else {
        let arr = [];
        for (let i = 1; i <= num; i++) {
            if (i % 3 === 0 && i % 5 === 0) {
                arr.push("fizzbuzz");
            } else if (i % 3 === 0) {
                arr.push("fizz");
            } else if (i % 5 === 0) {
                arr.push("buzz");
            } else {
                arr.push(i);
            }
        }
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[j]);
        }
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

fizzBuzz(15);
