import assert from "assert";
import engage from '../src/index';

  describe('engage', () => {

    describe('#run', () => {

      it('is not callable without opts', () => {
        assert.throws(engage.run, 'No options passed');
      });

      it('is callable w/ optional opts', () => {
        assert(engage.run({element: 'body_copy'}), false);
      });

    });

  });
