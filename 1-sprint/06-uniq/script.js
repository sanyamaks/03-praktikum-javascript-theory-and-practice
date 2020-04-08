/*
 * Задача 6: «Уникальные числа»
 *
 * Напишите функцию uniq(arr), принимающую на вход массив целых чисел.
 * Функция должна возвращать массив уникальных чисел, которые содержатся
 * в переданном массиве. То есть, дубликаты должны быть удалены.
 *
 */

function uniq(arr) {
    let result;
    if (!Array.isArray(arr)) {
        result = "Введите массив целых чисел";
    } else if (arr.length === 0) {
        result = arr;
    } else {
        for (let index = 0; index < arr.length; index++) {
            if (!Number.isInteger(arr[index])) {
                result = "Введите массив целых чисел";
                break;
            } else {
                for (
                    let validIndex = index + 1;
                    validIndex < arr.length;
                    validIndex++
                ) {
                    if (arr[index] === arr[validIndex]) {
                        arr.splice(validIndex, 1);
                        index = index - 1;
                    }
                }
            }
            result = arr;
        }
    }
    return result;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(uniq([1, 2, 5, 4, 2])); // [1, 2, 5, 4]
console.log(uniq([3, 3, 3, 5])); // [3, 5]
console.log(uniq([1, 4, 2, 2, 3, 4, 8])); // [1, 4, 2, 3, 8]
