class Session {

  constructor() {
    this.session_id = this.sessionId();
    this.referrer = this.referrer();
    this.source_url = document.URL.replace(/\/$/, '');
  }

  sessionId() {
    const sessionId = window.sessionStorage.getItem('__engage_session');
    if (sessionId == null) {
      const newId = this.idTemplate();
      window.sessionStorage.setItem('__engage_session', newId);
      return newId;
    }
    return sessionId;
  }

  referrer() {
    const url = document.referrer.replace(/\/$/, '');
    return url.match(location.hostname) ? url : '';
  }

  idTemplate() {
    return `_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
  }

}

module.exports = Session;
