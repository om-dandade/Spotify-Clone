console.log("Welcome to spotify");

//variables
let curSong = 0;
let audioElement = new Audio("Assets/songs/1.mp3");
let playButton = document.getElementById("playButton");
let progressBar = document.getElementById("progressBar");
let playAnimation = document.getElementById("playAni");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemButton = Array.from(document.getElementsByClassName("songItemButton"));
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");

let songs = [
    {songName:"Let me love you - Justin Beiber", songPath:"Assets/songs/1.mp3", coversPath:"Assets/covers/1.jpg"},
    {songName:"Your Name - Kimeno Nava", songPath:"Assets/songs/2.mp3", coversPath:"Assets/covers/2.jpg"},
    {songName:"Sorry - Justin Beiber", songPath:"Assets/songs/3.mp3", coversPath:"Assets/covers/3.jpg"},
    {songName:"Baby - Justin Beiber", songPath:"Assets/songs/4.mp3", coversPath:"Assets/covers/4.jpg"},
    {songName:"Piches - Justin Beiber", songPath:"Assets/songs/5.mp3", coversPath:"Assets/covers/5.jpg"},
    {songName:"STAY - Justin Beiber", songPath:"Assets/songs/6.mp3", coversPath:"Assets/covers/6.jpg"},
    {songName:"Let me love you - Justin Beiber", songPath:"Assets/songs/7.mp3", coversPath:"Assets/covers/7.jpg"},
    {songName:"Let me love you - Justin Beiber", songPath:"Assets/songs/8.mp3", coversPath:"Assets/covers/8.jpg"},
    {songName:"Let me love you - Justin Beiber", songPath:"Assets/songs/9.mp3", coversPath:"Assets/covers/9.jpg"},
    {songName:"Let me love you - Justin Beiber", songPath:"Assets/songs/10.mp3", coversPath:"Assets/covers/10.jpg"},
]

//updating page content
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coversPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
});

//Handle actions
//main play-pause button
playButton.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        playCurSongAni();
        audioElement.play();
    }
    else{
        audioElement.pause();
        pauseCurSongAni();
    }
})

//helper funtion
const pauseCurSongAni = ()=>{
    songItemButton[curSong].classList.remove("fa-pause");
    songItemButton[curSong].classList.add("fa-play");
    playButton.classList.remove("fa-circle-pause");
    playButton.classList.add("fa-circle-play");
    playAnimation.style.opacity = 0;
}

const playCurSongAni = ()=>{
    songItemButton[curSong].classList.remove("fa-play");
    songItemButton[curSong].classList.add("fa-pause");
    playButton.classList.remove("fa-circle-play");
    playButton.classList.add("fa-circle-pause");
    playAnimation.style.opacity = 1;
}

const updateAndPlay = ()=>{
    playCurSongAni();
    audioElement.src = songs[curSong].songPath;
    audioElement.play();
}

//play from song list
songItemButton.forEach(element =>{
    element.addEventListener("click", (e)=>{
        if(e.target.id != curSong || audioElement.paused || audioElement.currentTime <= 0){
            pauseCurSongAni();
            curSong = e.target.id;
            updateAndPlay();
        }
        else{
            audioElement.pause();
            pauseCurSongAni();
        }
    })
})

//update seekbar
audioElement.addEventListener("timeupdate", ()=>{
    progress = parseInt(audioElement.currentTime/audioElement.duration * 100);
    progressBar.value = progress;
})

//seek song using progressBar
progressBar.addEventListener("change", ()=>{
    audioElement.currentTime = progressBar.value / 100 * audioElement.duration;
})

//forward and backward
backward.addEventListener("click", ()=>{
    pauseCurSongAni();
    curSong = (curSong - 1 + songItemButton.length) % songItemButton.length;
    updateAndPlay();
})

forward.addEventListener("click", ()=>{
    pauseCurSongAni();
    curSong = (curSong + 1) % songItemButton.length;
    updateAndPlay();
})
