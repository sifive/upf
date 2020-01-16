'use strict';

let targs = require('./targs.js');

exports.schema = {
  type: 'object'
};

exports.handler = function (validator) {
  return function (interp, args) {
    // validator(args);
    // console.log(args);
  };
};
