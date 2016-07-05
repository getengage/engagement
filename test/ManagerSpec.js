import assert from 'assert';
import { Manager } from '../src/metrics';

describe('Manager', () => {
  var instance;
  var keys = [
    'created_at',
    'session_id',
    'referrer',
    'x_pos',
    'y_pos',
    'is_visible',
    'source_url'
  ];

  before(function() {
    instance = new Manager();
  });

  it('is a valid class', () => {
    assert(instance instanceof Manager);
  });

  it('can be inspected', () => {
    assert.deepEqual(Object.keys(instance.inspect()), keys);
  });

});
