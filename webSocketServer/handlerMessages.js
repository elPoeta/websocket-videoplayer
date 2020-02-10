const fs = require("fs");
const path = require('path');

const handlerMessages = (clients, ws, message) =>{
  const connected = () => {
    fs.readFile(path.resolve(__dirname ,'../assets/movie.mp4'), (err, data) => {
      if(err){
        console.log(`Read file error :: ${err}`);
        return;
      }
      ws.send(data, { binary:true });
    });
  }

  const play = () => {

  }

  const pause = () => {
    
  }

  const broadcast = () => {

  }
  
  const handler = {
     'connected': connected(),
     'play': play(),
     'pause': pause(),
     'default': () => ws.send('invalid message')
  };

  return handler[message] || handler['default'];
}

module.exports = handlerMessages;