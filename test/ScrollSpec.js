import assert from 'assert';
import Scroll from '../src/index';

describe('Scroll', () => {
  it('is a valid class', () => {
    const instance = new Scroll();
    assert.equal(instance.scrollPos.length, 0);
  });
});
