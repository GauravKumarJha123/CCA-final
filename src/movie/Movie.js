module.exports = class Movie {
    constructor(name, genre, staff) {
        this.name = name;
        this.genre = genre;
        this.isFinished = false;
        this.daysInProduction = 0;
        this.crew = {};
        this.superstars = [];
        this.setCrewFromStaffCollection(staff);
    }

    setCrewFromStaffCollection(crew) {
        Object.assign(this.crew, {
            'Actor': crew.getActorsCollection().length,
            'Cameraman': crew.getCameramanCollection().length
        })

        for (const actor of crew.getActorsCollection()) {
            if (actor.isSuperStar) {
                this.superstars.push(actor.getName());
            }
        }
    }

    getCrew() {
        return this.crew;
    }

    getSuperstars() {
        return this.superstars;
    }

    success() {
        this.isFinished = true;
    }

    updateContent() {
        this.daysInProduction++;
    }

    getName() {
        return this.name;
    }

    getGenre() {
        return this.genre;
    }

    toString() {
        return `Movie ${this.name} [${this.genre}], status: ${this.isFinished ? 'finished' : 'in production'}, days in production: ${this.daysInProduction}`;
    }

    fail() {
    this.isFinished = false;
    }

}
