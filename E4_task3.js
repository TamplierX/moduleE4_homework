// Функция для создания пустого объекта без прототипа.
function createEmptyObject() {
    return Object.create(null)
}
// Создаёт с помощью функции пустой объект без прототипа emptyObj.
const emptyObj = createEmptyObject();
// Смотрим в консоли, что объект пустой.
console.log(emptyObj);
// Смотрим что [[Prototype]] равно null.
console.log(Object.getPrototypeOf(emptyObj));