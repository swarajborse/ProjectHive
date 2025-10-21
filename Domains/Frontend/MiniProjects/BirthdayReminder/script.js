const nameInput = document.getElementById('name');
const birthdateInput = document.getElementById('birthdate');
const addBtn = document.getElementById('add-birthday-btn');
const birthdayList = document.getElementById('birthday-list');
const confettiCanvas = document.getElementById('confetti-canvas');

// --- Confetti Logic ---
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
const colors = ["#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#8b5cf6", "#6366f1", "#3b82f6", "#0ea5e9", "#06b6d4", "#14b8a6"];

function startConfetti() {
    confettiCanvas.style.display = 'block';
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiParticles = [];
    for (let i = 0; i < 200; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * -confettiCanvas.height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2,
            tilt: Math.random() * 10 - 5
        });
    }
    animateConfetti();
    setTimeout(() => {
        confettiCanvas.style.display = 'none';
    }, 5000);
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach((p, i) => {
        p.y += p.speed;
        p.x += Math.sin(p.y / 20) * 2;
        p.angle += p.tilt / 100;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > confettiCanvas.height) {
            confettiParticles.splice(i, 1);
        }
    });

    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiCanvas.style.display = 'none';
    }
}

// --- App Logic ---
function getBirthdays() {
    return JSON.parse(localStorage.getItem('birthdays')) || [];
}

function saveBirthdays(birthdays) {
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
}

function calculateDaysLeft(birthdate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const birthDate = new Date(birthdate);
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const timeDiff = nextBirthday.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function displayBirthdays() {
    birthdayList.innerHTML = '';
    let birthdays = getBirthdays();

    birthdays = birthdays.map(b => ({ ...b, daysLeft: calculateDaysLeft(b.date) }));
    birthdays.sort((a, b) => a.daysLeft - b.daysLeft);

    if (birthdays.length === 0) {
        birthdayList.innerHTML = '<p class="text-center text-gray-500">No birthdays added yet.</p>';
        return;
    }
    
    let isBirthdayToday = false;

    birthdays.forEach(birthday => {
        const daysLeft = birthday.daysLeft;
        const formattedDate = new Date(birthday.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        
        let countdownText = '';
        let bgColor = 'bg-white';
        let textColor = 'text-gray-800';
        
        if (daysLeft === 0) {
            countdownText = `<span class="font-bold text-lg text-rose-500">🎉 It's Today! Happy Birthday!</span>`;
            bgColor = 'bg-rose-100';
            isBirthdayToday = true;
        } else if (daysLeft === 1) {
            countdownText = `<span class="font-bold">${daysLeft} day</span> left`;
        } else {
            countdownText = `<span class="font-bold">${daysLeft} days</span> left`;
        }
        
        const item = document.createElement('div');
        item.className = `birthday-item flex items-center justify-between p-3 ${bgColor} rounded-lg shadow-sm transition-all`;
        
        item.innerHTML = `
            <div>
                <p class="font-semibold ${textColor}">${birthday.name}</p>
                <p class="text-sm text-gray-500">${formattedDate}</p>
            </div>
            <div class="flex items-center space-x-4">
                <p class="text-sm text-gray-600 text-right">${countdownText}</p>
                <button data-id="${birthday.id}" class="delete-btn text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        `;
        
        birthdayList.appendChild(item);
    });

    if (isBirthdayToday) {
        startConfetti();
    }
}

addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const date = birthdateInput.value;

    if (name && date) {
        const birthdays = getBirthdays();
        const newBirthday = {
            id: Date.now(),
            name,
            date
        };
        birthdays.push(newBirthday);
        saveBirthdays(birthdays);
        
        nameInput.value = '';
        birthdateInput.value = '';
        displayBirthdays();
    } else {
        alert('Please enter both name and birthdate.');
    }
});

birthdayList.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('.delete-btn');
    if (deleteButton) {
        const idToDelete = parseInt(deleteButton.dataset.id);
        let birthdays = getBirthdays();
        birthdays = birthdays.filter(b => b.id !== idToDelete);
        saveBirthdays(birthdays);
        displayBirthdays();
    }
});

document.addEventListener('DOMContentLoaded', displayBirthdays);
