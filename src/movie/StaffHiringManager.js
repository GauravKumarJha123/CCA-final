module.exports = class StaffHiringManager {
    constructor(staffingService) {
        this.staffingService = staffingService;
    }

    hireInitialStaff(recruiter, accountant) {
        this.staffingService.hireNewStaff(recruiter, accountant);
    }

    hireMovieStaff(movieStaff) {
        this.staffingService.hireMDStaff(movieStaff);
    }
}