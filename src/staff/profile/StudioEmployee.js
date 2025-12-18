module.exports = class StudioEmployee {
    constructor(name, initialSalary) {
        this.name = name;
        this.salary = initialSalary;
        this.earnedMoney = 0; // total amount of earned money
    }

    getEarnedMoney() {
        return this.earnedMoney;
    }

    getName() {
        return this.name;
    }

    getSalary() {
        return this.salary;
    }

    paySalary(paidSum) {
        this.earnedMoney += paidSum;
    }
}
