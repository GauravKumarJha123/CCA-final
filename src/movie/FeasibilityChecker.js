module.exports = class FeasibilityChecker {
    constructor(financeService, staffingService, studioConfig) {
        this.financeService = financeService;
        this.staffingService = staffingService;
        this.studioConfig = studioConfig;
    }

    canBeProduced(movieDefinition) {
        const estimatedCost = this.estimateProductionCost(movieDefinition);
        return this.financeService.getBudget() >= estimatedCost;
    }

    estimateProductionCost(movieDefinition) {
        const days = movieDefinition.getProductionScheduleDaysCount();
        const riskFactor = 1 + this.studioConfig.POTENTIAL_RISK_PERCENT / 100;

        const studioDailyCost = this.calculateStudioDailyCost();
        const movieDailyCost = this.calculateMovieDailyCost(movieDefinition);

        return (studioDailyCost + movieDailyCost) * days * riskFactor;
    }

    calculateStudioDailyCost() {
        return this.staffingService.getStaff().reduce(
            (sum, person) => sum + person.getSalary(),
            0
        );
    }

    calculateMovieDailyCost(movieDefinition) {
        const Salaries = require('../thirdparty/Salaries');
        const movieStaff = movieDefinition.getMovieStaff();

        return (
            movieStaff.getActorsCollection().length * Salaries.ACTOR +
            movieStaff.getCameramanCollection().length * Salaries.CAMERA_MAN
        );
    }
}