const WS_URL = location.origin.replace(/^http/, 'ws');

class App {
  
  constructor() {
    this.socket = new WebSocket(WS_URL);
    this.openConnection = this.socket.addEventListener('open', this.openConnection.bind(this));
    this.handlerMessages = this.socket.addEventListener('message', this.handlerMessages.bind(this));
    this.videoPlayer = document.querySelector('#videoPlayer');    
  }

  openConnection() {
    this.socket.send('connected'); 
    return this;
  }

  handlerMessages(evt) {
    let msg = {};
      if(event.data instanceof Blob){
        this.readFile(evt);
      }
  }
 
  readFile(fileData) {
    this.videoPlayer.src = window.URL.createObjectURL(fileData.data);
  }
}

export default App;