const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');

module.exports = class CameraMan extends StudioEmployee {
    constructor(name) {
        super(name, Salaries.CAMERA_MAN);
    }

    pay(person, financialService) {}

    act() {
        return true;
    }

    shoot() {
        // like an actor, cameraman with 5% probability may ruin the whole day
        return parseFloat(Math.random().toFixed(2)) > 0.04;
    }

    hire(name, personType) {
        return null;
    }
}
