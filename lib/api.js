var _ = require("lodash");
var executor = require([__dirname, "executor"].join("/"));
var utils = require([__dirname, "utils"].join("/"));

module.exports = {

    list_machines: function(fn){
        var sub_command = ["list-machines", "--full", "--no-legend"].join(" ");

        executor.execute(this.binary, sub_command, function(err, response){
            var machines = [];

            if(_.isNull(err)){
                _.each(response.split("\n"), function(line){
                    var parsed = _.map(line.split("\t"), function(value){
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

        executor.execute(this.binary, sub_command, function(err, response){
            var units = [];

            if(_.isNull(err)){
                _.each(response.split("\n"), function(line){
                    if(_.isEmpty(line))
                        return;
                    var parsed = _.map(line.split("\t"), function(value){
                        if(value == "-")
                            return null;
                        else
                            return value;
                    });
                    if(parsed.length == 7){
                        var machine = [null, null];
                        if(!_.isNull(parsed[5]))
                            machine = parsed[5].split("/");

                        var unit = {
                            unit: parsed[0],
                            state: parsed[1],
                            load: parsed[2],
                            active: parsed[3],
                            sub: parsed[4],
                            desc: parsed[5],
                            machine: machine[0],
                            ip: machine[1]
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

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    },

    start: function(units, options, fn){
        if(_.isFunction(options)){
            fn = options;
            options = {};
        }

        if (_.isArray(units))
            units = units.join(" ");

        var sub_command = ["start", units].join(" ");
        options = _.map(options, function(value, option){
            return [["", option].join("-"), value].join("=");
        }).join(" ");

        subcommand = [subcommand, options].join(" ");

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    },

    stop: function(units, fn){
        if (_.isArray(units))
            units = units.join(" ");

        var sub_command = ["stop", units].join(" ");

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    },

    destroy: function(units, fn){
        if (_.isArray(units))
            units = units.join(" ");

        var sub_command = ["destroy", units].join(" ");

        executor.execute(this.binary, sub_command, function(err, response){
            fn(err);
        });
    }
}
