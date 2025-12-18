module.exports = class MovieDefinition {
    constructor(budget, movieName, movieGenre, movieStudioStaff, daysInProduction) {
        this.budget = budget;
        this.movieName = movieName;
        this.movieGenre = movieGenre;
        this.movieStudioStaff = movieStudioStaff;
        this.daysInProduction = daysInProduction;
    }

    getBudget() {
        return this.budget;
    }

    getMovieName() {
        return this.movieName;
    }

    getMovieGenre() {
        return this.movieGenre;
    }

    getMovieStaff() {
        return this.movieStudioStaff;
    }

    getProductionScheduleDaysCount() {
        return this.daysInProduction;
    }
}
