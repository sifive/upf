'use strict';

let targs = require('./targs.js');

exports.schema = {
  type: 'object'
};

exports.handler = function (validator) {
  return function () {
    let args = targs(arguments[1]);
    validator(args);
    // console.log(args);
  };
};
