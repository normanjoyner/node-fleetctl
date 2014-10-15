var _ = require("lodash");
var executor = require([__dirname, "executor"].join("/"));
var utils = require([__dirname, "utils"].join("/"));

module.exports = {

    list_machines: function(fn){
        var sub_command = ["list-machines", "--full", "--no-legend"].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            var machines = [];

            if(_.isNull(err)){
                _.each(response.split("\n"), function(line){
                    var parsed = _.map(line.replace(/\t+/g, "\t").split("\t"), function(value){
                        if(value == "-")
                            return null;
                        else
                            return value;
                    });
                    if(parsed.length == 3){
                        var machine = {
                            machine: parsed[0],
                            ip: parsed[1],
                            metadata: utils.kv_to_obj(parsed[2])
                        }
                        machines.push(machine);
                    }
                });
            }

            fn(err, machines);
        });
    },

    list_units: function(fn){
        var sub_command = ["list-units", "--full", "--no-legend"].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            var units = [];

            if(_.isNull(err)){
                _.each(response.split("\n"), function(line){
                    if(_.isEmpty(line))
                        return;
                    var parsed = _.map(line.replace(/\t+/g, "\t").split("\t"), function(value){
                        if(value == "-")
                            return null;
                        else
                            return value;
                    });
                    if(parsed.length == 4){
                        var machine = [null, null];
                        if(!_.isNull(parsed[1]))
                            machine = parsed[1].split("/");

                        var unit = {
                            unit: parsed[0],
                            machine: parsed[1],
                            active: parsed[2],
                            sub: parsed[3],
                            machineId: machine[0],
                            machineIp: machine[1]
                        }
                        units.push(unit);
                    }
                });
            }

            fn(err, units);
        });
    },

    list_unit_files: function(fn){
        var sub_command = ["list-unit-files", "--full", "--no-legend"].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            var units = [];

            if(_.isNull(err)){
                _.each(response.split("\n"), function(line){
                    if(_.isEmpty(line))
                        return;
                    var parsed = _.map(line.replace(/\t+/g, "\t").split("\t"), function(value){
                        if(value == "-")
                            return null;
                        else
                            return value;
                    });
                    if(parsed.length == 5){
                        var machine = [null, null];
                        if(!_.isNull(parsed[4]))
                            machine = parsed[4].split("/");

                        var unit = {
                            unit: parsed[0],
                            hash: parsed[1],
                            dState: parsed[2],
                            state: parsed[3],
                            target: parsed[4],
                            machineId: machine[0],
                            machineIp: machine[1]
                        }
                        units.push(unit);
                    }
                });
            }

            fn(err, units);
        });
    },

    submit: function(units, fn){
        if (_.isArray(units))
            units = units.join(" ");

        var sub_command = ["submit", units].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    },

    load: function(units, options, fn){
        if (_.isArray(units))
            units = units.join(" ");

        if (_.isArray(options))
            options = options.join(" ");
        else if (_.isFunction(options))
            fn = options, options = "";
        else if (_.isNull(options))
            options = "";

        var sub_command = ["load", options, units].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    },

    unload: function(units, options, fn){
        if (_.isArray(units))
            units = units.join(" ");

        if (_.isArray(options))
            options = options.join(" ");
        else if (_.isFunction(options))
            fn = options, options = "";
        else if (_.isNull(options))
            options = "";

        var sub_command = ["unload", options, units].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    },

    start: function(units, options, fn){
        if (_.isArray(units))
            units = units.join(" ");

        if (_.isArray(options))
            options = options.join(" ");
        else if (_.isFunction(options))
            fn = options, options = "";
        else if (_.isNull(options))
            options = "";

        var sub_command = ["start", options, units].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    },

    stop: function(units, options, fn){
        if (_.isArray(units))
            units = units.join(" ");

        if (_.isArray(options))
            options = options.join(" ");
        else if (_.isFunction(options))
            fn = options, options = "";
        else if (_.isNull(options))
            options = "";

        var sub_command = ["stop", options, units].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    },

    destroy: function(units, fn){
        if (_.isArray(units))
            units = units.join(" ");

        var sub_command = ["destroy", units].join(" ");
        if(this.tunnel) {
            var tunnel = "--tunnel="+this.tunnel+" ";
            sub_command = tunnel.concat(sub_command);
        }

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    }
}
