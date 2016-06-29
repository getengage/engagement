import assert from 'assert';

describe('App', () => {

  it('sets jsdom window and doc objects', () => {
    assert.equal(typeof document, 'object');
    assert.equal(typeof window, 'object');
  });


});
