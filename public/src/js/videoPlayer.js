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
    this.video.addEventListener('play', this.updateButton);
    this.video.addEventListener('pause', this.updateButton);
    this.skipButtons.forEach(button => button.addEventListener('click', this.skip));
    this.volume.addEventListener('change', this.handleRangeUpdate.bind(this));
    this.mousedown = false;
    this.progressM();
  }

  loadVideo(url){
    this.videoPlayer.src = url;
  }

  togglePlay() {
    const method = this.video.paused ? 'play' : 'pause';
    socket.getConnection().send(method);
  }
  
  updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    //this.toggle.textContent = icon;
  }

  skip() {
    this.video.currentTime += parseFloat(this.dataset.skip);
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
     const percent = (video.currentTime / video.duration) * 100;
     this.progressBar.style.flexBasis = `${percent}%`;
     
   }
   progressM(){
    this.progress.addEventListener('click', this.scrub);
    this.progress.addEventListener('mousemove', (e) => this.mousedown && this.scrub(e));
    this.progress.addEventListener('mousedown', () => this.mousedown = true);
    this.progress.addEventListener('mouseup', () => this.mousedown = false);
   }
   scrub(e) {
     const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
     this.video.currentTime = scrubTime;
   }
}

export default new VideoPlayer();