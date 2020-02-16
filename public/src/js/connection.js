import { WS_URL} from './util.js';
import io from 'socket.io-client';
import videoPlayer from './videoPlayer.js';

class Connection {
  
  constructor() {
    this.socket =  io.connect(WS_URL);
    this.handlerMessagesIo();
  }

  getConnection() {
    return this.socket;
  }

  handlerMessagesIo() {
    this.socket.on('playOk', data =>{
      videoPlayer.video[data.message]();
    });

    this.socket.on('pauseOk', data =>{
      videoPlayer.video[data.message]();
    });

    this.socket.on('skipOk', data =>{
      videoPlayer.video.currentTime += parseFloat(data.message);
    });

    this.socket.on('backForwardOk', data =>{
      videoPlayer.video.currentTime = parseFloat(data.message);
    });
  }
}

export default Connection;