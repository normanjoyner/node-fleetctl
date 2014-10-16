var exec = require('child_process').exec;

module.exports = {

    execute: function(binary, global_options, sub_command, fn){
        exec([binary, global_options, sub_command].join(" "), function(err, stdout, stderr){
            if(err || stderr){
                if(!err)
                    err = new Error(stderr);
            }

            fn(err, stdout);
        });
    }

}
