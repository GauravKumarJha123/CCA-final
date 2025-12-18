module.exports = class MovieProductionSchedule {
    constructor(daysInProduction) {
        this.daysInProduction = daysInProduction;
    }

    getDaysSpentOnProduction() {
        return this.daysInProduction;
    }

    setDaysInProduction(daysInProduction) {
        this.daysInProduction = daysInProduction;
    }
}
