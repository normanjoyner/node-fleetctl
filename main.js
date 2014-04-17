var _ = require("lodash");
var Fleetctl = require([__dirname, "fleetctl"].join("/"));
var pkg = require([__dirname, "package"].join("/"));

exports = module.exports = function(config){
    var fleetctl = new Fleetctl(config);
    fleetctl.version = pkg.version;
    return fleetctl;
}
