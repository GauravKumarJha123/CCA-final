const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');
const Accountant = require('./Accountant');
const CameraMan = require('./CameraMan');
const Actor = require('./Actor');
const NoSuchProfession = require('../thirdparty/NoSuchProfession');
const AdministrativeStaff = require('./AdministrativeStaff');
const staffRegistry = require('./StaffRegistry');


module.exports = class Recruiter extends StudioEmployee {
    constructor(name, staffFactory) {
    super(name, Salaries.RECRUITER);
    this.staffFactory = staffFactory;
    }

    // pay(person, financialService) {}

    // act() {
    //     return false;
    // }

    // shoot() {
    //     return false;
    // }

    hire(name, personType) {
    const creator = StaffRegistry[personType.toLowerCase()];
    if (!creator) {
        throw new Error(`No such profession: ${personType}`);
    }
    return creator(name);
    }
}
