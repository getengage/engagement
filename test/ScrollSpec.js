import assert from 'assert';
import Scroll from '../src/index';

describe('Scroll', () => {
  var scroll;

  before(function() {
    scroll = new Scroll();
  });

  it('is a valid class', () => {
    assert(scroll instanceof Scroll);
  });

  it('has a scrollPos', () => {
    assert.deepEqual(scroll.scrollPos.length, 0);
  });

  it('can set new scroll position', () => {
    scroll.setScrollPos();
    assert.deepEqual(scroll.scrollPos, [0, 0]);
  });

});
