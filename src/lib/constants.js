const constants = (function() {
  const host   = () => process.env.REACT_APP_API_HOST || "localhost";
  const port   = () => process.env.REACT_APP_API_PORT || 3000;
  const url    = () => `http://${host()}:${port()}/api/v1`;
  const socket = () => `ws://${host()}:${port()}/socket`;

  return {
    api: {
      host, port, url, socket,
    }
  }
})();

export default constants;
