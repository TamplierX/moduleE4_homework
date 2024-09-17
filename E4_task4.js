// Функция-конструктор для счётчика электричества.
function ElectricityMeter() {
    this.usedPower = 0
}

// Метод для вывода текущего потребления электричества.
ElectricityMeter.prototype.getUsedPower = function() {
    console.log(`Потребление электричества составляет ${this.usedPower} Вт/час`);
}

// Функция-конструктор для электроприборов.
// Аргументы: название прибора, сколько прибор употребляет электричества и к какому счетчику подключается.
function ElectricalDevices(name, power, electricityMeter) {
    this.name = name
    this.power = power
    this.electricityMeter = electricityMeter
    this.powerOn = false
}

// Метод подключения прибора к электросети.
ElectricalDevices.prototype.powerSwitchOn = function() {
    if (this.powerOn === false) {
        this.powerOn = true;
        this.electricityMeter.usedPower += this.power;
        console.log(`${this.name} - включен.`);
    } else {
        console.log(`Ошибка: Вы не можете включить ${this.name}, так как этот прибор уже включен.`);
    }
}

// Метод отключения прибора от электросети.
ElectricalDevices.prototype.powerSwitchOff = function() {
    if (this.powerOn) {
        this.powerOn = false;
        this.electricityMeter.usedPower -= this.power;
        console.log(`${this.name} - выключен.`);
    } else {
        console.log(`Ошибка: Вы не можете выключить ${this.name}, так как этот прибор уже выключен.`);
    }
}

// Функция-конструктор для приборов-компьютеров.
// Аргументы: название компьютера, тип компьютера, количество потребляемого электричества и счетчик электричества.
function Computer(name, type, power, electricityMeter) {
    this.name = name
    this.type = type
    this.power = power
    this.electricityMeter = electricityMeter
    this.gameModOn = false
}

// Создаем делегирующую связь.
Computer.prototype = new ElectricalDevices();

// Метод для включения у компьютера "игрового режима", который потребляет в два раза больше электричества.
Computer.prototype.enableGameMode = function() {
    if (this.gameModOn === false && this.powerOn) {
        this.gameModOn = true;
        this.electricityMeter.usedPower += this.power;
        this.power *= 2;
        console.log('Игровой режим - включен.');
    } else {
        console.log('Ошибка: Невозможно включить игровой режим, он уже включен.');
    }
}

// Метод для выключения "игрового режима".
Computer.prototype.disableGameMode = function() {
    if (this.gameModOn && this.powerOn) {
        this.gameModOn = false;
        this.electricityMeter.usedPower -= this.power / 2;
        this.power /= 2;
        console.log('Игровой режим - выключен.');
    } else {
        console.log('Ошибка: Невозможно выключить игровой режим, он и так выключен.');
    }
}

// Переопределяем родительский метод, что б при выключении компьютера выключался и "игровой режим".
Computer.prototype.powerSwitchOff = function() {
    if (this.powerOn) {
        if (this.gameModOn) {
            this.gameModOn = false;
            this.electricityMeter.usedPower -= this.power / 2;
            this.power /= 2;
            console.log('Игровой режим - выключен.');
        }
        this.powerOn = false;
        this.electricityMeter.usedPower -= this.power;
        console.log(`${this.name} - выключен.`);
    } else {
        console.log(`Ошибка: Вы не можете выключить ${this.name}, так как этот прибор уже выключен.`);
    }
}

// Функция-конструктор для приборов-ламп.
// Аргументы: Название прибора, количество лампочек, потребляемое электричество(одной лампочки), счетчик электричества.
function Lamp(name, countLightBulbs, power, electricityMeter) {
    this.name = name
    this.countLightBulbs = countLightBulbs
    this.power = power
    this.electricityMeter = electricityMeter
    this.maxLight = false
}

// Создаем делегирующую связь.
Lamp.prototype = new ElectricalDevices();

// Метод для включения одновременно всех лампочек.
Lamp.prototype.maxLightOn = function() {
    if (this.maxLight === false && this.powerOn) {
        this.maxLight = true;
        this.electricityMeter.usedPower += this.power * (this.countLightBulbs - 1);
        this.power *= this.countLightBulbs;
        console.log('Максимальный свет - включен.');
    } else {
        console.log('Ошибка: Невозможно включить максимальный свет, так он уже включен.');
    }
}

// Метод для выключения всех лампочек и при этом оставить работать только одну лампочку.
Lamp.prototype.maxLightOff = function() {
    if (this.maxLight  && this.powerOn) {
        this.maxLight = false;
        this.power /= this.countLightBulbs;
        this.electricityMeter.usedPower -= this.power * (this.countLightBulbs - 1);
        console.log('Максимальный свет - выключен.');
    } else {
        console.log('Ошибка: Невозможно выключить максимальный свет, так как он уже выключен.');
    }
}

// Создаем объект "Счетчик электричества".
const myElectricityMeter = new ElectricityMeter();

// Создаем объект "Персональный компьютер".
const personalComputer = new Computer('Персональный компьютер', 'PC', 250, myElectricityMeter);

// Создаем объект "Люстра".
const chandelier = new Lamp('Люстра', 4, 50, myElectricityMeter);

// Тесты.
myElectricityMeter.getUsedPower();
personalComputer.powerSwitchOn();
myElectricityMeter.getUsedPower();
chandelier.powerSwitchOn();
myElectricityMeter.getUsedPower();
personalComputer.enableGameMode();
myElectricityMeter.getUsedPower();
chandelier.maxLightOn();
myElectricityMeter.getUsedPower();
chandelier.maxLightOff();
myElectricityMeter.getUsedPower();
personalComputer.disableGameMode();
myElectricityMeter.getUsedPower();
chandelier.powerSwitchOff();
myElectricityMeter.getUsedPower();
personalComputer.powerSwitchOff();
myElectricityMeter.getUsedPower();