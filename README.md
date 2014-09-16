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

Alternatively, you can call the ```configure()``` method after instantiation.
```javascript
var Fleetctl = require("fleetctl");
var fleetctl = new Fleetctl();
fleetctl.configure({
    binary: "/Users/normanjoyner/Development/fleet/fleetctl"
});
```

The following fleetctl sub-commands are available in this module:

list-machines
```javascript
fleetctl.list_machines(function(err, machines){
    if(err)
        throw err;

    console.log(machines);
});
```

list-units
```javascript
fleetctl.list_units(function(err, units){
    if(err)
        throw err;

    console.log(units);
});
```

submit
```javascript
fleetctl.submit(["unit1", "unit2"], function(err){
    if(err)
        throw err;
});
```

load
```javascript
fleetctl.load(["unit1", "unit2"], function(err){
    if(err)
        throw err;
});
```

unload
```javascript
fleetctl.unload("unit1", function(err){
    if(err)
        throw err;
});
```

start
```javascript
fleetctl.start("unit1", function(err){
    if(err)
        throw err;
});
```

stop
```javascript
fleetctl.stop("unit1", ["-noblock=true"], function(err){
    if(err)
        throw err;
});
```

destroy
```javascript
fleetctl.destroy("unit1", function(err){
    if(err)
        throw err;
});
```
