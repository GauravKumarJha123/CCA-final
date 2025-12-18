module.exports = class StudioEmployee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        this.earnedMoney = 0;
    }

    getName() {
        return this.name;
    }

    getSalary() {
        return this.salary;
    }

    getEarnedMoney() {
        return this.earnedMoney;
    }

    paySalary(amount) {
        this.earnedMoney += amount;
    }
};
