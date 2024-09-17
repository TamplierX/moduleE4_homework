// Функция проверяет есть ли у переданного объекта свойство с именем 'args'.
// В качестве аргументов принимает строку и объект.
// Результатом работы функции будет возвращение true или false.
function checkArgsInObject(args, object) {
    return args in object;
}

// Создаем объект со свойствами.
const obj = {
    first : 1,
    second : 2,
    third : 3,
}

// Выводим в консоль результат работы функции.
console.log(checkArgsInObject('first', obj))
