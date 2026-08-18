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
    if (bgmusic.paused) {
        try {
            await bgmusic.play();
        } catch (error) {
            console.error('Music could not be played:', error);
            setMusicButtonState(false);
        }
    } else {
        bgmusic.pause();
    }
});
