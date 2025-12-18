module.exports = class MovieStatistics {
    constructor() {
        this.movieGenres = {};
        this.totalActors = 0;
        this.totalCameramen = 0;
        this.superstars = [];
    }

    isEmpty() {
        return this.totalActors + this.totalCameramen + this.superstars.length > 0;
    }

    getGenres() {
        return this.movieGenres;
    }

    getSuperstars() {
        return this.superstars;
    }

    incActorsCount(actorsCount) {
        this.totalActors += actorsCount;
    }

    incCameramenCount(cameramenCount) {
        this.totalCameramen += cameramenCount;
    }

    getTotalActors() {
        return this.totalActors;
    }

    getTotalCameramen() {
        return this.totalCameramen;
    }

    addSuperStars(superstars) {
        this.superstars.push(...superstars);
    }
}
