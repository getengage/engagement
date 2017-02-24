let vhidden;
let vchange;

const scrollCalc = () => {
  if (typeof window.pageYOffset === 'undefined') throw new Error('Not Supported');
  return [window.pageXOffset, window.pageYOffset];
};

if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  vhidden = 'hidden';
  vchange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
  vhidden = 'mozHidden';
  vchange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  vhidden = 'msHidden';
  vchange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  vhidden = 'webkitHidden';
  vchange = 'webkitvisibilitychange';
}

module.exports = { vhidden, vchange, scrollCalc };
