module.exports = class NoSuchProfession extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoSuchProfession';
    }
}
