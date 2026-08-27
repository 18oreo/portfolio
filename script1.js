// preloader 
window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('fade-out');
});

// music button
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

// cursor effect
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

document.querySelectorAll('a,button, .project-item, .service-card').forEach(element =>{
    element.addEventListener('mouseenter',()=>{
        cursor.classList.add('active');
    });

    element.addEventListener('mouseleave',()=>{
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    })
})

// Add this to your existing event listeners
document.querySelectorAll('.certificate-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('certificate-hover');
        cursorFollower.classList.add('certificate-hover');
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('certificate-hover');
        cursorFollower.classList.remove('certificate-hover');
    });
});

// project filter button    
const filterButton = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButton.forEach(button =>{
    button.addEventListener('click',()=>{
        filterButton.forEach(btn=>btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');

        projectItems.forEach(item => {
            if(filterValue === 'all'||item.getAttribute('data-category') === filterValue){
                item.style.display = 'block';
            } else {
                item.style.display ='none';
            }
        });
    });
});

// back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll',()=>{
    if(window.pageYOffset>300){
        backToTop.classList.add('active');
    }else{
        backToTop.classList.remove('active')
    }
});

// mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelectorAll('.navbar .nav-link');

if (menuToggle && navContainer) {
    menuToggle.addEventListener('click', () => {
        navContainer.classList.toggle('menu-open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('menu-open');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });
}