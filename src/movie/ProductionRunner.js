module.exports = class ProductionRunner {
    constructor(producingService, financeService, staffingService) {
        this.producingService = producingService;
        this.financeService = financeService;
        this.staffingService = staffingService;
    }

    runProduction(movie, movieDefinition) {
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
                return false;
            }
        }

        movie.success();
        return true;
    }
}