// cart.js - Управление корзиной и localStorage
class Cart {

    // при создании экземпляра загружаем корзину
    constructor() {
        this.items = this.getCartFromStorage();
    }

    // получаем корзину из localStorage
    // localStorage - встроенное хранилище данных в браузер, позволяет хранить информацию от клиента даже после закрытия браузера
    getCartFromStorage() {
        // getItem получает строку из хранилища
        const cart = localStorage.getItem('cart');
        // JSON.parse преобразует строку в массив объектов
        return cart ? JSON.parse(cart) : [];
    }

    // сохраняем корзину в localStorage
    saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // добавляем товар в корзину
    addItem(fillingName, description, price, weight) {
        const item = {
            id: Date.now(),
            fillingName,
            description,
            price: parseInt(price),
            weight: parseFloat(weight),
            total: parseInt(price) * parseFloat(weight),
            date: new Date().toLocaleString('ru-RU')
        };
        
        this.items.push(item);
        this.saveCartToStorage();
        this.updateCartCounter();
        
        // уведомление
        if (this.onChangeCallback) {
            this.onChangeCallback();
        }
    }

    // получаем все товары
    getItems() {
        return this.items;
    }

    // удаляем товар из корзины по ID
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCartToStorage();
        this.updateCartCounter();
        
        // Вызываем колбэк если передан
        if (this.onChangeCallback) {
            this.onChangeCallback();
        }
    }
    
    // очищаем корзину
    clearCart() {
        this.items = [];
        this.saveCartToStorage();
        this.updateCartCounter();
        
        // Вызываем колбэк если передан
        if (this.onChangeCallback) {
            this.onChangeCallback();
        }
    }

    // обновляем счётчик корзины
    updateCartCounter() {
        const counter = document.getElementById('cartCounter');
        if (counter) {
            counter.textContent = this.items.length;
            counter.style.display = this.items.length > 0 ? 'inline' : 'none';
        }
    }

    // получаем общую сумму
    getTotalAmount() {
        return this.items.reduce((total, item) => total + item.total, 0);
    }

    // устанавливаем колбэк для изменений в корзине
    setOnChangeCallback(callback) {
        this.onChangeCallback = callback;
    }

    // показываем уведомление
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'success' ? '#ffb6c1' : '#8b4513'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие через 4 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Создаём глобальный экземпляр корзины
const cart = new Cart();


// Инициализируем счётчик корзины при загрузке страницы
// не сделано!
document.addEventListener('DOMContentLoaded', function() {
    cart.updateCartCounter();
});