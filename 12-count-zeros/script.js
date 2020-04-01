/*
 * Задача 12: «Посчитать количество нулей»
 *
 * Напишите функцию countZeros(n), принимающую на вход целое неотрицательное
 * число n. Возвращать функция должна количество нулей, содержащихся в аргументе.
 *
 */

function countZeros(n) {
    if (typeof n !== "number" || !Number.isInteger(n) || n < 0) {
        console.log("Введите целое число");
    } else {
        let count = 0;
        for (let i = 1; i <= n; i++) {
            let k = i.toString();
            if (k.includes("0")) {
                while (k.includes("0")) {
                    count += 1;
                    k =
                        k.substr(0, k.indexOf("0")) +
                        k.substr(k.indexOf("0") + 1, k.length);
                }
            }
        }
        return count;
        // Напишите код здесь
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(countZeros(20)); // 2 – два нуля, по одному в числах 10 и 20
console.log(countZeros(100)); // 11 – 11 нулей в числах: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
console.log(countZeros(9)); // 11 – 11 нулей в числах: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
