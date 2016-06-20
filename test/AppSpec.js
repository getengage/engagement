import $ from 'jquery';
import assert from 'assert';

describe('App', () => {

  it('uses electron test renderer', () => {
    assert.equal(typeof document, 'object');
    assert.equal(typeof window, 'object');
  });


});
