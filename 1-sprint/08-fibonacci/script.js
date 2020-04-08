/*
 * Задача 8: «Фибоначчи»
 *
 * Последовательность Фибоначчи — это порядок чисел, где каждое последующее
 * число является суммой двух предыдущих: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
 *
 * Напишите функцию, которая принимает на вход число n и возвращает n-й элемент
 * последовательности Фибоначчи.
 */

function fibonacci(n) {
    if (typeof n !== "number" || !Number.isInteger(n)) {
        console.log("Введите целое число");
    } else {
        let firstTerm = 0;
        let secondTerm = 1;
        let result = firstTerm;
        if (n === 2) {
            result = secondTerm;
        }
        for (let i = 3; i <= n; i++) {
            result = firstTerm + secondTerm;
            firstTerm = secondTerm;
            secondTerm = result;
        }
        return result;
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(fibonacci(4)); // 2. Четвёртое число последовательности — двойка (0, 1, 1, 2)
