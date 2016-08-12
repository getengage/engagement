import assert from 'assert';
import { Scroll } from '../src/tracking';

describe.only('Scroll', () => {
  var instance;

  before(function() {
    instance = new Scroll('main');
  });

  it('is a valid class', () => {
    assert(instance instanceof Scroll);
  });

  it('has an initial x Pos', () => {
    assert.equal(instance.xPos, 0);
  });

  it('has an initial y Pos', () => {
    assert.equal(instance.yPos, 0);
  });

  it("has a word total", () => {
    assert.equal(instance.word_count, 4);
  });

  it('has an initial elementInViewport', () => {
    assert.equal(instance.elementInViewport, false);
  });

});
