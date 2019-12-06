'use strict';

let lib = require('../lib');

describe('basic', () => {
  it('1', async () => {
    let tcl = new lib.Tcl;
    await tcl.run('set w "World!"');
    await tcl.run('puts "Hello $w"');
  });
});

/* eslint-env mocha */
