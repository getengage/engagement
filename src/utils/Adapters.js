const Adapters = {};

Adapters.scrollCalc = () => {
  if (typeof window.pageYOffset === 'undefined') throw new Error('Not Supported');
  return [window.pageXOffset, window.pageYOffset];
};

if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  Adapters.vhidden = 'hidden';
  Adapters.vchange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
  Adapters.vhidden = 'mozHidden';
  Adapters.vchange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  Adapters.vhidden = 'msHidden';
  Adapters.vchange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  Adapters.vhidden = 'webkitHidden';
  Adapters.vchange = 'webkitvisibilitychange';
}

export default Adapters;
