const Salaries = require('../thirdparty/Salaries');
const StudioEmployee = require('./profile/StudioEmployee');

module.exports = class Actor extends StudioEmployee {
    constructor(name, isSuperStar) {
        super(name, Salaries.ACTOR);
        this.isSuperStar = isSuperStar;
    }

    canPerform() {
        return true;
    }

    act() {
        const generalSuccessChance = parseFloat(Math.random().toFixed(2)) > 0.04;
        const superStarSuccessChance = parseFloat(Math.random().toFixed(2)) > 0.01;
        return this.isSuperStar ? superStarSuccessChance : generalSuccessChance;
    }

    shoot() {
        return true;
    }
}