const Actor = require('./Actor');
const CameraMan = require('./CameraMan');
const Accountant = require('./Accountant');

module.exports = {
    actor: name => new Actor(name, false),
    superstar: name => new Actor(name, true),
    cameraman: name => new CameraMan(name),
    accountant: name => new Accountant(name)
};