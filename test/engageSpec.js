import assert from "assert";
import engage from '../src/index';
import Nightmare from 'nightmare';
import co from 'co';

describe('engage', () => {
  var nightmare;

  describe('#run', () => {

    it('is not callable without opts', () => {
      assert.throws(engage.run, 'No options passed');
    });

    it('is callable w/ optional opts', () => {
      assert(engage.run({element: 'body_copy'}), false);
    });

  });

  describe('#instance', () => {

    before(function() {
      if (engage.instance) engage.instance = null;
    });

    it('throws error if instance not defined', () => {
      assert.throws(function() {engage.instance });
    });

    it('returns instance if defined', () => {
      engage.run({element: 'body_copy'});
      assert.doesNotThrow(function() {engage.instance });
      assert(engage.instance instanceof engage);
    });

  });

  beforeEach(function() {
    nightmare = new Nightmare();
  });

  afterEach(function*() {
    yield nightmare.end();
  });

  it('registers engage on page', function(done) {
    nightmare
      .goto('http://localhost:3000/users/sign_in')
      .wait('body')
      .inject('js', 'dist/engage.min.js')
      .evaluate(function() {
        return window.engage;
      })
      .end()
      .then(function(el) {
        done();
      });
  });
});
