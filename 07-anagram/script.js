/*
 * Задача 7: «Анаграмма»
 *
 * Два слова называют анаграммами, если они состоят из одних и тех же букв.
 * Напишите функцию, проверяющую, являются ли две строки анаграммами друг друга
 * (регистр букв не имеет значения). Для простоты примите, что в этих строках
 * нет пробелов и знаков препинания.
 *
 */

function anagram(str1, str2) {
    if (typeof str1 !== "string" || typeof str2 !== "string") {
        console.log("Введите 2 строки");
    } else if (!str1 || !str2) {
        console.log("Введите 2 строки");
    } else {
        const punctuationMarks = [
            ".",
            ",",
            "!",
            "&",
            ":",
            ";",
            "-",
            '"',
            "'",
            "`",
            " "
        ];

        const deletePunctuationMarks = function (str) {
            return punctuationMarks.reduce(function (interValue, item) {
                if (!interValue.includes(item)) return interValue;
                else {
                    while (interValue.includes(item)) {
                        interValue =
                            interValue.substr(0, interValue.indexOf(item)) +
                            interValue.substr(
                                interValue.indexOf(item) + 1,
                                interValue.length
                            );
                    }
                    return interValue;
                }
            }, str);
        };

        let newStr1 = deletePunctuationMarks(str1).toLowerCase();
        let newStr2 = deletePunctuationMarks(str2).toLowerCase();

        if (newStr1 === newStr2) {
            return false;
        } else {
            let arr1 = newStr1.split("");
            let arr2 = newStr2.toLowerCase().split("");

            for (let index1 = 0; index1 < arr1.length; index1++) {
                for (let index2 = 0; index2 < arr2.length; index2++) {
                    if (arr1[index1] === arr2[index2]) {
                        arr1.splice(index1, 1);
                        arr2.splice(index2, 1);
                        index1 = index1 - 1;
                    }
                }
            }

            return arr1.length === 0 && arr2.length === 0;
        }
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(anagram("finder", "Friend")); // true
console.log(anagram("hello", "bye")); // false
