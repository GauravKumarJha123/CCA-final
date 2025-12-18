module.exports = class MovieReportPrinter {
    printProducedMovieStatistics(movieDefinition, staffingService, budgetLeft, initialBudget) {
        const budgetSpent = initialBudget - budgetLeft;
        console.log(`Budget: ${initialBudget} initial, ${budgetSpent} spent, ${budgetLeft} economy`);

        staffingService.getStaff().forEach(person => {
            console.log(
              `${person.constructor.name}: '${person.getName()}', earned money: ${person.getEarnedMoney()}, salary: ${person.getSalary()}`
            );
        });
    }

    printArchiveStatistics(movieStatistics) {
        if (!movieStatistics.isEmpty()) {
            console.log(
              `Total: ${movieStatistics.getTotalActors()} actors, ${movieStatistics.getTotalCameramen()} cameramen`
            );
        }
    }
};