const noBtn = document.getElementById('noBtn');
const heartsContainer = document.querySelector('.hearts');
const sparklesContainer = document.querySelector('.sparkles');
const confettiContainer = document.querySelector('.confetti-container');
const bgMusic = document.getElementById('bgMusic');

const noMessages = [
    'Please? 🥺',
    'You can’t escape destiny 💘',
    'Heartbreak detected 💔',
    'Love police incoming 🚨',
    'Illegal levels of cuteness 😭',
    'This button refuses rejection 😎',
    'Mission failed successfully 😭'
];

const questions = [
    {
        title:'🌞 MONDAY',
        question:'What was your first thought when you saw me? 😏',
        answers:['Cute 😇','Dangerously attractive 😳','Main character energy ✨']
    },
    {
        title:'🌮 TUESDAY',
        question:'Choose our chaotic lunch combo 🍟',
        answers:['Pizza & milkshakes 🍕','Fancy pasta 🍝','Burger madness 🍔','Kota Madness']
    },
    {
        title:'🌌 WEDNESDAY',
        question:'Pick our dream romantic universe ✨',
        answers:['Picnic on a sunset 🌅','Arcade chaos 🎮','Rootop dinner 🌃']
    },
    {
        title:'😈 THURSDAY',
        question:'How dangerous is your smile? 😳',
        answers:['Cute 😇','Deadly 💘','Illegal 😭']
    },
    {
        title:'😂 FRIDAY',
        question:'If we get lost together what happens first?',
        answers:['We survive 😎','We panic 😂','We become TikTok famous 🎥']
    },
    {
        title:'🥪 SATURDAY',
        question:'Solve the lunch riddle below to unlock the date 🍽️',
        answers:['I am ready 😌']
    },
    {
        title:'🌙 SUNDAY',
        question:'Ready for the best date of your life? 💖',
        answers:['ABSOLUTELY 😭','1000% YES 💘','I have been waiting 😎']
    }
];

let currentQuestion = 0;
let butterfly = 0;
let noIndex = 0;

function typeWriter(element, text, speed = 40){

    let i = 0;

    element.innerHTML = '';

    const interval = setInterval(() => {

        element.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){
            clearInterval(interval);
        }

    }, speed);

}

window.onload = () => {

    typeWriter(
        document.getElementById('typeText'),
        'Initializing Love Protocol... 💖 Scanning for cuteness... 100% adorable confirmed 😭'
    );

    renderQuestion();

};

noBtn.addEventListener('mouseenter', () => {

    noBtn.innerText = noMessages[noIndex];

    noIndex = (noIndex + 1) % noMessages.length;

    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.rotate = `${Math.random() * 40 - 20}deg`;

});

function sayYes(){

    navigator.vibrate?.(200);

    document.getElementById('loveFill').style.width = '100%';

    createConfetti();

    const name = document.getElementById('nameInput').value || 'Beautiful';

    localStorage.setItem('romanticName', name);

    document.getElementById('welcomeText').innerHTML = `🥹💖 ${name}, YOU UNLOCKED THE LOVE QUEST?!`;

    document.getElementById('step1').classList.add('hidden');

    document.getElementById('step2').classList.remove('hidden');

    setTimeout(() => {

        document.getElementById('step2').classList.add('hidden');

        document.getElementById('step3').classList.remove('hidden');

    }, 2500);

}

function renderQuestion(){

    const q = questions[currentQuestion];

    if(!q) return;

    document.getElementById('questionTitle').innerHTML = q.title;

    document.getElementById('questionText').innerHTML = q.question;

    const buttons = document.getElementById('answerButtons');

    buttons.innerHTML = '';

    q.answers.forEach(answer => {

        const btn = document.createElement('button');

        btn.className = 'yes-btn';

        btn.innerText = answer;

        btn.onclick = () => nextQuestion();

        buttons.appendChild(btn);

    });

}

function nextQuestion(){

    butterfly += 15;

    document.getElementById('butterflyLevel').innerText = butterfly + '%';

    createConfetti();

    currentQuestion++;

    if(currentQuestion < questions.length){

        renderQuestion();

    }

}

function checkRiddle(){

    const answer = document.getElementById('riddleAnswer').value.toLowerCase();

    if(answer.includes('pizza')){

        createConfetti();

        document.getElementById('dateSection').classList.remove('hidden');

        alert('🍕 Correct! Legendary lunch unlocked 💘');

    }else{

        alert('😭 Wrong answer. The pizza gods are disappointed.');

    }

}

function confirmDate(){

    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;

    if(date === '' || time === ''){

        alert('Please select a date and time 💖');

        return;

    }

    document.getElementById('finalDate').innerText = date;
    document.getElementById('finalTime').innerText = time;

    document.getElementById('step3').classList.add('hidden');

    document.getElementById('step4').classList.remove('hidden');

    startCountdown(date, time);

}

function startCountdown(date, time){

    const targetDate = new Date(`${date} ${time}`).getTime();

    const interval = setInterval(() => {

        const now = new Date().getTime();

        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML =
        `💖 ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if(distance < 0){

            clearInterval(interval);

            document.getElementById('countdown').innerHTML =
            `💘 IT'S DATE TIME 💘`;

        }

    }, 1000);

}

function toggleDarkMode(){

    document.body.classList.toggle('dark');

}

function toggleMusic(){

    if(bgMusic.paused){
        bgMusic.play();
    }else{
        bgMusic.pause();
    }

}

setInterval(() => {

    const heart = document.createElement('div');

    heart.classList.add('heart');

    heart.innerHTML = '💖';

    heart.style.left = Math.random() * 100 + 'vw';

    heart.style.fontSize = Math.random() * 25 + 15 + 'px';

    heart.style.animationDuration = Math.random() * 3 + 4 + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);

}, 500);

function createConfetti(){

    for(let i = 0; i < 150; i++){

        const confetti = document.createElement('div');

        confetti.classList.add('confetti');

        confetti.style.left = Math.random() * 100 + 'vw';

        confetti.style.background =
        `hsl(${Math.random() * 360},100%,50%)`;

        confetti.style.animationDuration =
        Math.random() * 3 + 2 + 's';

        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);

    }

}

function sendWhatsApp(){

    // IMPORTANT:
    // Replace with your REAL WhatsApp number.
    // Example South Africa: 27831234567

    const yourNumber = '27670535880';

    const savedName = localStorage.getItem('romanticName') || 'Someone Cute';

    const date = document.getElementById('finalDate').innerText;

    const time = document.getElementById('finalTime').innerText;

    const message = encodeURIComponent(
        `💖 DATE CONFIRMATION 💖

👑 Name: ${savedName}
📅 Date: ${date}
⏰ Time: ${time}

🥹 I accepted the legendary lunch date.`
    );

    // Mobile + Desktop compatible WhatsApp redirect
    const whatsappURL = `https://api.whatsapp.com/send?phone=${yourNumber}&text=${message}`;

    window.location.href = whatsappURL;

}

// Cursor sparkles

document.addEventListener('mousemove', (e) => {

    const sparkle = document.createElement('div');

    sparkle.classList.add('sparkle');

    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';

    sparklesContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);

});
