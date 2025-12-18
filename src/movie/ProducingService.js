const fs = require('fs');
const path = require('path');
const MovieStatistics = require('./MovieStatistics');
const MovieProductionSchedule = require('./MovieProductionSchedule');
const Actor = require('../staff/Actor');
const CameraMan = require('../staff/CameraMan');

module.exports = class ProducingService {
    constructor() {
        this.movieArchive = [];
    }

    loadMovieDatabase(fileName) {
        this.movieArchive = [];
        const filePath = path.join(__dirname, '..', 'resources', fileName);
        const resource = fs.readFileSync(filePath, 'utf8');
        try {
            const movies = JSON.parse(resource); // JSON PARse data
            for (const movie of movies) {
                this.addMovieToArchive(movie);
            }
            return this.getArchiveStatistics();
        } catch (e) {
            console.log('Movie archive is damaged or empty');
            return new MovieStatistics([]);
        }
    }

    getArchiveStatistics() {
        const movieStatistics = new MovieStatistics(this.movieArchive);

        console.log(`Movies in archive: ${this.movieArchive.length}`);
        this.movieArchive.forEach(movie => {
            const currentMovieGenre = movie.getGenre();
            movieStatistics.getGenres()[currentMovieGenre] = movieStatistics.getGenres()[currentMovieGenre] || 1;
            movieStatistics.incActorsCount(movie.getCrew()['Actor']);
            movieStatistics.incCameramenCount(movie.getCrew()['Cameraman']);
            movieStatistics.addSuperStars(movie.getSuperstars());
        });
        return movieStatistics;
    }

    addMovieToArchive(movie) {
        this.movieArchive.push(movie);
    }

    initMovieProduction(daysInProduction) {
        this.productionSchedule = new MovieProductionSchedule(daysInProduction);
    }

    hasNextWorkingDay() {
        return this.productionSchedule.getDaysSpentOnProduction() > 0;
    }

    progress() {
        this.productionSchedule.setDaysInProduction(this.productionSchedule.getDaysSpentOnProduction() - 1);
    }

    // returns true if producing day is a success
    lightsCameraAction(staffingService) {
        const staff = staffingService.getStaff();
        return staff.filter(person => person instanceof Actor || person instanceof CameraMan)
            .map(person => person.act() && person.shoot())
            .reduce((crewSuccess, crewAction) => crewSuccess && crewAction, true);
    }

    getProgress() {
        return this.productionSchedule.getDaysSpentOnProduction();
    }
}
