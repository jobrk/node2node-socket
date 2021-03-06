const createServer = require('./server');
const createClient = require('./client');

const SERVER_PORT = 3000;

const initSocketHandlers = (socket, isServer) => {
  socket.on('hello', () => {
    console.log(`${isServer ? 'client' : 'server'} said hi`);
  });
  socket.on('message', data => {
    console.log(
      `${isServer ? 'client' : 'server'} sent message: ${JSON.stringify(data)}`,
    );
  });
};

(async () => {
  const server = createServer(SERVER_PORT, initSocketHandlers);
  const client = createClient(SERVER_PORT, initSocketHandlers);

  await waitPromise(1000);
  client.fire('hello');
  await waitPromise(1000);
  server.fire('hello');
  await waitPromise(1000);
  server.fire('message', {id: 0, content: 'you may update your ui'});
  await waitPromise(1000);
  client.fire('message', {id: 1, content: 'please update your db'});
  await waitPromise(1000);
  process.exit(0);
})();

function waitPromise(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
