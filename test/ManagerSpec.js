import assert from 'assert';
import Nightmare from 'nightmare';
import co from 'co';
import engage from '../src/index';

describe('Manager', () => {
  it('fires eventlistener on scroll', co.wrap(function*() {
    return new Nightmare()
    .goto('http://localhost:3000/users/sign_in')
    .wait('body')
    .inject('js', 'dist/engage.js')
    .evaluate(function() {
      // engage.run({element: 'body'});
    })
    .scrollTo(0, 200)
    .evaluate(function() {
      // return engage.instance;
      return Object.keys(window);
    })
    .end()
      .then(function(e) {
        console.log(e);
        // var pos = e.manager.scroll.position;
        // assert.deepEqual(pos, [0, 200]);
      });
  }));

});
