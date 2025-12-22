// Данные отзывов (можно оставить те же)
const reviewsData = [
    {
        id: 1,
        name: "Алина Смаилова",
        score: "8.0",
        details: "Writing: 7.5 | Speaking: 8.5",
        text: "Курс JUZ40 (Edvance) дал мне четкую структуру. На реальном экзамене я использовала шаблоны из Writing Module, и это сэкономило кучу времени. Speaking практиковали каждый урок, поэтому страха перед экзаменатором не было вообще.",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Данияр Алиев",
        score: "7.5",
        details: "Listening: 8.5 | Reading: 8.0",
        text: "Я пришел с уровнем Intermediate и целью 6.5, но методика Model 1 работает чудесно. Особенно помогли разборы ловушек в Listening. Платформа удобная, домашку проверяют быстро и дают детальный фидбек.",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Камила Нургали",
        score: "8.5",
        details: "Academic Module | Поступление в США",
        text: "Самое сильное в курсе — это Mock Tests. Они точь-в-точь как настоящий экзамен. Когда я пришла на реальный IELTS, у меня было ощущение дежавю. Я знала каждый тип вопроса и тайминг. Результат превзошел ожидания!",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Санжар К.",
        score: "7.0",
        details: "Срок подготовки: 1 месяц",
        text: "У меня было очень мало времени. Индивидуальный тариф позволил сфокусироваться только на моих слабых местах — эссе и грамматике. Ментор буквально за руку довел меня до нужного балла для магистратуры.",
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

const reviewsTabsContainer = document.getElementById('reviewsTabs');
const reviewBody = document.getElementById('reviewBody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let isAnimating = false; // Защита от быстрых кликов

function initReviews() {
    // Создаем табы
    reviewsData.forEach((review, index) => {
        const tab = document.createElement('div');
        tab.classList.add('review-tab');
        if (index === 0) tab.classList.add('active');
        
        tab.innerHTML = `<img src="${review.img}" alt="${review.name}">`;
        
        tab.addEventListener('click', () => {
            if (currentIndex !== index && !isAnimating) {
                changeReview(index);
            }
        });
        
        reviewsTabsContainer.appendChild(tab);
    });

    // Отрисовываем первый слайд сразу
    renderContent(0);
}

// Функция для плавной смены слайда
function changeReview(index) {
    if (isAnimating) return;
    isAnimating = true;

    const contentItem = document.querySelector('.review-item');
    contentItem.classList.add('hidden'); // Запускаем анимацию исчезновения

    // Ждем окончания анимации исчезновения (400ms как в CSS)
    setTimeout(() => {
        currentIndex = index;
        renderContent(currentIndex);
        updateActiveTab(currentIndex);
        
        // Небольшая задержка перед появлением, чтобы браузер успел отрисовать новый DOM
        requestAnimationFrame(() => {
            const newItem = document.querySelector('.review-item');
            newItem.classList.remove('hidden'); // Запускаем анимацию появления
            
            setTimeout(() => {
                isAnimating = false;
            }, 400); // Ждем окончания анимации появления
        });
    }, 400);
}

function renderContent(index) {
    const data = reviewsData[index];
    // Обрати внимание: мы сразу создаем элемент с классом hidden, если это не первая загрузка
    const hiddenClass = isAnimating ? 'hidden' : ''; 
    
    reviewBody.innerHTML = `
        <div class="review-item ${hiddenClass}">
            <div class="review-image-wrapper">
                <img src="${data.img}" alt="${data.name}" class="main-photo">
                <div class="play-btn"><i class="fas fa-play"></i></div>
            </div>
            <div class="review-text-content">
                <div class="review-header">
                    <h3>${data.name}</h3>
                    <span class="ielts-badge">IELTS ${data.score}</span>
                </div>
                <p class="student-detail">${data.details}</p>
                <p class="review-quote">"${data.text}"</p>
                <span class="read-more">Толығырақ оқу</span>
            </div>
        </div>
    `;
}

function updateActiveTab(index) {
    const tabs = document.querySelectorAll('.review-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[index].classList.add('active');
}

// Listeners
prevBtn.addEventListener('click', () => {
    if(!isAnimating) {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = reviewsData.length - 1;
        changeReview(newIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if(!isAnimating) {
        let newIndex = currentIndex + 1;
        if (newIndex >= reviewsData.length) newIndex = 0;
        changeReview(newIndex);
    }
});

document.addEventListener('DOMContentLoaded', initReviews);


document.addEventListener('DOMContentLoaded', () => {
    // Логика для слайдера тарифов
    const container = document.getElementById('pricingContainer');
    const leftBtn = document.getElementById('slideLeft');
    const rightBtn = document.getElementById('slideRight');

    if (container && leftBtn && rightBtn) {
        rightBtn.addEventListener('click', () => {
            // Листаем вправо на ширину карточки + отступ
            const scrollAmount = container.querySelector('.pricing-card').offsetWidth + 15;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        leftBtn.addEventListener('click', () => {
            // Листаем влево
            const scrollAmount = container.querySelector('.pricing-card').offsetWidth + 15;
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
});