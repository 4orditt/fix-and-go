/* js/script.js */

// Функція оновлення статусу роботи
function updateWorkStatus() {
    // Отримуємо час у Києві
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Kyiv"}));
    const day = now.getDay(); // 0 - неділя, 1 - понеділок...
    const hour = now.getHours();
    
    const container = document.getElementById('status-container');
    const text = document.getElementById('status-text');
    
    if (!container || !text) return;

    // Логіка: Неділя (0) АБО час < 9:00 АБО час >= 20:00
    if (day === 0 || hour < 9 || hour >= 20) {
        container.classList.add('closed');
        // Якщо неділя - пишемо "Вихідний", інакше - графік
        text.textContent = day === 0 ? 'Сьогодні вихідний' : 'Зараз зачинено (09:00 - 20:00)';
    } else {
        container.classList.remove('closed');
        text.textContent = 'Працюємо: 09:00 - 20:00';
    }
}

// Функції для модального вікна (фото на весь екран)
function openModal(el) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('fullImage');
    
    // Беремо src з картинки, на яку клікнули
    img.src = el.querySelector('img').src;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокуємо прокрутку фону
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('active');
    document.body.style.overflow = 'auto'; // Відновлюємо прокрутку
}

// Запуск при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    updateWorkStatus();
    setInterval(updateWorkStatus, 60000); // Оновлюємо кожну хвилину

    // Закриття по кліку на темний фон
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target.id === 'imageModal') closeModal();
        };
    }

    // Закриття клавішею Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});