const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');
const StaffRegistry = require('./StaffRegistry');

module.exports = class Recruiter extends StudioEmployee {
    constructor(name) {
        super(name, Salaries.RECRUITER);
    }

    canHireStaff() {
        return true;
    }

    hire(name, personType) {
        const creator = StaffRegistry[personType.toLowerCase()];
        if (!creator) {
            throw new Error(`No such profession: ${personType}`);
        }
        return creator(name);
    }
}