var exec = require('child_process').exec;

module.exports = {

    execute = function(binary, sub_command, fn){
        exec([binary, sub_command].join(" "), fn);
    }

}
