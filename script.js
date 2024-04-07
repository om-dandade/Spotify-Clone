console.log("Welcome to spotify");

//variables
let curSong = 0;
let playButton = document.getElementById("playButton");
let progressBar = document.getElementById("progressBar");
let playAnimation = document.getElementById("playAni");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemButton = Array.from(document.getElementsByClassName("songItemButton"));
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");

let songs = [
    {songName:"Let me love you - Justin Beiber", songPath:"https://pagal-world.com.in/files/download/id/659", coversPath:"Assets/covers/1.jpg"},
    {songName:"Sparkle - Your Name", songPath:"https://pagallworld.co.in/wp-content/uploads/2023/12/Your-Name-Sparkle.mp3", coversPath:"Assets/covers/2.jpg"},
    {songName:"Sorry - Justin Beiber", songPath:"https://musicdownload.cc/files/download/id/97", coversPath:"Assets/covers/3.jpg"},
    {songName:"Baby - Justin Beiber", songPath:"https://pagalworlld.com/files/download/id/4702", coversPath:"Assets/covers/4.jpg"},
    {songName:"Piches - Justin Beiber", songPath:"https://pagalsongs.com.in/files/download/id/622", coversPath:"Assets/covers/5.jpg"},
    {songName:"STAY - Justin Beiber", songPath:"https://pagaliworld.com/files/download/id/3743", coversPath:"Assets/covers/6.jpg"},
]
let audioElement = new Audio(songs[0].songPath);

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

const songInfo = document.querySelector(".songInfo a");
const updateAndPlay = ()=>{
    audioElement.src = songs[curSong].songPath;
    audioElement.play();
    console.log(songInfo.textContent);
    songInfo.textContent = songs[curSong].songName;
    playCurSongAni();
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
