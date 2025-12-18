class StaffFactory {
    constructor() {
        this.registry = {};
    }

    register(role, clazz) {
        this.registry[role.toLowerCase()] = clazz;
    }

    create(role, name) {
        const Clazz = this.registry[role.toLowerCase()];
        if (!Clazz) {
            throw new Error(`No such profession: ${role}`);
        }
        return new Clazz(name);
    }
}

module.exports = StaffFactory;
