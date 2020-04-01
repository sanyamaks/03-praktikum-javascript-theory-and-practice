/*
 * Задача 14: «Простые числа»
 *
 * Напишите функцию primes(n). Её единственный аргумент — целое число n.
 * Функция должна возвращать массив простых чисел от 2 до n.
 *
 */

function isPrime(n) {
    let result;
    let count = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            count += 1;
            result = count === 2;
        }
    }
    return result;
    // Напишите код здесь
}

function primes(num) {
    if (typeof num !== "number" || !Number.isInteger(num)) {
        console.log("Введите целое число");
    } else if (!num) {
        return false;
    } else {
        let arr = [];
        for (let i = 1; i <= num; i++) {
            if (isPrime(i)) {
                arr.push(i);
            }
        }
        return arr;
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

primes(6); // [2, 3, 5]
primes(17); // [2, 3, 5, 7, 11, 13, 17]
