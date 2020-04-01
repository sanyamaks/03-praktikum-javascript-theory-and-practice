/*
 * Задача 13: «Сумма двух»
 *
 * Напишите функцию sumOfTwo(arr, num). Её аргументы: массив целых чисел arr
 * и целое число num. Функция должна вернуть true, если в переданном массиве
 * есть какие-то два числа, чья сумма равна num. Если же такой пары чисел нет,
 * функция должна вернуть false.
 *
 */

function sumOfTwo(arr, sum) {
    let result = false;
    if (
        !Array.isArray(arr) ||
        typeof sum !== "number" ||
        !Number.isInteger(sum)
    ) {
        console.log("Введите массив целых чисел и число");
    } else {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let k = i + 1; k < arr.length; k++) {
                if (arr[i] + arr[k] === sum) {
                    result = true;
                }
            }
        }
    }
    return result;
    // Напишите код здесь
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(sumOfTwo([1, 2, 3, 4, 5], 4)); // true (так как 1 + 3 === 4)
console.log(sumOfTwo([1, 2, 3, 4, 5], 100)); // false
