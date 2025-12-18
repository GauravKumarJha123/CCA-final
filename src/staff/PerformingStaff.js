const StudioEmployee = require('./profile/StudioEmployee');

module.exports = class PerformingStaff extends StudioEmployee {
    act() {
        throw new Error('act() must be implemented');
    }

    shoot() {
        throw new Error('shoot() must be implemented');
    }
};
