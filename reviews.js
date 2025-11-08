// reviews.js - Отображение статических отзывов
class ReviewsManager {
    constructor() {
        this.reviews = this.getStaticReviews();
        this.init();
    }

    // Статические отзывы
    getStaticReviews() {
        return [
            {
                id: 1,
                name: "Анна",
                rating: 5,
                product: "Торт Орео на 2 кг",
                text: "Заказывала торт на день рождения дочки. Все были в восторге! Шоколадный бисквит очень влажный, крем нежный, а печенье орео добавляет приятную хрустящую текстуру. Дети просто обожают этот торт, а взрослые оценили не слишком сладкий вкус.",
                date: "15.10.2025",
                photo: "фото тортов/3 кота.jpg"
            },
            {
                id: 2,
                name: "Мария",
                rating: 5,
                product: "Медовик на 1.5 кг",
                text: "Медовик - это просто песня! Коржи нежные, пропитанные, крем идеальной консистенции. Заказывала на семейное торжество, все просили контакты кондитера. Особенно понравилось, что торт не приторно сладкий.",
                date: "10.10.2025",
                photo: null
            },
            {
                id: 3,
                name: "Екатерина",
                rating: 5,
                product: "Торт Сникерс на 2 кг",
                text: "Это был лучший торт, который я пробовала! Сочетание шоколада, арахиса и карамели просто божественное. Особенно понравилась ореховая нуга - очень аутентичный вкус. Торт был большим, хватило на 15 человек.",
                date: "08.09.2025",
                photo: "фото тортов/1 сентября.jpg"
            },
            {
                id: 4,
                name: "Сергей",
                rating: 4,
                product: "Наполеон на 2 кг",
                text: "Хороший классический наполеон. Коржи хрустящие, крем не слишком сладкий. Единственное - хотелось бы больше крема между коржами. В целом очень достойно, будем заказывать ещё.",
                date: "05.09.2025",
                photo: "фото тортов/горы.jpg"
            },
            {
                id: 5,
                name: "Ольга",
                rating: 5,
                product: "Ягодный мусс на 1 кг",
                text: "Заказывала маленький торт для себя. Мусс просто восхитительный! Нежный, воздушный, с ярким вкусом клубники. Бисквит ванильный, влажный. Идеальное сочетание!",
                date: "01.07.2025",
                photo: null
            },
            {
                id: 6,
                name: "Дмитрий",
                rating: 5,
                product: "Торт с чёрной смородиной на 2.5 кг",
                text: "Заказывал торт на юбилей родителей. Все гости были в восторге! Сочетание шоколада и чёрной смородины - это нечто. Кислинка ягод идеально балансирует сладость. Очень рекомендую!",
                date: "28.05.2025",
                photo: null
            },
            {
                id: 7,
                name: "Ирина",
                rating: 5,
                product: "Торт Орео на 3 кг",
                text: "Второй раз заказываю торт Орео - просто невозможно остановиться! В этот раз взяли побольше, чтобы хватило всем коллегам на работе. Все были в восторге, несколько человек уже сделали заказы.",
                date: "25.04.2025",
                photo: "фото тортов/фрукты.jpg"
            },
            {
                id: 8,
                name: "Александр",
                rating: 5,
                product: "Медовик на 2 кг",
                text: "Жена в восторге от медовика! Говорит, что это лучший торт, который она пробовала. Заказывали на годовщину свадьбы, создал идеальную атмосферу праздника. Спасибо за качество и вкус!",
                date: "20.04.2025",
                photo: "фото тортов/цветы.jpg"
            }
        ];
    }

    // Инициализация
    init() {
        this.updateStatistics();
        this.displayReviews();
        this.setupModal();
    }

    // Обновление статистики
    updateStatistics() {
        const totalReviews = this.reviews.length;
        const averageRating = this.calculateAverageRating();
        const recommendationRate = this.calculateRecommendationRate();

        // Обновляем DOM
        this.updateStatsDOM(totalReviews, averageRating, recommendationRate);
    }

    // Расчет средней оценки
    calculateAverageRating() {
        if (this.reviews.length === 0) return 0;
        
        const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
        return sum / this.reviews.length;
    }

    // Расчет процента рекомендаций (4-5 звезд считаются рекомендацией)
    calculateRecommendationRate() {
        if (this.reviews.length === 0) return 0;
        
        const recommendedReviews = this.reviews.filter(review => review.rating >= 4).length;
        return Math.round((recommendedReviews / this.reviews.length) * 100);
    }

