import $ from 'jquery';
import assert from 'assert';
import _engage from '../src/index';

describe('App', () => {

  it('uses electron test renderer', () => {
    assert.equal(typeof document, 'object');
    assert.equal(typeof window, 'object');
  });

  describe('_engage#run', () => {

    it('is not callable without opts', () => {
      assert.throws(_engage.run, 'No options passed');
    });

    it('is callable w/ optional opts', () => {
      assert(_engage.run({element: 'body_copy'}), true);
    });

  });

});
