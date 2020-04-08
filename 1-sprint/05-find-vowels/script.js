/*
 * Задача 5: «Найти гласные»
 *
 * Напишите функцию findVowels(str), принимающую на вход кириллическую
 * строку str  и возвращающую количество гласных, содержащихся в этой строке.
 * Для вашего удобства вот массив кириллических гласных:
 *
 * ['а', 'я', 'о', 'ё', 'у', 'ю', 'ы', 'и', 'э', 'е'].
 *
 */

function findVowels(str) {
    if (typeof str !== "string") {
        console.log("Введите строку");
    } else {
        const dataVowels = ["а", "я", "о", "ё", "у", "ю", "ы", "и", "э", "е"];
        let arr = str.toLowerCase().split("");
        return dataVowels.reduce((interValue, item) => {
            arr.forEach(function (itemArr, indexArr) {
                if (arr[indexArr] === item) {
                    interValue += 1;
                }
            });

            return interValue;
        }, 0);
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(findVowels("здравствуй")); // 2
console.log(findVowels("привет")); // 2
console.log(findVowels("хеллоу")); // 3
