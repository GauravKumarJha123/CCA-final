module.exports = class BudgetIsOverException extends Error {
    constructor(message) {
        super(message);
        this.name = 'BudgetIsOverException';
    }
}
