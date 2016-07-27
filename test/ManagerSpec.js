import assert from 'assert';
import { Manager } from '../src/metrics';

describe('Manager', () => {
  var instance;
  var keys = [
    'timestamp',
    'session_id',
    'referrer',
    'x_pos',
    'y_pos',
    'is_visible',
    'source_url',
    'in_viewport',
  ];

  before(function() {
    instance = new Manager({element: 'some_element'});
  });

  it('is a valid class', () => {
    assert(instance instanceof Manager);
  });

  it('can be inspected', () => {
    assert.deepEqual(Object.keys(instance.inspect()), keys);
  });

});
