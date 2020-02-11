import Connection from './connection';
const socket = new Connection();

class VideoPlayer {

  constructor() {
    this.videoPlayer = document.querySelector('#videoPlayer');  
    this.player = document.querySelector('.player');
    this.progress = this.player.querySelector('.progress');
    this.progressBar = this.player.querySelector('.progress-bar-fill');
    this.skipButtons = this.player.querySelectorAll('[data-skip]');
    this.toggle = this.player.querySelector('.toggle');
    this.video = this.player.querySelector('.viewer');
    this.volume = this.player.querySelector('.player-slider');
    this.toggle.addEventListener('click', this.togglePlay.bind(this));
    this.video.addEventListener('click', this.togglePlay.bind(this));
    this.video.addEventListener('play', this.updateButton.bind(this));
    this.video.addEventListener('pause', this.updateButton.bind(this));
    this.video.addEventListener('timeupdate', this.handleProgress.bind(this));
    this.skipButtons.forEach(button => button.addEventListener('click', this.skip.bind(this)));
    this.volume.addEventListener('change', this.handleRangeUpdate.bind(this));
    this.mousedown = false;
    this.progress.addEventListener('click', this.backForward.bind(this));
    this.progress.addEventListener('mousemove', (e) => this.mousedown && this.backForward(e));
    this.progress.addEventListener('mousedown', () => this.mousedown = true);
    this.progress.addEventListener('mouseup', () => this.mousedown = false);
  }

  loadVideo(url){
    this.videoPlayer.src = url;
  }

  togglePlay() {
    const method = this.video.paused ? 'play' : 'pause';
    socket.getConnection().send(JSON.stringify({typeMessage:method, message:method}));
  }
  
  updateButton() {
    const icon = this.video.paused ? '►' : '❚ ❚';
    this.toggle.textContent = icon;
  }

  skip(e) { 
    socket.getConnection().send(JSON.stringify({typeMessage:"skip", message: e.target.dataset.skip}));
  }
   
  handleRangeUpdate(e) {  
     this.video['volume'] = e.target.value;
     if( this.video['volume'] > 0) {
     this.video.muted = false;
     } else {
     this.video.muted = true;
     }
   }
   
   handleProgress() {
     const percent = (this.video.currentTime / this.video.duration) * 100;
     this.progressBar.style.flexBasis = `${percent}%`;
   }

   backForward(e) {
     const time = (e.offsetX / this.progress.offsetWidth) * this.video.duration;
    // this.video.currentTime = time;
    socket.getConnection().send(JSON.stringify({typeMessage:"backForward", message: time}));
   }
}

export default new VideoPlayer();