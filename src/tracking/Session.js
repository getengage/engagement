class Session {

  constructor() {
    this.session_id = Session.sessionId();
    this.referrer = Session.referrer();
    this.source_url = document.URL.replace(/\/$/, '');
  }

  static sessionId() {
    const sessionId = window.sessionStorage.getItem('__engage_session');
    if (sessionId == null) {
      const newId = Session.idTemplate();
      window.sessionStorage.setItem('__engage_session', newId);
      return newId;
    }
    return sessionId;
  }

  static referrer() {
    const url = document.referrer.replace(/\/$/, '');
    return url.match(location.hostname) ? url : '';
  }

  static idTemplate() {
    return `_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
  }

}

module.exports = Session;
