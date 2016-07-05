import assert from 'assert';
import { Visibility } from '../src/tracking';

describe('Visibility', () => {
  var instance;

  before(function() {
    instance = new Visibility();
  });

  it('is a valid class', () => {
    assert(instance instanceof Visibility);
  });

  it('has an initial is_visible', () => {
    assert(instance.is_visible);
  });

});
