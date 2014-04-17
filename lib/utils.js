var _ = require("lodash");

module.exports = {

    kv_to_obj: function(string){
        var obj = {};
        if(!_.isNull(string) && !_.isUndefined(string)){
            string = string.replace(/ /g, "");
            _.each(string.split(","), function(kv){
                var parts = kv.split("=");
                obj[parts[0]] = parts[1];
            });
        }

        return obj;
    }

}
