'use strict';

let chai = require('chai');
let lib = require('../lib/');

const expect = chai.expect;

describe('basic', () => {
  it('procs is object', done => {
    expect(lib.procs).to.be.a('object');
    done();
  });
});

/* eslint-env mocha */
