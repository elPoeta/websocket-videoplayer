import Connection from './connection';
const socket = new Connection();

class VideoPlayer {

  constructor() {
    this.videoPlayer = document.querySelector('#videoPlayer');  
    this.player = document.querySelector('.player');
    this.toggle = this.player.querySelector('.toggle');
    this.video = this.player.querySelector('.viewer');
    this.toggle.addEventListener('click', this.togglePlay.bind(this));
    this.video.addEventListener('click', this.togglePlay.bind(this));
    this.video.addEventListener('play', this.updateButton);
    this.video.addEventListener('pause', this.updateButton);
    
  }

  loadVideo(url){
    this.videoPlayer.src = url;
  }

  togglePlay() {
    const method = this.video.paused ? 'play' : 'pause';
    console.log('method ',method)
    socket.getConnection().send(method);
    //const msg =  connection.getMessage();
    //console.log('msg ',msg)
   // this.video[method]();
  }
  
  updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    //this.toggle.textContent = icon;
  }
}

export default new VideoPlayer();