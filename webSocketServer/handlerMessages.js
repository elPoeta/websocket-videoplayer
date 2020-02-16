const fs = require("fs");
const path = require('path');
const WebSocket = require('ws');

const handlerMessages = (clients, ws, {typeMessage, message}) =>{
  const connected = async () => {
    const data = await (await customReadFile(path.resolve(__dirname ,'../assets/video.mp4'))
                             .catch(err => {
                              console.log('Error :: ',err)
                           }));
                      
    ws.send(data, { binary: true });                  
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
     'default': () => ws.send(JSON.stringify({type:'default', message:'invalid message'}))
  };

  return handler[typeMessage]() || handler['default'];
}

const customReadFile = file => {
  return new Promise((resolve, reject) =>{
    fs.readFile(file, (err, data) => {
      if(err){
        console.log(`Read file error :: ${err}`);
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = handlerMessages;