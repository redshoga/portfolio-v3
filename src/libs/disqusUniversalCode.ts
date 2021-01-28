export const disqusUniversalCode = `
  var disqus_config = function () {
    this.page.url = location.href;
    this.page.identifier = location.pathname;
  };
  (function() {  // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://redshoga.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
`;
