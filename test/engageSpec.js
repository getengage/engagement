import assert from "assert";
import co from 'co';
import Nightmare from 'nightmare';
import engage from '../src/index';

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

  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('registers engage on page', co.wrap(function*() {
    var result = yield nightmare
      .goto('http://google.com')
      .wait('body')
      .inject('js', 'dist/engage.min.js')
      .evaluate(() => {
        return window.engage.run({element: 'body_copy'});
      });

    assert(result.manager);
    assert(result.options);

    yield nightmare.end();
  }));

  it('tracks user scrolls', co.wrap(function*() {
    var setup = yield nightmare
      .goto('http://google.com')
      .viewport(600, 600)
      .wait('body')
      .inject('js', 'dist/engage.min.js')
      .evaluate(() => {
        window.engage.run({element: 'body_copy'});
      });

    var result = yield nightmare
      .scrollTo(0, 100)
      .wait(1000)
      .evaluate(() => {
        return window.engage.instance.manager.scroll.position;
      });

    assert.deepEqual(result, [100,0]);
    yield nightmare.end();
  }));

});
