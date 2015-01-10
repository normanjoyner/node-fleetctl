node-fleetctl
====================

##About

###Description
A nodejs module for interacting with fleetctl. This module should be updated when a stable HTTP API for fleet is released. In the interim, this module resorts to shelling out and parsing stdout.

###Author
Norman Joyner - norman.joyner@gmail.com

##Getting Started

###Installation
```npm install fleetctl```

###Usage
To get started, simply require fleetctl in your program, and instantiate a new Fleetctl object. Once instantiated, you are free to make calls to fleetctl.
```javascript
var Fleetctl = require("fleetctl");
var fleetctl = new Fleetctl();
```

If the fleetctl binary is not installed in your ```PATH```, you can specify the path to it when instantiating a Fleetctl object.
```javascript
var Fleetctl = require("fleetctl");
var fleetctl = new Fleetctl({
    binary: "/Users/normanjoyner/Development/fleet/fleetctl"
});
```

Alternatively, you can call the ```configure()``` method after instantiation. When configuring, you can pass any available global Fleetctl option.
```javascript
var Fleetctl = require("fleetctl");
var fleetctl = new Fleetctl();
fleetctl.configure({
    binary: "/Users/normanjoyner/Development/fleet/fleetctl",
    tunnel: "10.10.10.10"
});
```

The following fleetctl sub-commands are available in this module:

**list-machines**
```javascript
/**
 * Enumerate the current hosts in the cluster
 * @method
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 * @param {array} list of machines
 */
fleetctl.list_machines(function(err, machines){
    if(err)
        throw err;

    console.log(machines);
});
```

**list-units**
```javascript
/**
 * List the current state of units in the cluster
 * @method
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 * @param {array} list of units
 */
fleetctl.list_units(function(err, units){
    if(err)
        throw err;

    console.log(units);
});
```

**list-unit-files**
```javascript
/**
 * List the units that exist in the cluster
 * @method
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 * @param {array} list of unit files
 */
fleetctl.list_unit_files(function(err, unit_files){
    if(err)
        throw err;

    console.log(unit_files);
});
```

**submit**
```javascript
/**
 * Upload one or more units to the cluster without starting them
 * @method
 * @param {string}/{array} paths of file to submit
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 */
fleetctl.submit(["unit1", "unit2"], function(err){
    if(err)
        throw err;
});
```

**load**
```javascript
/**
 * Schedule one or more units in the cluster, first submitting them if necessary
 * @method
 * @param {string}/{array} unit name
 * @param {object} [optional] options
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 */
fleetctl.load(["unit1", "unit2"], function(err){
    if(err)
        throw err;
});
```

**unload**
```javascript
/**
 * Unschedule one or more units in the cluster
 * @method
 * @param {string}/{array} unit name
 * @param {object} [optional] options
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 */
fleetctl.unload("unit1", function(err){
    if(err)
        throw err;
});
```

**start**
```javascript
/**
 * Instruct systemd to start one or more units in the cluster, first submitting and loading if necessary
 * @method
 * @param {string}/{array} unit name
 * @param {object} [optional] options
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 */
fleetctl.start("unit1", function(err){
    if(err)
        throw err;
});
```

**stop**
```javascript
/**
 * Instruct systemd to stop one or more units in the cluster
 * @method
 * @param {string}/{array} unit name
 * @param {object} [optional] options
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 */
fleetctl.stop("unit1", {"no-block": true}, function(err){
    if(err)
        throw err;
});
```

**destroy**
```javascript
/**
 * Destroy one or more units in the cluster
 * @method
 * @param {string}/{array} unit name
 * @param {function} callback function
 *
 * @callback
 * @param {error} error object
 */
fleetctl.destroy("unit1", function(err){
    if(err)
        throw err;
});
```
