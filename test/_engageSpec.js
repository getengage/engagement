import assert from "assert";
import _engage from '../src/index';

  describe('_engage', () => {

    describe('#run', () => {

      it('is not callable without opts', () => {
        assert.throws(_engage.run, 'No options passed');
      });

      it('is callable w/ optional opts', () => {
        assert(_engage.run({element: 'body_copy'}), false);
      });

    });

  });
