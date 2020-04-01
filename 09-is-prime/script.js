/*
 * Задача 9: «Простое число»
 *
 * Напишите функцию isPrime(n) для проверки, простое число n или нет.
 * Напомним, что число называют простым, если оно больше 1 и делится
 * без остатка только на 1 и на само себя.
 *
 * На вход функция должна принимать число n и возвращать true,
 * если n простое, и false — если нет.
 */

function isPrime(n) {
    if (typeof n !== "number" || !Number.isInteger(n)) {
        console.log("Введите целое число");
    } else if (!n) {
        return false;
    } else {
        let result;
        let count = 0;
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) {
                count += 1;
                result = count === 2;
            }
        }
        return result;
    }
    // Напишите код здесь
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(isPrime(0)); // false
console.log(isPrime(1)); // false
console.log(isPrime(3)); // true
console.log(isPrime(6)); // false
console.log(isPrime(17)); // true
