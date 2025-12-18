module.exports = class InsufficientBudgetException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InsufficientBudgetException';
    }
}
