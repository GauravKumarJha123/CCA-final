const Accountant = require('../staff/Accountant');
const MovieBudget = require('./MovieBudget');

module.exports = class FinanceDepartment {
    decreaseBudget(paidSum) {
        this.movieBudget.setBudgetMoney(this.movieBudget.getBudgetMoney() - paidSum);
    }

    initBudget(initialSum) {
        this.movieBudget = new MovieBudget(initialSum);
    }

    paySalary(staffingService) {
        const accountant = staffingService.getStaff().find(person => person instanceof Accountant);
        if (accountant) {
            for (const person of staffingService.getStaff()) {
                accountant.pay(person, this);
            }
        }
    }

    getBudget() {
        return this.movieBudget.getBudgetMoney();
    }
}
