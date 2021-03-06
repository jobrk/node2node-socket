const fastify = require('fastify');
const socketio = require('socket.io');

module.exports = (port, initSocketHandlers) => {
  const app = fastify({logger: true});
  const appSocket = socketio(app.server, {path: '/ws'});
  appSocket.on('connection', socket => initSocketHandlers(socket, true));
  app.listen(port);

  return {
    fire(event, args) {
      appSocket.emit(event, args);
    },
  };
};
