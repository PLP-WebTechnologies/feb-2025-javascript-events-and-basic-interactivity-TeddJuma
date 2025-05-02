document.addEventListener('DOMContentLoaded', () => {
    // Color Changing Button
    const colorChanger = document.getElementById('colorChanger');
    colorChanger.addEventListener('click', () => {
        const hue = Math.floor(Math.random() * 360);
        document.body.style.backgroundColor = `hsl(${hue}, 50%, 90%)`;
    });

    // Image Gallery
    let currentImage = 1;
    const galleryImage = document.getElementById('galleryImage');
    
    function updateImage() {
        galleryImage.src = `https://picsum.photos/400/300?random=${currentImage}`;
        galleryImage.style.transform = 'scale(0.95)';
        setTimeout(() => galleryImage.style.transform = 'scale(1)', 100);
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentImage = currentImage > 1 ? currentImage - 1 : 10;
        updateImage();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentImage = currentImage < 10 ? currentImage + 1 : 1;
        updateImage();
    });

    // Tabs Functionality
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab, .tab-content').forEach(el => {
                el.classList.remove('active', 'show');
            });
            tab.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${tab.dataset.tab}"]`)
                .classList.add('show');
        });
    });

    // Form Validation
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm();
    });

    function validateForm() {
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let isValid = true;

        if(username.value.length < 4) {
            showError(usernameError, 'Username must be at least 4 characters');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email.value)) {
            showError(emailError, 'Please enter a valid email');
            isValid = false;
        }

        if(password.value.length < 8) {
            showError(passwordError, 'Password must be at least 8 characters');
            isValid = false;
        }

        if(isValid) {
            alert('Form submitted successfully! 🎉');
            form.reset();
        }
    }

    // Real-time Validation
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            validateForm();
        });
    });

    // Modal Functionality
    const secretModal = document.getElementById('secretModal');
    const closeModal = document.getElementById('closeModal');

    galleryImage.addEventListener('dblclick', () => {
        secretModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        secretModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === secretModal) {
            secretModal.style.display = 'none';
        }
    });

    // Konami Code (↑↑↓↓←→←→BA)
    let konamiCode = [];
    const secretCode = [38,38,40,40,37,39,37,39,66,65];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if(konamiCode.toString().includes(secretCode)) {
            document.body.classList.add('konami');
            setTimeout(() => document.body.classList.remove('konami'), 3000);
            konamiCode = [];
        }
    });

    // Secret Code Entry with Confetti
    const keyInput = document.getElementById('keyInput');
    const secretMessage = document.getElementById('secretMessage');

    keyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && keyInput.value.toLowerCase() === 'secret') {
            secretMessage.classList.remove('hidden');
            triggerConfetti();
        }
    });
});

function showError(element, message) {
    element.textContent = message;
    element.style.opacity = '1';
    setTimeout(() => element.style.opacity = '0', 2000);
}

function triggerConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    const emojis = ['🎉', '✨', '🎈', '🎊', '💫'];

    // Color Confetti
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }

    // Emoji Confetti
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-confetti';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.fontSize = Math.random() * 20 + 10 + 'px';
        emoji.style.animation = `fall-and-spin ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 5000);
    }
}
