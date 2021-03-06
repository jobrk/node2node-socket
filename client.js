const io = require('socket.io-client');

module.exports = (port, initSocketHandlers) => {
  const socket = io(`http://localhost:${port}`, {
    path: '/ws',
  });
  initSocketHandlers(socket, false);

  return {
    fire(event, args) {
      socket.emit(event, args);
    },
  };
};
