const FinanceDepartment = require('./finance/FinanceDepartment');
const StaffingService = require('./staff/StaffingService');
const ProducingService = require('./movie/ProducingService');
const MovieProductionCoordinator = require('./movie/MovieProductionCoordinator');
const MovieReportPrinter = require('./movie/MovieReportPrinter');
const StudioConfig = require('./config/StudioConfig');
const Recruiter = require('./staff/Recruiter');
const Accountant = require('./staff/Accountant');
const Movie = require('./movie/Movie');

module.exports = class MovieStudio {
    constructor(financeService, staffingService, producingService, reportService) {
        // Dependency Injection with defaults
        this.financeService = financeService || new FinanceDepartment();
        this.staffingService = staffingService || new StaffingService();
        this.producingService = producingService || new ProducingService();
        this.reportService = reportService || new MovieReportPrinter();

        this.coordinator = new MovieProductionCoordinator({
            financeService: this.financeService,
            staffingService: this.staffingService,
            producingService: this.producingService,
            reportService: this.reportService,
            studioConfig: StudioConfig
        });

        this.reportService.printArchiveStatistics(
            this.producingService.loadMovieDatabase('film_archive.json')
        );
    }

    createMovie(recruiterName, accountantName, movieDefinition) {
        const movie = new Movie(
            movieDefinition.getMovieName(),
            movieDefinition.getMovieGenre(),
            movieDefinition.getMovieStaff()
        );

        const recruiter = new Recruiter(recruiterName);
        const accountant = new Accountant(accountantName);

        return this.coordinator.createMovie(
            recruiter,
            accountant,
            movieDefinition,
            movie
        );
    }
}