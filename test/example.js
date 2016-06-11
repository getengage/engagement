import assert from 'assert';
import Example from '../src/example';

describe('App', () => {
  describe('#sayHello', () => {
    it('should return "Hello" and the provided name', () => {
      const name = 'Marcus';

      const instance = new Example();
      const returnedValue = instance.sayHello(name);

      assert.equal(returnedValue, `Hello ${name}`);
    });
  });
});
