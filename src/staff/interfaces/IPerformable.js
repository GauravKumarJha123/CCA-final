module.exports = class IPerformable {
    act() {
        throw new Error('act() must be implemented');
    }

    shoot() {
        throw new Error('shoot() must be implemented');
    }

    canPerform() {
        return true;
    }
}