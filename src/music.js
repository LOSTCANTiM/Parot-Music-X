const child_process = require('child_process');
const fs = require('fs');

var audio = new Audio();

function getName(pName) {
    var name = pName.toString().replace('.mp3', '');
    name = name.replace('.webm', '');
    name = name.replace('.m4a', '');
    name = name.replace('.wav', '');
    return name
}

function loadSongs() {
    var dir = fs.readdirSync('src/audios');
    var sList = document.getElementById('sList');
    for (let index = 0; index < dir.length; index++) {
        var element = document.createElement('button');
        element.innerHTML = getName(dir[index]);
        element.setAttribute('onclick', 'playSong("'+dir[index]+'", this)')
        sList.appendChild(element);
    }
}

function toTime(cnv) {
    cnv = parseInt(cnv);
    var secondInt = cnv/60;
    var firstInt = cnv - parseInt(secondInt)*60;
    if (firstInt < 10) {
        firstInt = '0'+firstInt;
    }
    var returned = parseInt(secondInt)+':'+firstInt;
    return returned;
}

function playSong(songSrc, element) {
    var e = document.getElementById('playingRn');
    if (e != null){e.removeAttribute('id');}
    element.setAttribute('id', 'playingRn');
    audio.src = 'audios/'+songSrc;
    document.getElementById('sName').innerHTML = getName(songSrc);
    audio.pause();
    play();
}

function downloadSong() {
    var songLink = document.getElementById('sLink').value;
    const pyProcess = child_process.spawn('python', ['src/music.py', songLink]);
    pyProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });
}

function reloadSongs() {
    var sList = document.getElementById('sList');
    sList.remove();
    var newE = document.createElement('div');
    newE.setAttribute('id', 'sList');
    document.body.appendChild(newE);
    loadSongs();
}

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
    loadSongs();

    var slider = document.getElementById('sSlider');
    slider.addEventListener('mousedown', () => {
        audio.pause();
    });
    slider.addEventListener('mouseup', () => {
        audio.play();
        audio.currentTime = slider.value;
    });
    audio.ontimeupdate = function () {
        slider.setAttribute('max', parseInt(audio.duration));
        slider.value = parseInt(audio.currentTime);
        document.getElementById('sDur').innerHTML = toTime(audio.currentTime)+' / '+toTime(audio.duration);
    }
}
