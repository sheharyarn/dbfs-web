const constants = (function() {
  const host   = () => "localhost";
  const port   = () => (window.location.port - 1000);
  const url    = () => `http://${host()}:${port()}/api/v1`;

  return {
    api: {
      host, port, url
    }
  }
})();

export default constants;
