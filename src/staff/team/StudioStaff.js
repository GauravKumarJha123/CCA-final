module.exports = class StudioStaff {
    constructor(actorsCollection, cameramanCollection) {
        this.actorsCollection = actorsCollection;
        this.cameramanCollection = cameramanCollection;
    }

    getActorsCollection() {
        return this.actorsCollection;
    }

    getCameramanCollection() {
        return this.cameramanCollection;
    }
}
