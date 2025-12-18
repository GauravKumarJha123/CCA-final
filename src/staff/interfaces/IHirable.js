module.exports = class IHirable {
    hire(name, personType) {
        throw new Error('hire() must be implemented');
    }

    canHireStaff() {
        return true;
    }
}