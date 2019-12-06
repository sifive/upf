'use strict';

let tcl = require('tcl-js');
let pkg = require('../package.json');

exports.version = pkg.version;
exports.Tcl = tcl.Tcl;
