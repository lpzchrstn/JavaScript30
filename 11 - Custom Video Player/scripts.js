const progressBar = document.querySelector(".progress__filled");
const progressBarContainer = document.querySelector(".progress");
const playButton = document.querySelector(".toggle");
const volume = document.querySelector("input[name=volume]");
const speed = document.querySelector("input[name=playbackRate]");
const prevForwardButton = document.querySelectorAll("button[data-skip]");
const video = document.querySelector("video.viewer");

playButton.addEventListener( "click", togglePlayPause );
video.addEventListener( "click", togglePlayPause );
volume.addEventListener( "input", changeVolume );
speed.addEventListener( "input", changeSpeed );
video.addEventListener( "timeupdate", moveProgressBar );
progressBarContainer.addEventListener( "click", setProgress );

prevForwardButton.forEach( moveTime => moveTime.addEventListener( "click", moveVideoTime ));

function togglePlayPause() {
    playButton.innerText = video.paused ? "| |" : "►"; 
    video.paused ? video.play() : video.pause();
}

function moveVideoTime() {
    moveTimeInSeconds = parseInt( this.getAttribute( "data-skip" ));
    video.currentTime = video.currentTime + moveTimeInSeconds;
}

function changeVolume() {
    video.volume = this.value;
}

function changeSpeed() {
    video.playbackRate = this.value;
}

function moveProgressBar() {
    let progressInPercent = ( video.currentTime / video.duration ) * 100;
    progressBar.style.flexBasis = `${progressInPercent}%`;
}

function setProgress(e) {
    let progressInPercent = ( e.offsetX / progressBarContainer.offsetWidth ) * 100;
    video.currentTime = video.duration *  (progressInPercent / 100 ); 
}
