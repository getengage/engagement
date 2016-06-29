let vhidden;
let vchange;

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

export default { vhidden, vchange };
