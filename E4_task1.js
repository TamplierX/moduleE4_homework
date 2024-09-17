// Функция для отображения ключей и их значений только собственных свойств объекта.
// Принимает в качестве аргумента объект.
function objectArguments(obj) {
    // Перебираем циклом for..in все ключи в объекте.
    for (let key in obj) {
        // Если ключ является собственным свойством объекта -> выводим в консоль.
        if (obj.hasOwnProperty(key)) {
            console.log(`Ключ: ${key}, значение: ${obj[key]}`);
        }
    }
}

// Создаем прототип.
const prototypeObj = {
    1 : '1',
    2 : '2',
    3 : '3',
}

// Создаем объект с прототипом.
const originalObj = Object.create(prototypeObj);
// Добавляем собственные свойства в объект originalObj.
originalObj.first = 1;
originalObj.second = 2;
originalObj.third = 3;

objectArguments(originalObj);