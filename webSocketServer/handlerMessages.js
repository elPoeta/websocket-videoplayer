const fs = require("fs");
const path = require('path');
const WebSocket = require('ws');

const handlerMessages = (clients, ws, {typeMessage, message}) =>{
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

  const skip = () => {
    broadcast({type:"skipOk"});
  }

  const backForward = () => {
    broadcast({type:"backForwardOk"});
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
     'skip': skip,
     'backForward': backForward,
     'default': () => ws.send(JSON.stringify({type:'invalid', message:'invalid message'}))
  };

  return handler[typeMessage]() || handler['default'];
}

module.exports = handlerMessages;