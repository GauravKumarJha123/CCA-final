const FinanceDepartment = require('./finance/FinanceDepartment');
const StaffingService = require('./staff/StaffingService');
const ProducingService = require('./movie/ProducingService');
const Recruiter = require('./staff/Recruiter');
const Accountant = require('./staff/Accountant');
const Actor = require('./staff/Actor');
const CameraMan = require('./staff/CameraMan');
const InsufficientBudgetException = require('./thirdparty/InsufficientBudgetException');
const Movie = require('./movie/Movie');

const INITIAL_BUDGET = 1000000;
const POTENTIAL_RISK = 15; // percent

module.exports = class MovieStudio {
    constructor() {
        this.financialService = new FinanceDepartment();
        this.staffingService = new StaffingService();
        this.producingService = new ProducingService();
        this.printMovieArchiveStatistics(this.producingService.loadMovieDatabase('film_archive.json'));
    }

    createMovie(recruiterName, accountantName, movieDefinition) {
        const movie = new Movie(
            movieDefinition.getMovieName(),
            movieDefinition.getMovieGenre(),
            movieDefinition.getMovieStaff()
        );
        this.financialService.initBudget(INITIAL_BUDGET + movieDefinition.getBudget());
        this.staffingService.hireNewStaff(
            new Recruiter(recruiterName),
            new Accountant(accountantName)
        );

        if (
            this.canBeProduced(
                this.financialService.getBudget(),
                movieDefinition.getProductionScheduleDaysCount(),
                this.staffingService
            )
        ) {
            this.staffingService.hireMDStaff(movieDefinition.getMovieStaff());
            this.producingService.initMovieProduction(movieDefinition.getProductionScheduleDaysCount());

            while (this.producingService.hasNextWorkingDay()) {
                // produce a movie
                if (this.producingService.lightsCameraAction(this.staffingService)) {
                    this.producingService.progress();
                }
                movie.updateContent();
                // pay salary to every member of a team
                try {
                    this.financialService.paySalary(this.staffingService);
                } catch (e) {
                    console.log(`Movie production failed. Budget is over. Current progress is ${
                        parseFloat((1 - this.producingService.getProgress() * 1.0 / movieDefinition.getProductionScheduleDaysCount()) * 100).toFixed(2)
                    }`);
                    return movie;
                }

            }

            movie.success();
            this.printProducedMovieStatistics(movieDefinition);
            this.producingService.addMovieToArchive(movie);
        } else {
            throw new InsufficientBudgetException('Movie cannot be produced - budget is insufficient');
        }

        return movie;
    }

    printProducedMovieStatistics(movieDefinition) {
        const budgetSpent = movieDefinition.getBudget() + INITIAL_BUDGET - this.financialService.getBudget();
        console.log(`Budget: ${movieDefinition.getBudget() + INITIAL_BUDGET} initial, ${budgetSpent} spent, ${this.financialService.getBudget()} economy`);

        this.staffingService.getStaff().forEach(person => {
            if (person instanceof Actor) {
                console.log(`Actor: '${person.getName()}', earned money: ${person.getEarnedMoney()}, salary: ${person.getSalary()}`);
                return;
            }
            if (person instanceof CameraMan) {
                console.log(`Cameraman: '${person.getName()}', earned money: ${person.getEarnedMoney()}, salary: ${person.getSalary()}`);
                return;
            }
            if (person instanceof Accountant) {
                console.log(`Accountant: '${person.getName()}', earned money: ${person.getEarnedMoney()}, salary: ${person.getSalary()}`);
                return;
            }
            console.log(`Recruiter: '${person.getName()}', earned money: ${person.getEarnedMoney()}, salary: ${person.getSalary()}`);
        });
    }

    printMovieArchiveStatistics(movieStatistics) {
        if (!movieStatistics.isEmpty()) {
            console.log(`Total: ${movieStatistics.getTotalActors()} actors, ${movieStatistics.getTotalCameramen()} cameramen, superstars: [${movieStatistics.getSuperstars().join(", ")}]`);
        }
    }

    canBeProduced(proposedBudget, daysInProduction, staffingService) {
        const estimatedBudget = staffingService.getStaff()
            .map(employee => employee.getSalary())
            .reduce((acc, salary) => acc + salary * daysInProduction * Math.round(100.0 + POTENTIAL_RISK / 100.0), 0);
        return proposedBudget >= estimatedBudget;
    }
}
