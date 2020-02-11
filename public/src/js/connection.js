import { WS_URL, parseJsonObject } from './util.js';
import videoPlayer from './videoPlayer.js';


class Connection {
  
  constructor() {
    this.socket = new WebSocket(WS_URL);
    this.openConnection = this.socket.addEventListener('open', this.openConnection.bind(this));
    this.handlerMessages = this.socket.addEventListener('message', this.handlerMessages.bind(this));   
  }

  openConnection() {
    this.socket.send(JSON.stringify({typeMessage:'connected', message:"connected"})); 
    return this;
  }

  getConnection() {
    return this.socket;
  }

  handlerMessages(evt) {
    
      if(evt.data instanceof Blob){
        this.readFile(evt);
      } else {
          const  { type, message } = parseJsonObject(evt.data);
          if(type == 'playOk'){
            videoPlayer.video[message]();
          }
     
          if(type == 'pauseOk'){
            videoPlayer.video[message]();
          }
      
          if(type == 'skipOk'){
            videoPlayer.video.currentTime += parseFloat(message);
          }

          if(type == 'backForwardOk') {
            videoPlayer.video.currentTime = parseFloat(message);
          }
          
          if(type == 'invalid') {
            console.log(message);
          }
       }
  } 
 
  readFile(fileData) {
    videoPlayer.loadVideo(window.URL.createObjectURL(fileData.data));
  }
}

export default Connection;