/*
 * Задача 3: «Развернуть слова в предложении»
 *
 * Напишите функцию reverseWords(str), принимающую на вход строку.
 * Функция должна вернуть новую строку, расставив слова в обратном
 * порядке.Если в строке есть знаки препинания, их можно удалить
 * или оставить — на ваше усмотрение.
 *
 */

function reverseWords(str) {
    if (str === "") {
        return "";
    } else if (!str) {
        console.error("Введите строку, которую нужно перевернуть");
    } else if (typeof str !== "string") {
        console.error("Введите строку, которую нужно перевернуть");
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
            "  " //двойной пробел
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

        let newStr = deletePunctuationMarks(str);
        return newStr
            .split(" ")
            .reverse()
            .join(" ");
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(reverseWords("всегда много путей достичь цель есть")); // "есть цель достичь путей много всегда"
console.log(reverseWords("испробовать их все должны вы")); // "вы должны все их испробовать"
