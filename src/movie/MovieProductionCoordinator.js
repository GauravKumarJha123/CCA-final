const InsufficientBudgetException = require('../thirdparty/InsufficientBudgetException');

module.exports = class MovieProductionCoordinator {
    constructor({
        financeService,
        staffingService,
        producingService,
        reportService,
        studioConfig
    }) {
        this.financeService = financeService;
        this.staffingService = staffingService;
        this.producingService = producingService;
        this.reportService = reportService;
        this.config = studioConfig;
    }

    createMovie(recruiter, accountant, movieDefinition, movie) {
        // 1. Init budget
        const initialBudget =
            this.config.INITIAL_BUDGET + movieDefinition.getBudget();

        this.financeService.initBudget(initialBudget);

        // 2. Hire studio staff
        this.staffingService.hireNewStaff(recruiter, accountant);

        // 3. Feasibility check (FAIL FAST)
        if (!this.canBeProduced(movieDefinition)) {
            throw new InsufficientBudgetException(
                'Movie cannot be produced - budget is insufficient'
            );
        }

        // 4. Hire movie staff
        this.staffingService.hireMDStaff(movieDefinition.getMovieStaff());

        // 5. Start production
        this.producingService.initMovieProduction(
            movieDefinition.getProductionScheduleDaysCount()
        );

        while (this.producingService.hasNextWorkingDay()) {
            if (this.producingService.lightsCameraAction(this.staffingService)) {
                this.producingService.progress();
            }

            movie.updateContent();

            try {
                this.financeService.paySalary(this.staffingService);
            } catch (e) {
                movie.fail();
                return movie;
            }
        }

        // 6. Success path
        movie.success();

        // 7. Reporting + archive
        this.reportService.printProducedMovieStatistics(
            movieDefinition,
            this.staffingService,
            this.financeService.getBudget(),
            initialBudget
        );

        this.producingService.addMovieToArchive(movie);

        return movie;
    }

    canBeProduced(movieDefinition) {
        const estimatedCost = this.estimateProductionCost(movieDefinition);
        return this.financeService.getBudget() >= estimatedCost;
    }

    estimateProductionCost(movieDefinition) {
        const days = movieDefinition.getProductionScheduleDaysCount();
        const riskFactor = 1 + this.config.POTENTIAL_RISK_PERCENT / 100;

        const staff = this.staffingService.getStaff();
        const studioDailyCost = staff.reduce(
            (sum, p) => sum + p.getSalary(),
            0
        );

        const movieStaff = movieDefinition.getMovieStaff();
        const Salaries = require('../thirdparty/Salaries');

        const movieDailyCost =
            movieStaff.getActorsCollection().length * Salaries.ACTOR +
            movieStaff.getCameramanCollection().length * Salaries.CAMERA_MAN;

        return (studioDailyCost + movieDailyCost) * days * riskFactor;
    }
};
