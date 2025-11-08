// order.js - Логика страницы заказа
document.addEventListener('DOMContentLoaded', function() {
    const cartContent = document.getElementById('cartContent');
    const orderForm = document.getElementById('orderForm');
    const customerForm = document.getElementById('customerForm');
    const orderDateInput = document.getElementById('orderDate');

    // устанавливаем минимальную дату (завтра)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    orderDateInput.min = tomorrow.toISOString().split('T')[0];

    // Загружаем корзину
    loadCart();

    // Обработка формы заказа
    customerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // собираем данные из корзины в объект
        const formData = {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            date: document.getElementById('orderDate').value,
            comment: document.getElementById('customerComment').value,
            items: cart.getItems(),
            total: cart.getTotalAmount()
        };

        // Сохраняем заказ
        saveOrder(formData);
        
        // Показываем подтверждение
        showOrderConfirmation(formData);
        
        // Очищаем корзину
        cart.clearCart();
    });

    function loadCart() {
        const items = cart.getItems();
        
        if (items.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <h2>Корзина пуста</h2>
                    <p>Вы не выбрали ни одну из начинок. Перейдите в раздел <a href="craft.html">Начинки</a> чтобы сделать заказ.</p>
                </div>
            `;
            orderForm.style.display = 'none';
        } else {
            displayCartItems(items);
            orderForm.style.display = 'block';
        }
    }

    // отображение товаров в корзине
    function displayCartItems(items) {
        let html = `
            <div class="cart-items">
                <div class="cart-header">
                    <h2>Ваш заказ</h2>
                    <button class="clear-cart-btn" id="clearCartBtn">Очистить корзину</button>
                </div>
                <div class="cart-items-list">
        `;

        items.forEach(item => {
            html += `
                <div class="cart-item" data-item-id="${item.id}">
                    <div class="cart-item-info">
                        <h3>${item.fillingName}</h3>
                        <p>${item.description}</p>
                        <div class="cart-item-details">
                            <span>${item.weight} кг × ${item.price} руб/кг</span>
                            <strong>${item.total} руб</strong>
                        </div>
                        
                    </div>
                    <button class="remove-item-btn" data-item-id="${item.id}" title="Удалить из корзины">
                        🗑️
                    </button>
                </div>
            `;
        });

        const totalAmount = cart.getTotalAmount();
        
        html += `
                </div>
                <div class="cart-total">
                    <strong>Общая сумма: ${totalAmount} руб</strong>
                </div>
            </div>
        `;

        cartContent.innerHTML = html;

        // добавляем обработчики для кнопок удаления
        addRemoveItemHandlers();
        
        // добавляем обработчик для очистки корзины
        addClearCartHandler();
    }


    // удаление товара
    function addRemoveItemHandlers() {
        const removeButtons = document.querySelectorAll('.remove-item-btn');
        
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-item-id'));
                
                if (confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
                    // Удаляем элемент из корзины
                    cart.removeItem(itemId);
                    
                    // Полностью перерисовываем корзину, как при очистке
                    loadCart();
                    
                    // Показываем уведомление
                    cart.showNotification('Товар удалён из корзины', 'error');
                }
            });
        });
    }

    // очистка корзины
    function addClearCartHandler() {
        const clearCartBtn = document.getElementById('clearCartBtn');
        
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function() {
                if (confirm('Вы уверены, что хотите очистить всю корзину?')) {
                    cart.clearCart();
                    loadCart();
                }
            });
        }
    }

    // сохранение заказа в localStorage
    function saveOrder(orderData) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orderData.id = Date.now();
        orderData.status = 'новый';
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    // подтверждение заказа
    function showOrderConfirmation(orderData) {
        const formattedDate = new Date(orderData.date).toLocaleDateString('ru-RU');
        
        alert(`Спасибо за заказ, ${orderData.name}!\n\n` +
              `Ваш заказ №${orderData.id} принят.\n` +
              `Дата получения: ${formattedDate}\n` +
              `Сумма заказа: ${orderData.total} руб\n\n` +
              `В ближайшее время с вами свяжется администратор для уточнения деталей заказа.`);
        
        // Очищаем форму
        customerForm.reset();
        
        // Показываем пустую корзину
        loadCart();
    }

    // Устанавливаем колбэк для обновления корзины при изменениях
    cart.setOnChangeCallback(function() {
        loadCart();
    });
});