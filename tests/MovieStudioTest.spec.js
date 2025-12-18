const assert = require('assert');

const MovieStudio = require('../src/MovieStudio');
const StudioStaff = require('../src/staff/team/StudioStaff');
const Actor = require('../src/staff/Actor');
const CameraMan = require('../src/staff/CameraMan');
const MovieDefinition = require('../src/movie/MovieDefinition');
const Genre = require('../src/thirdparty/Genre');
const InsufficientBudgetException = require('../src/thirdparty/InsufficientBudgetException');

describe('MovieStudio', () => {
    const movieStudio = new MovieStudio();
    const recruiterForTest = 'Andrew Carnegie';
    const accountantForTest = 'William Welch Deloitte';

    it('should create movie Titanic with valid movie definition', () => {
        const PRODUCTION_SCHEDULE = 160;
        const staff = new StudioStaff([
            new Actor('Leo DiCaprio', true), new Actor('Kate Winslet', true),
            new Actor('Billy Zane', false), new Actor('Kathy Bates', false),
            new Actor('Frances Fisher', false), new Actor('Bernard Hill', false),
            new Actor('Jonathan Hyde', false), new Actor('Danny Nucci', false),
            new Actor('David Warner', false), new Actor('Bill Paxton', false)
        ], [
            new CameraMan('Guy Norman Bee'),
            new CameraMan('Marcis Cole'),
            new CameraMan('Tony Guerin')
        ]);
        const budget = 150000000;
        const titanicMovie = new MovieDefinition(budget, 'Titanic', Genre.DRAMA, staff, PRODUCTION_SCHEDULE);
        const movie = movieStudio.createMovie(recruiterForTest, accountantForTest, titanicMovie);
        assert.equal(movie.isFinished, true);
    });

    it('should create movie StarWars with valid movie definition', () => {
        const PRODUCTION_SCHEDULE = 90;
        const staff = new StudioStaff([
            new Actor('Mark Hamill', true), new Actor('Harrison Ford', true),
            new Actor('Carrie Fischer', false), new Actor('Billy Dee Williams', false),
            new Actor('Anthony Daniels', false), new Actor('David Prowse', false),
            new Actor('Peter Mayhew', false)
        ], [
            new CameraMan('John Campbell'),
            new CameraMan('Bill Neil')
        ]);
        const budget = 50000000;
        const starWars3Movie = new MovieDefinition(budget, 'Star Wars: Episode VI – Return of the Jedi', Genre.SCIFI, staff, PRODUCTION_SCHEDULE);
        const movie = movieStudio.createMovie(recruiterForTest, accountantForTest, starWars3Movie);
        assert.equal(movie.isFinished, true);
    });

    it('should create Empty Movie with Empty movie definition', () => {
        const PRODUCTION_SCHEDULE = 1;
        const staff = new StudioStaff([], []);
        const budget = 1;
        const emptyMovie = new MovieDefinition(budget, 'Noname', Genre.COMEDY, staff, PRODUCTION_SCHEDULE);
        const movie = movieStudio.createMovie(recruiterForTest, accountantForTest, emptyMovie);
        assert.equal(movie.isFinished, true);
    });

    it('should fail create movie when budget exceeds', () => {
        const PRODUCTION_SCHEDULE = 200;
        const staff = new StudioStaff([
            new Actor('Taylor Kitsch', false),
            new Actor('Lynn Collins', false),
            new Actor('Samantha Morton', false),
            new Actor('Mark Strong', true),
            new Actor('Ciarán Hinds', false),
            new Actor('Dominic West', false),
            new Actor('James Purefoy', false),
            new Actor('Willem Dafoe', true)
        ], [
            new CameraMan('Carver Christians'),
            new CameraMan('Scott Bourke'),
            new CameraMan('Quentin Herriot'),
            new CameraMan('Brandon Wyman')
        ]);
        const budget = 100000000;
        const johnCarterMovie = new MovieDefinition(budget, 'John Carter', Genre.FANTASY, staff, PRODUCTION_SCHEDULE);
        const movie = movieStudio.createMovie(recruiterForTest, accountantForTest, johnCarterMovie);
        assert.equal(movie.isFinished, false);
    });

    it('should throw InsufficientBudgetException when Insufficient Budget', () => {
        const PRODUCTION_SCHEDULE = 250;
        const staff = new StudioStaff([
            new Actor('Channing Tatum', true),
            new Actor('Taylor Kitsch', true),
            new Actor('Keanu Reeves', true),
            new Actor('Josh Holloway', true),
            new Actor('Léa Seydoux', true),
            new Actor('Hugh Jackman', true),
            new Actor('Rebecca Ferguson', false),
            new Actor('Abbey Leee', true)
        ], [
            new CameraMan('Carver Christians'),
            new CameraMan('Scott Bourke'),
            new CameraMan('Quentin Herriot'),
            new CameraMan('Brandon Wyman')
        ]);
        const budget = 100000000;
        const johnCarterMovie = new MovieDefinition(budget, 'Gambit', Genre.FANTASY, staff, PRODUCTION_SCHEDULE);
        assert.throws(() => movieStudio.createMovie(recruiterForTest, accountantForTest, johnCarterMovie), InsufficientBudgetException);
    });
});
