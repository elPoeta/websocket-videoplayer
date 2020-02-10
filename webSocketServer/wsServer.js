const WebSocket = require('ws');

module.exports = server =>{
  const wss = new WebSocket.Server({ server });
  wss.on('connection', ws => {
    ws.on('message', message =>{
      console.log(`received : ${message}`);
       ws.send('ok')
    });
  });
  
}