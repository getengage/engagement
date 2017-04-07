<img src="https://raw.githubusercontent.com/nicksoto/engagement-backend/master/app/assets/images/get_engaged.png" alt="Engagement" width="980">

<p align="center">
  <a href="https://codeclimate.com/github/nicksoto/engagement"><img src="https://codeclimate.com/github/nicksoto/engagement/badges/gpa.svg" /></a>
</p>
<br>

The Engagement JS Client

### Background

The Engagement JS Client sends engagement metrics (e.g. time on page, scroll position, etc. ) to an Engagement Server at regular intevals. Please see [README.md](https://github.com/nicksoto/engagement-backend/blob/master/README.md) for more details

### Requirements

- An API Key generated from the [engagement  ](https://github.com/nicksoto/engagement-backend/blob/master/README.md) settings section
- A page with content identifiable by either class or ID

### How to Use

```javascript

  engageConfig = {
    element: '.text_content',
    api_key: 'YOUR_API_KEY',
    dimensions: {   // optional
      tags: ['sports', 'commentary', 'statistics'],
      author: 'john doe',
    },
  };
  
  (function() {
    var e = document.createElement('script');
    e.src = 'https://cdn.rawgit.com/nicksoto/engagement/3e3a6705/dist/engage.min.js';
    e.type = 'text/javascript';
    e.async = 'true';
    e.onload = e.onreadystatechange = function() {
      var rs = this.readyState;
      if (rs && rs != 'complete' && rs != 'loaded') return;
      try { engage.run(engageConfig) } catch (e) {}
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);
  })();

```

### Contributing / Setup

Please read [CONTRIBUTING.md](https://github.com/nicksoto/engagement-backend/blob/master/CONTRIBUTING.md) for details on contributing as well as information on system setup

### License

Copyright (c) [Nick Soto](http://github.com/nicksoto)
