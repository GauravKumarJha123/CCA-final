const InsufficientBudgetException = require('../thirdparty/InsufficientBudgetException');
const BudgetInitializer = require('./BudgetInitializer');
const StaffHiringManager = require('./StaffHiringManager');
const FeasibilityChecker = require('./FeasibilityChecker');
const ProductionRunner = require('./ProductionRunner');
const MovieFinalizer = require('./MovieFinalizer');

module.exports = class MovieProductionCoordinator {
    constructor({
        financeService,
        staffingService,
        producingService,
        reportService,
        studioConfig
    }) {
        this.budgetInitializer = new BudgetInitializer(financeService, studioConfig);
        this.staffHiringManager = new StaffHiringManager(staffingService);
        this.feasibilityChecker = new FeasibilityChecker(financeService, staffingService, studioConfig);
        this.productionRunner = new ProductionRunner(producingService, financeService, staffingService);
        this.movieFinalizer = new MovieFinalizer(reportService, producingService, financeService, staffingService);
    }

    createMovie(recruiter, accountant, movieDefinition, movie) {
        // 1. Initialize budget
        this.budgetInitializer.initializeBudget(movieDefinition.getBudget());

        // 2. Hire initial staff
        this.staffHiringManager.hireInitialStaff(recruiter, accountant);

        // 3. Check feasibility
        if (!this.feasibilityChecker.canBeProduced(movieDefinition)) {
            throw new InsufficientBudgetException(
                'Movie cannot be produced - budget is insufficient'
            );
        }

        // 4. Hire movie production staff
        this.staffHiringManager.hireMovieStaff(movieDefinition.getMovieStaff());

        // 5. Run production
        const success = this.productionRunner.runProduction(movie, movieDefinition);

        // 6. Finalize movie
        if (success) {
            this.movieFinalizer.finalizeMovie(
                movie, 
                movieDefinition, 
                this.budgetInitializer.getInitialBudget()
            );
        }

        return movie;
    }
}