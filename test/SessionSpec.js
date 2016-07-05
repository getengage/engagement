import assert from 'assert';
import { Session } from '../src/tracking';

describe('Session', () => {
  var instance;

  before(function() {
    instance = new Session();
  });

  it('is a valid class', () => {
    assert(instance instanceof Session);
  });

  it('has an initial source_url', () => {
    assert.deepEqual(instance.source_url, 'http://test.page');
  });

  it('has an initial referrer', () => {
    assert.deepEqual(instance.referrer, '');
  });

  it('has an initial session_id', () => {
    assert(instance.session_id);
  });

});
