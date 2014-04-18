var _ = require("lodash");
var executor = require([__dirname, "executor"].join("/"));
var utils = require([__dirname, "utils"].join("/"));

module.exports = {

    list_machines: function(fn){
        var sub_command = ["list-machines", "--full", "--no-legend"].join(" ");

        executor.execute(this.binary, sub_command, function(err, stdout, stderr){
            var machines = [];

            if(err || stderr){
                if(!err)
                    err = new Error(stderr);

                fn(err);
            }
            else{
                _.each(stdout.split("\n"), function(line){
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

    destroy: function(target, fn) {
        if (_.isArray(target))
            target = target.join(" ");

        var sub_command = ["destroy", target].join(" ");

        executor.execute(this.binary, sub_command, function(err, stdout, stderr) {
            if (err || stderr) {
                if (!err) {
                    err = new Error(stderr);
                }
            }
            fn(err);
        });
    }
}
