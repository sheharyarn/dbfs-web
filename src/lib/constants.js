const constants = (function() {
  const host   = () => "localhost";
  const port   = () => (window.location.port - 1000);
  const url    = () => `http://${host()}:${port()}/api/v1`;
  const socket = () => `ws://${host()}:${port()}/socket`;

  return {
    api: {
      host, port, url, socket,
    }
  }
})();

export default constants;
