import assert from 'assert';
import sinon from 'sinon';
import { PubSub } from '../src/utils';

describe('PubSub', () => {
  var instance;

  before(function() {
    instance = new PubSub();
  });

  it('can call subscribers', () => {
    var spy = sinon.spy();
    instance.subscribe('Scroll', spy);
    instance.publish('Scroll');
    assert(spy.called);
  });
});