// Класс-конструктор для счётчика электричества.
class ElectricityMeter {
    constructor() {
        this.usedPower = 0;
    }

    // Метод для вывода текущего потребления электричества.
    getUsedPower = function() {
        console.log(`Потребление электричества составляет ${this.usedPower} Вт/час`);
    }
}

// Класс-конструктор для электроприборов.
// Аргументы: название прибора, сколько прибор употребляет электричества и к какому счетчику подключается.
class ElectricalDevices {
    constructor(name, power, electricityMeter) {
        this.name = name;
        this.power = power;
        this.electricityMeter = electricityMeter;
        this.powerOn = false;
    }

    // Метод подключения прибора к электросети.
    powerSwitchOn = function() {
        if (this.powerOn === false) {
            this.powerOn = true;
            this.electricityMeter.usedPower += this.power;
            console.log(`${this.name} - включен.`);
        } else {
            console.log(`Ошибка: Вы не можете включить ${this.name}, так как этот прибор уже включен.`);
        }
    }

    // Метод отключения прибора от электросети.
    powerSwitchOff = function() {
        if (this.powerOn) {
            this.powerOn = false;
            this.electricityMeter.usedPower -= this.power;
            console.log(`${this.name} - выключен.`);
        } else {
            console.log(`Ошибка: Вы не можете выключить ${this.name}, так как этот прибор уже выключен.`);
        }
    }
}

// Класс-конструктор для приборов-компьютеров с делегирующей связью.
// Аргументы: название компьютера, тип компьютера, количество потребляемого электричества и счетчик электричества.
class Computer extends ElectricalDevices {
    constructor(name, type, power, electricityMeter) {
        super(name, power, electricityMeter);
        this.type = type;
        this.gameModOn = false;
    }

    // Метод для включения у компьютера "игрового режима", который потребляет в два раза больше электричества.
    enableGameMode = function() {
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
    disableGameMode = function() {
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
    powerSwitchOff = function() {
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
}

// Класс-конструктор для приборов-ламп с делегирующей связью.
// Аргументы: Название прибора, количество лампочек, потребляемое электричество(одной лампочки), счетчик электричества.
class Lamp extends ElectricalDevices {
    constructor(name, countLightBulbs, power, electricityMeter) {
        super(name, power, electricityMeter);
        this.countLightBulbs = countLightBulbs;
        this.maxLight = false;
    }

    // Метод для включения одновременно всех лампочек.
    maxLightOn = function() {
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
    maxLightOff = function() {
        if (this.maxLight  && this.powerOn) {
            this.maxLight = false;
            this.power /= this.countLightBulbs;
            this.electricityMeter.usedPower -= this.power * (this.countLightBulbs - 1);
            console.log('Максимальный свет - выключен.');
        } else {
            console.log('Ошибка: Невозможно выключить максимальный свет, так как он уже выключен.');
        }
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