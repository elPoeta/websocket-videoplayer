const fs = require("fs");
const path = require('path');
const WebSocket = require('ws');

const handlerMessages = (clients, ws, message) =>{
  const connected = () => {
    fs.readFile(path.resolve(__dirname ,'../assets/video.mp4'), (err, data) => {
      if(err){
        console.log(`Read file error :: ${err}`);
        return;
      }
      ws.send(data, { binary: true });
    });
  }

  const play = () => {
    broadcast({type:"playOk"});
  }

  const pause = () => {
    broadcast({type:"pauseOk"});
  }

  const broadcast = ({type}) => {
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({type, message}));
      }
    });
  }
  
  const handler = {
     'connected': connected,
     'play': play,
     'pause': pause,
     'default': () => ws.send('invalid message')
  };

  return handler[message]() || handler['default'];
}

module.exports = handlerMessages;