import assert from "assert";
import co from 'co';
import Nightmare from 'nightmare';
import engage from '../src/index';

describe('engage (base)', () => {
  var nightmare;

  describe('#run', () => {

    it('is uncallable without opts', () => {
      assert.throws(engage.run, 'No options passed');
    });

    it('is uncallable without api key', () => {
      assert.throws(function(){engage.run({element: 'body_copy'})}, 'No API Key passed');
    });

    it('is uncallable without target element', () => {
      assert.throws(function(){engage.run({api_key: '1234'})}, 'No element option passed');
    });

    it('is uncallable wo/ valid opts', () => {
      assert.throws(function(){engage.run({element: 'this_doesnt_exist', api_key: '1234'})}, 'No Elements Found');
    });

    it('is callable w/ valid opts', () => {
      assert(engage.run({element: 'main', api_key: '1234'}));
    });

  });

  describe('#instance', () => {

    before(function() {
      if (engage.instance) engage.instance = null;
    });

    it('throws error if instance not defined', () => {
      assert.throws(function() {engage.instance });
    });

    it('returns instance if defined', () => {
      engage.run({element: 'body_copy', api_key: '1234'});
      assert.doesNotThrow(function() {engage.instance });
      assert(engage.instance instanceof engage);
    });
  });

  describe('_format', () => {

    before(function() {
      if (engage.instance) engage.instance = null;
    });

    it('returns Blob with json content type', () => {
      engage.run({element: 'body_copy', api_key: '1234'});
      assert(engage.instance.format() instanceof Blob);
      assert.deepEqual(engage.instance.format().type, 'application/vnd.engage.api+json; charset=utf-8');
    });
  });

  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('doesnt engage on page wo/ element', co.wrap(function*() {
    var result = yield nightmare
      .goto('http://yahoo.com')
      .wait()
      .inject('js', 'dist/engage.min.js')
      .evaluate(() => {
        return window.engage.run({element: 'body_copy', api_key: '1234'});
      })
      .catch((err) => {
        assert.equal(err, "No Elements Found")
      });

    yield nightmare.end();
  }));

  it('registers engage on page w/ element', co.wrap(function*() {
    var result = yield nightmare
      .goto('http://yahoo.com')
      .wait()
      .inject('js', 'dist/engage.min.js')
      .evaluate(() => {
        return window.engage.run({element: 'header', api_key: '1234'});
      });

    assert(result.manager);

    yield nightmare.end();
  }));

  it('tracks user scrolls', co.wrap(function*() {
    var setup = yield nightmare
      .goto('http://yahoo.com')
      .viewport(600, 600)
      .wait()
      .inject('js', 'dist/engage.min.js')
      .evaluate(() => {
        window.engage.run({element: 'header', api_key: '1234'});
      });

    var result = yield nightmare
      .scrollTo(0, 100)  // top, left
      .wait(1000)
      .evaluate(() => {
        return window.engage.instance.manager.scroll.xPos;
      });

    assert.deepEqual(result, 100);
    yield nightmare.end();
  }));

  it('tracks elements in viewport', co.wrap(function*() {
    var setup = yield nightmare
      .goto('http://huffingtonpost.com')
      .viewport(1200, 1200)
      .wait()
      .inject('js', 'dist/engage.min.js')
      .evaluate(() => {
        return window.engage.run({element: 'header', api_key: '1234'});
      });

    var result = yield nightmare
      .evaluate(() => {
        return window.engage.instance.manager.scroll;
      });

    assert.deepEqual(result.elementInViewport, true);
    assert.equal(result.top, 0);
    assert.equal(result.bottom, 130);

    yield nightmare.end();
  }));

  it('tracks user session', co.wrap(function*() {
    var result = yield nightmare
      .goto('http://yahoo.com')
      .wait()
      .inject('js', 'dist/engage.min.js')
      .evaluate(() => {
        return window.engage.run({element: 'header', api_key: '1234'});
      })
      .catch((err) => {
        console.log('err:', err);
      });

    assert.deepEqual(result.manager.session.source_url, 'https://www.yahoo.com');
    assert.deepEqual(result.manager.session.referrer, '');
    assert(result.manager.session.session_id);

    var session = yield {id: result.manager.session.session_id};

    var result = yield nightmare
      .click('a[href="https://www.yahoo.com/news/"]')
      .wait()
      .inject('js', 'dist/engage.min.js')
      .evaluate(() => {
        return window.engage.run({element: 'render-target-active', api_key: '1234'});
      })
      .catch((err) => {
        console.log('err:', err);
      });

    assert.deepEqual(result.manager.session.source_url, 'https://www.yahoo.com/news');
    assert.deepEqual(result.manager.session.referrer, 'https://www.yahoo.com');
    assert.deepEqual(result.manager.session.session_id, session.id);

    yield nightmare.end();
  }));


});
