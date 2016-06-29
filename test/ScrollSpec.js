import assert from 'assert';
import { Scroll } from '../src/tracking';

describe('Scroll', () => {
  var scroll;

  before(function() {
    scroll = new Scroll();
  });

  it('is a valid class', () => {
    assert(scroll instanceof Scroll);
  });

  it('has an initial position', () => {
    assert.deepEqual(scroll.position, [0, 0]);
  });

});
