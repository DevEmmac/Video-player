const video = document.querySelector('.video');
const player = document.querySelector('.player');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const volumeBar = document.querySelector('.volume-bar');
const volumeRange = document.querySelector('.volume-range');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullScreenBtn = document.querySelector('.fullscreen');
const expand = document.querySelector('.fa-expand-wide');

let id = (id) => document.getElementById(id);
    let playbtn = id('play-btn'),
        volumeIcon = id('volume-icon');

// Play and Paused ------------------------------------ //
 function showPlayIcon () {
    playbtn.classList.replace('fa-pause', 'fa-play');
    playbtn.setAttribute('title', 'play');var elem = document.documentElement;

    /* View in fullscreen */
    function openFullscreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }
    
    /* Close fullscreen */
    function closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }

 }
    function toggleToPlay () {
    if (video.paused) {
        video.play();
        playbtn.classList.replace('fa-play', 'fa-pause');
        playbtn.setAttribute('title', 'pause');
    } else {
        video.pause();
        showPlayIcon();
    }
};

// On video End, show play button icon
video.addEventListener('ended', showPlayIcon);

// pregress bar ---------------------------------- //

// Calculate display time format ----------------- //
  function displayTime (time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

// Update progresss bar as video plays --------------- //
function updateProgress() {
   progressBar.style.width= `${(video.currentTime / video.duration) * 100}%`
   currentTime.textContent = `${displayTime(video.currentTime)} /`;
   duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video

function setProgress (e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration
    // console.log(newTime);
}

// change Playback Speed ----------------------------- //
function changeSpeed () {
    video.playbackRate = speed.value;
}


// Volume Controls -------------------------- //
let lastVolume = 1;


// Volume Bar ------------------------  //
function changeVolume (e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    //  Rounding volume up and down
    if (volume < 0.1) {
        volume = 0;
    }

    if (volume > 0.9) {
        volume = 1;
    }

    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    // Change icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-off');
    }
    lastVolume = volume;
}

//  Mute/Unmute
function toggleMute () {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fa-solid', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fa-solid', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Fullscreen ---------------- //
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}


let fullscreen = false;

// Toggle FullScreen
function toggleFullscreen () {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}


// Event Listener --------------- //
playbtn.addEventListener('click', toggleToPlay);
video.addEventListener('click', toggleToPlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullScreenBtn.addEventListener('click', toggleFullscreen);

