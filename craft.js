// craft.js - Обработка модального окна начинок
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('orderModal');
    const closeModal = document.querySelector('.close-modal');
    const orderButtons = document.querySelectorAll('.order-btn');
    const weightSlider = document.getElementById('weightSlider');
    const weightValue = document.getElementById('weightValue');
    const totalPrice = document.getElementById('totalPrice');
    const modalFillingName = document.getElementById('modalFillingName');
    const modalFillingDescription = document.getElementById('modalFillingDescription');
    const confirmOrderBtn = document.getElementById('confirmOrder');
    
    let currentPrice = 0;
    let currentFillingName = '';
    let currentDescription = '';
    
    // открытие модального окна
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {

            // получаем данные
            currentFillingName = this.getAttribute('data-filling');
            currentDescription = this.getAttribute('data-description');
            currentPrice = parseInt(this.getAttribute('data-price'));
            
            // заполняем модальное окно
            modalFillingName.textContent = currentFillingName;
            modalFillingDescription.textContent = currentDescription;
            
            // сброс слайдера
            weightSlider.value = 1;
            updatePrice();
            
            modal.style.display = 'flex';
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Обновление цены при изменении веса
    weightSlider.addEventListener('input', updatePrice);
    
    function updatePrice() {
        const weight = parseFloat(weightSlider.value);
        weightValue.textContent = weight + ' кг';
        
        const total = currentPrice * weight;
        totalPrice.textContent = 'Итого: ' + total + ' руб';
    }
    
    // Подтверждение заказа
    confirmOrderBtn.addEventListener('click', function() {
        const weight = parseFloat(weightSlider.value);
        
        // добавляем в корзину
        cart.addItem(currentFillingName, currentDescription, currentPrice, weight);
        
        // показываем уведомление
        cart.showNotification(`Начинка "${currentFillingName}" добавлена в корзину!`);
        modal.style.display = 'none';
    });
    
    // Инициализация начальной цены
    updatePrice();
});