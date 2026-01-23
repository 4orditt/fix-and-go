function updateWorkStatus() {
    const now = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Kyiv"}));
    const day = now.getDay(), hour = now.getHours();
    const container = document.getElementById('status-container'), text = document.getElementById('status-text');
    
    if (!container || !text) return;

    if (day === 0 || hour < 9 || hour >= 20) {
        container.classList.add('closed');
        text.textContent = day === 0 ? 'Сьогодні вихідний' : 'Зараз зачинено (Працюємо: 09:00 - 20:00)';
    } else {
        container.classList.remove('closed');
        text.textContent = 'Працюємо: 09:00 - 20:00';
    }
}

function openModal(el) {
    const modal = document.getElementById('imageModal'), img = document.getElementById('fullImage');
    modal.classList.add('active');
    img.src = el.querySelector('img').src;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Слухачі подій
document.addEventListener('DOMContentLoaded', () => {
    updateWorkStatus();
    setInterval(updateWorkStatus, 60000);

    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target.id === 'imageModal') closeModal();
        };
    }
});