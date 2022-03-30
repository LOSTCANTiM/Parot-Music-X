const child_process = require('child_process');
const fs = require('fs');

var audio = new Audio();
audio.src = 'audios/Arcane Intro.webm';

function play() {
    if (audio.paused) {
        document.getElementById('play').innerHTML = '<i class="fa-solid fa-pause"></i>';
        audio.play();
    }
    else {
        document.getElementById('play').innerHTML = '<i class="fa-solid fa-play"></i>';
        audio.pause();
    }
}

window.onload = () => {
    var slider = document.getElementById('sSlider');
    slider.onclick = () => {
        audio.currentTime = slider.value;
    }
    audio.ontimeupdate = function () {
        slider.setAttribute('max', parseInt(audio.duration));
        slider.value = parseInt(audio.currentTime);
    }
}
