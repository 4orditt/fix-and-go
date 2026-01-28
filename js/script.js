// --- 1. ГОДИННИК РОБОТИ ---
function updateWorkStatus() {
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Kyiv"}));
    const day = now.getDay(); 
    const hour = now.getHours();
    
    const container = document.getElementById('status-container');
    const text = document.getElementById('status-text');
    
    if (!container || !text) return;

    if (day === 0 || hour < 9 || hour >= 20) {
        container.classList.add('closed');
        text.textContent = day === 0 ? 'Сьогодні вихідний' : 'Зараз зачинено (09:00 - 20:00)';
    } else {
        container.classList.remove('closed');
        text.textContent = 'Працюємо: 09:00 - 20:00';
    }
}

// --- 2. ЛОГІКА ДЛЯ КОМПЕНСАЦІЇ СКРОЛУ (ЩОБ НЕ СТРИБАЛО) ---
function getScrollbarWidth() {
    // Віднімаємо ширину контенту від ширини вікна = ширина скрола
    return window.innerWidth - document.documentElement.clientWidth;
}

// --- 3. УНІВЕРСАЛЬНА ФУНКЦІЯ ВІДКРИТТЯ ---
function openAnyModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('closing');
        modal.classList.add('active');

        // Фікс стрибка контенту:
        // 1. Рахуємо ширину скрола
        const scrollbarWidth = getScrollbarWidth();
        
        // 2. Якщо скрол є (ширина > 0), додаємо відступ справа
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        
        // 3. Блокуємо скрол
        document.body.style.overflow = 'hidden'; 
    }
}

// --- 4. УНІВЕРСАЛЬНА ФУНКЦІЯ ЗАКРИТТЯ ---
function closeAnyModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('closing');
        
        // Чекаємо поки пройде анімація (300мс)
        setTimeout(() => {
            modal.classList.remove('active');
            modal.classList.remove('closing');
            
            // Відновлюємо скрол і прибираємо відступ
            document.body.style.overflow = ''; 
            document.body.style.paddingRight = ''; 
        }, 300);
    }
}

// --- 5. СПЕЦИФІЧНІ ФУНКЦІЇ (Для HTML кнопок) ---

// Для фото велосипедів
function openModal(el) {
    const img = document.getElementById('fullImage');
    img.src = el.querySelector('img').src;
    openAnyModal('imageModal');
}

function closeModal() {
    closeAnyModal('imageModal');
}

// Для послуг
function openInfoModal(modalId) {
    openAnyModal(modalId);
}

function closeInfoModal(modalId) {
    closeAnyModal(modalId);
}

// --- 6. ЗАПУСК ПРИ ЗАВАНТАЖЕННІ ---
document.addEventListener('DOMContentLoaded', () => {
    updateWorkStatus();
    setInterval(updateWorkStatus, 60000);

    // Закриття по кліку на темний фон
    const allModals = document.querySelectorAll('.modal, .info-modal');
    allModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAnyModal(this.id);
            }
        });
    });

    // Закриття клавішею ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active, .info-modal.active');
            if (activeModal) {
                closeAnyModal(activeModal.id);
            }
        }
    });
});