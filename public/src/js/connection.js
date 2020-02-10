import {WS_URL} from './util.js';
import videoPlayer from './videoPlayer.js';


class Connection {
  
  constructor() {
    this.socket = new WebSocket(WS_URL);
    this.openConnection = this.socket.addEventListener('open', this.openConnection.bind(this));
    this.handlerMessages = this.socket.addEventListener('message', this.handlerMessages.bind(this));   
  }

  openConnection() {
    this.socket.send('connected'); 
    return this;
  }

  getConnection() {
    return this.socket;
  }

  handlerMessages(evt) {
    let msg = {};
      if(evt.data instanceof Blob){
        this.readFile(evt);
      }else {

        if(evt.data == 'play'){
          videoPlayer.video[evt.data]();
        }
        if(evt.data == 'pause'){
          videoPlayer.video[evt.data]();
        }
      }
      
  }
 
  readFile(fileData) {
    videoPlayer.loadVideo(window.URL.createObjectURL(fileData.data));
  }
}

export default Connection;