    // Обновление статистики в DOM
    updateStatsDOM(totalReviews, averageRating, recommendationRate) {
        // Обновляем средний рейтинг
        const averageRatingElement = document.querySelector('.stats-card:nth-child(1) h3');
        const ratingDisplayElement = document.querySelector('.stats-card:nth-child(1) .rating-display');
        
        if (averageRatingElement) {
            averageRatingElement.textContent = averageRating.toFixed(1);
        }
        
        if (ratingDisplayElement) {
            ratingDisplayElement.innerHTML = this.generateStarRating(averageRating);
        }

        // Обновляем количество отзывов
        const reviewsCountElement = document.querySelector('.stats-card:nth-child(2) h3');
        if (reviewsCountElement) {
            reviewsCountElement.textContent = totalReviews;
        }

        // Обновляем процент рекомендаций
        const recommendationElement = document.querySelector('.stats-card:nth-child(3) h3');
        if (recommendationElement) {
            recommendationElement.textContent = recommendationRate + '%';
        }
    }

    // Генерация звезд рейтинга для отображения
generateStarRating(rating) {
    // Округляем до ближайшего целого числа
    const roundedRating = Math.round(rating);
    
    let stars = '';
    
    // Полные звезды
    for (let i = 0; i < roundedRating; i++) {
        stars += '★';
    }
    
    // Пустые звезды
    const emptyStars = 5 - roundedRating;
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

    // Настройка модального окна
    setupModal() {
        const modal = document.getElementById('reviewModal');
        const closeBtn = document.querySelector('.close-modal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Отображение отзывов
    displayReviews() {
        const container = document.getElementById('reviewsList');
        if (!container) return;

        container.innerHTML = this.reviews.map(review => this.createReviewCardHTML(review)).join('');

        // Добавляем обработчики для кнопок "Развернуть"
        this.addExpandHandlers();
    }

    // Создание HTML для карточки отзыва
    createReviewCardHTML(review) {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const shortText = this.getShortText(review.text, 3);
        const isLongText = review.text.length > shortText.length;

        return `
            <div class="review-card" data-review-id="${review.id}">
                <div class="review-card-header">
                    <div class="reviewer-avatar">
                        ${review.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="reviewer-info">
                        <div class="reviewer-name">${review.name}</div>
                        <div class="review-rating">${stars}</div>
                        ${review.product ? `<div class="review-product">${review.product}</div>` : ''}
                    </div>
                </div>
                <div class="review-card-text">
                    <p>${shortText}</p>
                    ${isLongText ? `
                        <button class="expand-review-btn" data-review-id="${review.id}">
                            Развернуть
                        </button>
                    ` : ''}
                </div>
                <div class="review-card-date">${review.date}</div>
            </div>
        `;
    }

    // Создание HTML для модального окна
    createModalHTML(review) {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        return `
            <div class="modal-review-content">
                <div class="modal-review-header">
                    <div class="modal-reviewer-avatar">
                        ${review.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="modal-reviewer-info">
                        <div class="modal-reviewer-name">${review.name}</div>
                        <div class="modal-review-rating">${stars}</div>
                        ${review.product ? `<div class="modal-review-product">${review.product}</div>` : ''}
                    </div>
                </div>
                ${review.photo ? `
                    <div class="modal-review-photo">
                        <img src="${review.photo}" alt="Фото торта от ${review.name}">
                    </div>
                ` : ''}
                <div class="modal-review-text">
                    <p>${review.text}</p>
                </div>
                <div class="modal-review-date">${review.date}</div>
            </div>
        `;
    }

    // Получение короткого текста (3 строки)
    getShortText(text, maxLines = 3) {
        const words = text.split(' ');
        let result = '';
        let lineCount = 0;
        
        for (let word of words) {
            if ((result + word).length > 150 && lineCount >= maxLines - 1) {
                result += '...';
                break;
            }
            result += word + ' ';
            
            // Простая эвристика для подсчета строк
            if (result.length > 50 * (lineCount + 1)) {
                lineCount++;
            }
        }
        
        return result.trim();
    }

    // Добавление обработчиков для кнопок "Развернуть"
    addExpandHandlers() {
        const expandButtons = document.querySelectorAll('.expand-review-btn');
        
        expandButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const reviewId = parseInt(button.getAttribute('data-review-id'));
                this.showFullReview(reviewId);
            });
        });
    }

    // Показать полный отзыв в модальном окне
    showFullReview(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (!review) return;

        const modalContent = document.getElementById('modalReviewContent');
        const modal = document.getElementById('reviewModal');

        modalContent.innerHTML = this.createModalHTML(review);
        modal.style.display = 'flex';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    new ReviewsManager();
});