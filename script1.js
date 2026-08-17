window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('fade-out');
});

const musicButton = document.querySelector('.music-btn');
const music = document.getElementById('background-music');
const musicLabel = document.querySelector('.music-label');

const musicBtn = document.getElementById('musicBtn')
const bgMusic = document.getElementById('bgMusic')

musicBtn.addEventListener("click",()=>{
    if(bgMusic.pause){
        bgMusic.play();
        musicBtn.classList.add("playing")
    } else {
        bgMusic.pause();
        musicBtn.classList.remove("playing")
    }
})
