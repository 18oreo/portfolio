// preloader 
window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('fade-out');
});

// ===== Contact form: send via Web3Forms =====
// Sends the message straight to your inbox. Web3Forms also supports
// a free "Auto Responder" (thank-you email back to the visitor) —
// enable it from your Web3Forms dashboard under this access key's
// settings if you'd like that too.
const contactForm = document.getElementById('contactForm');
const contactSubmitBtn = document.getElementById('contactSubmitBtn');
const formStatus = document.getElementById('formStatus');

const setFormStatus = (message, type) => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
};

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        formData.append('access_key', '5b4d3a2b-1adf-49f0-a19c-2ffe0d004bbf');
        formData.append('subject', `New portfolio message: ${formData.get('subject') || 'No subject'}`);
        formData.append('from_name', 'Portfolio Contact Form');

        const originalText = contactSubmitBtn.textContent;
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.textContent = 'Sending...';
        setFormStatus('', '');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData
            });
            const data = await response.json();

            if (response.ok && data.success) {
                setFormStatus('Thanks! Your message has been sent — I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                setFormStatus('Error: ' + (data.message || 'Something went wrong.'), 'error');
            }
        } catch (error) {
            console.error('Web3Forms error:', error);
            setFormStatus('Something went wrong. Please try again or email me directly.', 'error');
        } finally {
            contactSubmitBtn.disabled = false;
            contactSubmitBtn.textContent = originalText;
        }
    });
}

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