/*
 * Задача 1: «Палиндром»
 *
 * Палиндром — это слово, предложение или последовательность символов,
 * которая читается слева направо так же, как и справа налево. Например,
 * «топот» и «Анна» — палиндромы, а «привет» и «Витя» — нет.
 *
 * Напишите функцию palindrome(str), принимающую как аргумент строку.
 * Функция должна вернуть true, если строка — палиндром, и false, если нет.
 *
 * Считайте, что на вход всегда передаётся слово: то есть знаков препинания
 * и пробелов в аргументе быть не может.
 *
 */

function palindrome(str) {
    if (typeof str !== "string") {
        console.log("Введите строку");
    } else if (!str) {
        return true;
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

        let isPalindrome = false;

        let newStr = deletePunctuationMarks(str).toLowerCase();

        const halfStringLength =
            newStr.length % 2 === 0 ? newStr.length / 2 : newStr.length / 2 - 0.5;

        for (let i = 0; i < halfStringLength; i++) {
            console.log(newStr[i] + " " + newStr[newStr.length - i - 1]);
            if (newStr[i] !== newStr[newStr.length - i - 1]) {
                isPalindrome = false;
                break;
            } else {
                isPalindrome = true;
            }
        }

        return isPalindrome;
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(palindrome("топот")); // должно быть true
console.log(palindrome("Saippuakivikauppias")); // true
console.log(palindrome("привет")); // false

/*
 * Бонус. Задача для любознательных. Пусть функция принимает на вход любую строку,
 * но пробелы и знаки препинания не учитывает. Например:
 *
 * palindrome('О, лета тело!'); // true
 *
 */
