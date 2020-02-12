import { WS_URL, parseJsonObject } from './util.js';
import videoPlayer from './videoPlayer.js';


class Connection {
  
  constructor() {
    this.socket = new WebSocket(WS_URL);
    this.openConnection = this.socket.addEventListener('open', this.openConnection.bind(this));
    this.handlerMessages = this.socket.addEventListener('message', this.handlerMessages.bind(this));   
    this.error = this.socket.addEventListener('error', this.error.bind(this));
  }

  openConnection() {
    this.socket.send(JSON.stringify({typeMessage:'connected', message:"connected"})); 
    return this;
  }

  getConnection() {
    return this.socket;
  }

  handlerMessages(evt) {
    const  { type, message } = parseJsonObject(evt.data);
    switch(type) {
      case 'connectedOk': {
        console.log(message);
        break;
      }
      case 'playOk': {
        videoPlayer.video[message]();
        break;
     } 
      case 'pauseOk': {
        videoPlayer.video[message]();
        break;
     }
      case 'skipOk': {
        videoPlayer.video.currentTime += parseFloat(message);
        break;
      }
      case 'backForwardOk': {
        videoPlayer.video.currentTime = parseFloat(message);
        return;
      }
      default : console.log(message);
    }
  } 

  error() {
    console.log(`Error....`);
  }
}

export default Connection;