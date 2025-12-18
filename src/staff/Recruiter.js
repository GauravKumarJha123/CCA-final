const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');
const Accountant = require('./Accountant');
const CameraMan = require('./CameraMan');
const Actor = require('./Actor');
const NoSuchProfession = require('../thirdparty/NoSuchProfession');

module.exports = class Recruiter extends StudioEmployee {
    constructor(name) {
        super(name, Salaries.RECRUITER);
    }

    pay(person, financialService) {}

    act() {
        return false;
    }

    shoot() {
        return false;
    }

    hire(name, personType) {
        switch (personType.toLowerCase()) {
            case 'accountant': {
                return new Accountant(name);
            }
            case 'cameraman': {
                return new CameraMan(name);
            }
            case 'superstar': {
                return new Actor(name, true);
            }
            case 'actor': {
                return new Actor(name, false);
            }
            default:
                throw new NoSuchProfession(personType);
        }
    }
}
