const Salaries = require('../thirdparty/Salaries');
const BudgetIsOverException = require('../thirdparty/BudgetIsOverException');
const StudioEmployee = require('./profile/StudioEmployee');

module.exports = class Accountant extends StudioEmployee {
    constructor(name) {
        super(name, Salaries.ACCOUNTANT);
    }

    pay(person, financialService) {
        const salary = person.getSalary();
        person.paySalary(salary);
        if ((financialService.getBudget() - salary) < 0) {
            financialService.initBudget(0);
            throw new BudgetIsOverException();
        }
        financialService.decreaseBudget(salary);
    }

    act() {
        return false;
    }

    shoot() {
        return false;
    }

    hire(name, personType) {
        return null;
    }
}
