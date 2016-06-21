import $ from 'jquery';
import assert from 'assert';
import { Scroll } from '../src/tracking/index';

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

  describe('user moves to 200 Y pos', () => {

    before(() => {
      $(document).scrollTop(200);
      scroll.update();
    });

    it('can set new position', () => {

      assert.deepEqual(scroll.position, [0, 200]);
    });

  });

});
