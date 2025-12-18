module.exports = class StaffingService {
    constructor() {
        this.staff = [];
    }

    hireNewStaff(...persons) {
        this.staff = persons;
    }

    hireMDStaff(movieDefinition) {
        this.staff.push(...movieDefinition.getActorsCollection());
        this.staff.push(...movieDefinition.getCameramanCollection());
    }

    getStaff() {
        return this.staff;
    }
}
