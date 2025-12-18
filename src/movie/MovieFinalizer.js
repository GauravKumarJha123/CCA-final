module.exports = class MovieFinalizer {
    constructor(reportService, producingService, financeService, staffingService) {
        this.reportService = reportService;
        this.producingService = producingService;
        this.financeService = financeService;
        this.staffingService = staffingService;
    }

    finalizeMovie(movie, movieDefinition, initialBudget) {
        this.reportService.printProducedMovieStatistics(
            movieDefinition,
            this.staffingService,
            this.financeService.getBudget(),
            initialBudget
        );

        this.producingService.addMovieToArchive(movie);
    }
}