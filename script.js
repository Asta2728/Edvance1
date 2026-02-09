const reviews = [
    {
        name: "Алина С.",
        score: "IELTS 8.0",
        quote: "Я проходил 3 месяца но проделал жесткий прогресс с 6.0 до 7.0. Учились оч интенсивно но эффективно, постоянно делали дз, учили формат экзамена, все лайфхаки к нему и тд. \n\nВ итоге пришел на экзамен 100% готовым. Спасибо за обучение!",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
        name: "Данияр А.",
        score: "IELTS 7.5",
        quote: "Курс прям объемный и мне это понравилось. Была от этого нагрузка постоянная но по итогу научился многому. \n\nМне лично помогли разные методики  которые давали, такие как skimming, scanning  прям разбирали все и эффективно мог пременять потом",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
        name: "Камила Н.",
        score: "IELTS 8.5",
        quote: "Курс был очень полезный, полностью окупился результатом. Материал был очень полезный помогло на самом эказмене. \n\nНапример давали списки слов и они  много встерчались на самом экзамене. Тютор реально старался, давала много практических задач на уроках и как дз. \n\nОбъяснгили все типы вопросов в каждой части на самом эказамене был такой же точно формат как и давали на уроках. Все классно!!",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    
    /* === 1. Анимации при скролле (Fade In) === */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    /* === 2. Мобильное меню (Бургер) === */
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        burger.classList.toggle('toggle');
        navMenu.classList.toggle('nav-active');
    }

    if(burger) {
        burger.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('nav-active')) {
                toggleMenu();
            }
        });
    });

    /* === 3. Логика Отзывов (Табы) === */
    let currentReview = 0;
    const reviewContent = document.getElementById('reviewContent');
    const tabsContainer = document.getElementById('reviewsTabs');
    
    // Создание табов
    if (tabsContainer) {
        reviews.forEach((review, index) => {
            const tab = document.createElement('div');
            tab.className = `review-tab ${index === 0 ? 'active' : ''}`;
            tab.innerHTML = `<img src="${review.img}" alt="${review.name}">`;
            tab.addEventListener('click', () => loadReview(index));
            tabsContainer.appendChild(tab);
        });
    }

    function loadReview(index) {
        currentReview = index;
        
        document.querySelectorAll('.review-tab').forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });

        if(reviewContent) {
            reviewContent.style.opacity = '0';
            
            setTimeout(() => {
                reviewContent.innerHTML = `
                    <div class="review-item">
                        <img src="${reviews[index].img}" alt="${reviews[index].name}" class="review-avatar-large">
                        <div>
                            <div class="review-quote">${reviews[index].quote}</div>
                            <div class="score-badge">${reviews[index].score}</div>
                            <h4 style="margin-top:10px;">${reviews[index].name}</h4>
                        </div>
                    </div>
                `;
                reviewContent.style.opacity = '1';
            }, 200);
        }
    }

    // Инициализация первого отзыва
    if(reviewContent) loadReview(0);

    // Кнопки отзывов
    const prevReviewBtn = document.getElementById('prevReview');
    const nextReviewBtn = document.getElementById('nextReview');

    if (prevReviewBtn) {
        prevReviewBtn.addEventListener('click', () => {
            let newIndex = currentReview - 1;
            if (newIndex < 0) newIndex = reviews.length - 1;
            loadReview(newIndex);
        });
    }

    if (nextReviewBtn) {
        nextReviewBtn.addEventListener('click', () => {
            let newIndex = currentReview + 1;
            if (newIndex >= reviews.length) newIndex = 0;
            loadReview(newIndex);
        });
    }

    /* === 4. ОБНОВЛЕННАЯ Логика слайдера Тарифов (Pricing) === */
    /* Используем scrollBy, чтобы не конфликтовать со CSS-свайпом */
    const pricingContainer = document.getElementById('pricingContainer');
    const priceSlideLeft = document.getElementById('priceSlideLeft');
    const priceSlideRight = document.getElementById('priceSlideRight');
    
    if(pricingContainer && priceSlideLeft && priceSlideRight) {
        
        // Получаем ширину карточки динамически
        const getPriceScrollAmount = () => {
            const card = pricingContainer.querySelector('.pricing-card');
            return card ? card.offsetWidth + 20 : 350; // +20 на gap
        };

        priceSlideLeft.addEventListener('click', () => {
            pricingContainer.scrollBy({
                left: -getPriceScrollAmount(),
                behavior: 'smooth'
            });
        });

        priceSlideRight.addEventListener('click', () => {
            pricingContainer.scrollBy({
                left: getPriceScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    /* === 5. Слайдер Программы (Curriculum) === */
    const curriculumGrid = document.getElementById('curriculumGrid');
    const currLeftBtn = document.getElementById('currSlideLeft');
    const currRightBtn = document.getElementById('currSlideRight');

    if (curriculumGrid && currLeftBtn && currRightBtn) {
        // Функция прокрутки на ширину карточки + отступ
        const getCurrScrollAmount = () => {
            const card = curriculumGrid.querySelector('.course-card');
            return card ? card.offsetWidth + 20 : 300; 
        };

        currLeftBtn.addEventListener('click', () => {
            curriculumGrid.scrollBy({
                left: -getCurrScrollAmount(),
                behavior: 'smooth'
            });
        });

        currRightBtn.addEventListener('click', () => {
            curriculumGrid.scrollBy({
                left: getCurrScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    /* === 6. Форма заявки (Email - FormSubmit) === */
    const form = document.getElementById('leadForm');
    const submitBtn = document.querySelector('#leadForm button[type="submit"]');

    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page refresh

            // 1. Visual Feedback (Loading)
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Отправка...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            // 2. Gather Data
            const formData = new FormData(form);

            // 3. Send Data
            // REPLACE 'YOUR_EMAIL_HERE' BELOW WITH YOUR ACTUAL EMAIL
            fetch("https://formsubmit.co/ajax/edvance.online1@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Success
                submitBtn.innerText = "Заявка отправлена!";
                submitBtn.style.backgroundColor = "#28a745"; // Green
                submitBtn.style.borderColor = "#28a745";
                submitBtn.style.color = "#fff";
                form.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                    submitBtn.style.backgroundColor = ""; // Revert to CSS default
                    submitBtn.style.borderColor = "";
                    submitBtn.style.color = ""; 
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerText = "Ошибка!";
                submitBtn.style.backgroundColor = "#dc3545"; // Red
                
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                    submitBtn.style.backgroundColor = "";
                }, 3000);
            });
        });
    }
});