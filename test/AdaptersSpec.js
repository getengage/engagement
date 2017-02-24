import assert from 'assert';
import { Adapters } from '../src/utils';

describe.only('Adapters', () => {

  it("doesnt return something undefined", () => {
    assert.equal(Adapters.somethingNotDefined, undefined);
  });

  it('returns scrollCalc', () => {
    assert.equal(typeof Adapters.scrollCalc, 'function');
  });

  it('returns vchange', () => {
    assert(Adapters.vchange);
  });

  it('returns vhidden', () => {
    assert(Adapters.vhidden);
  });

});
