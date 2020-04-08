/*
 * Задача 4: «С большой буквы»
 *
 * Напишите функцию capitalize(str). Функция должна возвращать новую
 * строку каждое слово в которой начинается с прописной буквы.
 *
 */

function capitalize(str) {
    if (typeof str !== "string") {
        console.log("Введите строку");
    } else if (!str) {
        return "";
    } else {
        const arr = str.toLowerCase().split(" ");
        const newArr = arr.map(
            item => item.substr(0, 1).toUpperCase() + item.substr(1, item.length)
        );
        const newStr = newArr.join(" ");
        return newStr;
    }
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(capitalize("молодость всё простит")); // "Молодость Всё Простит"
