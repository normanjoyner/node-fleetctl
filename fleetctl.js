var _ = require("lodash");
var api = require([__dirname, "lib", "api"].join("/"));

function Fleetctl(config){
    this.configure(config || {});
}

Fleetctl.prototype.configure = function(config){
    this.binary = config.binary || "fleetctl";
}

_.each(api, function(method, name){
    Fleetctl.prototype[name] = method;
});

module.exports = Fleetctl;
