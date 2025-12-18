module.exports = class BudgetInitializer {
    constructor(financeService, studioConfig) {
        this.financeService = financeService;
        this.studioConfig = studioConfig;
        this.initialBudget = 0;
    }

    initializeBudget(movieBudget) {
        this.initialBudget = this.studioConfig.INITIAL_BUDGET + movieBudget;
        this.financeService.initBudget(this.initialBudget);
    }

    getInitialBudget() {
        return this.initialBudget;
    }
}