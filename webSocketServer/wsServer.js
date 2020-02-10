const WebSocket = require('ws');
const handlerMessages = require('./handlerMessages');

module.exports = server =>{
  const wss = new WebSocket.Server({ server });
  wss.on('connection', ws => {
    ws.on('message', message =>{
      console.log(`received : ${message}`);
       handlerMessages(wss.clients, ws, message);
    });
  });
  
}