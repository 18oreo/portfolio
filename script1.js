window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('fade-out');
});

const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgmusic');

const setMusicButtonState = (isPlaying) => {
    musicBtn.classList.toggle('playing', isPlaying);
    musicBtn.setAttribute('aria-pressed', String(isPlaying));
    musicBtn.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
};

bgMusic.addEventListener('play', () => setMusicButtonState(true));
bgMusic.addEventListener('pause', () => setMusicButtonState(false));
bgMusic.addEventListener('ended', () => setMusicButtonState(false));

musicBtn.addEventListener('click', async () => {
    if (bgMusic.paused) {
        try {
            await bgMusic.play();
        } catch (error) {
            console.error('Music could not be played:', error);
            setMusicButtonState(false);
        }
    } else {
        bgMusic.pause();
    }
});

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follow');

document.addEventListener('mousemove',(e)=>{
    cursor.style.left = e.clientX+'px';
    cursor.style.top = e.clientY+'px';

    setTimeout(()=>{
        cursorFollower.style.left = e.clientX+'px';
        cursorFollower.style.top=e.clientY+'px';
    },100);
});

document.querySelectorAll('a,button, .portfolio-item, .service-card').forEach(element =>{
    element.addEventListener('mouseenter',()=>{
        cursor.classList.add('active');
    });

    element.addEventListener('mouseleave',()=>{
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    })
})
