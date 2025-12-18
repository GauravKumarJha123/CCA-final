module.exports = class MovieBudget {
    constructor(budgetMoney) {
        this.budgetMoney = budgetMoney;
    }

    getBudgetMoney() {
        return this.budgetMoney;
    }

    setBudgetMoney(budgetMoney) {
        this.budgetMoney = budgetMoney;
    }
}
