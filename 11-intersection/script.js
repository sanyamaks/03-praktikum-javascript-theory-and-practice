/*
 * Задача 11: «Пересечения массивов»
 *
 * Напишите функцию intersection(arr1, arr2). Она должна принимать
 * на вход два массива целых чисел. Функция должна вернуть новый
 * массив чисел, содержащихся в обоих исходных массивах.
 *
 */

function intersection(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        console.log("Введите массивы целых чисел");
    } else {
        let resultArr = [];
        for (let index1 = 0; index1 < arr1.length; index1++) {
            for (let index2 = 0; index2 < arr2.length; index2++) {
                if (arr1[index1] === arr2[index2]) {
                    if (!resultArr.includes(arr1[index1])) {
                        resultArr.push(arr1[index1]);
                        arr1.splice(index1, 1);
                        arr2.splice(index2, 1);
                        index1 = index1 === 0 ? 0 : index1 - 1;
                        index2 = index2 === 0 ? 0 : index2 - 1;
                    }
                }
            }
        }
        return resultArr;
        // Напишите код здесь
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(intersection([1, 5, 4, 2], [8, 91, 4, 1, 3])); // [4, 1]
console.log(intersection([1, 5, 4, 2], [7, 12])); // []
console.log(intersection([1, 1, 5, 4, 2], [8, 91, 4, 1, 1, 3]));
