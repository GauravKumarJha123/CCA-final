const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');

module.exports = class CameraMan extends StudioEmployee {
    constructor(name) {
        super(name, Salaries.CAMERA_MAN);
    }

    canPerform() {
        return true;
    }

    act() {
        return true;
    }

    shoot() {
        return parseFloat(Math.random().toFixed(2)) > 0.04;
    }
}