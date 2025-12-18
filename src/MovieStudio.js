const FinanceDepartment = require('./finance/FinanceDepartment');
const StaffingService = require('./staff/StaffingService');
const ProducingService = require('./movie/ProducingService');
const Recruiter = require('./staff/Recruiter');
const Accountant = require('./staff/Accountant');
const Movie = require('./movie/Movie');

const MovieProductionCoordinator = require('./movie/MovieProductionCoordinator');
const MovieReportPrinter = require('./movie/MovieReportPrinter');
const StudioConfig = require('./config/StudioConfig');

module.exports = class MovieStudio {
    constructor() {
        const financeService = new FinanceDepartment();
        const staffingService = new StaffingService();
        const producingService = new ProducingService();
        const reportService = new MovieReportPrinter();

        this.coordinator = new MovieProductionCoordinator({
            financeService,
            staffingService,
            producingService,
            reportService,
            studioConfig: StudioConfig
        });

        // archive printing delegated
        reportService.printArchiveStatistics(
            producingService.loadMovieDatabase('film_archive.json')
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
};
