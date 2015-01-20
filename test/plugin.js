'use strict';

var chai   = require('chai');
//var nock   = require('nock');
//var sinon  = require('sinon');
//var B      = require('bluebird');

var expect = chai.expect;

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

var arkivo       = require('arkivo');
var hydra        = require('../lib/plugin');

var Session      = require('arkivo/lib/sync').Session;

var plugins      = arkivo.plugins;
var Subscription = arkivo.Subscription;


describe('Hydra Plugin', function () {

  before(function () { plugins.add(hydra); });
  after(function () { plugins.reset(); });

  it('is available', function () {
    expect(plugins.available.hydra).to.be.an('object');
  });

  it('can be used', function () {
    expect(plugins.use('hydra')).to.be.instanceof(plugins.Plugin);
  });

  it('is configurable', function () {
    expect(plugins.use('hydra').configurable).to.be.true;
  });

  it('has a summary', function () {
    expect(plugins.use('hydra')).to.have.property('summary');
  });

  it('must be configured with a host', function () {
    var config = {};

    expect(plugins.use.bind(plugins, 'hydra', config)).to.throw(Error);

    config.host = 'http://example.com:8181';

    expect(plugins.use.bind(plugins, 'hydra', config)).to.not.throw(Error);
  });
});
