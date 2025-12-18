module.exports = class IPayable {
    pay(person, financialService) {
        throw new Error('pay() must be implemented');
    }

    canManageFinances() {
        return true;
    }
}