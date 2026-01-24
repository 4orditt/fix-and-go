import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://fixgobike-7f611-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function updateBikeUI(bikeId, isAvailable) {
    const card = document.getElementById(bikeId);
    if (!card) return;
    const btn = card.querySelector('.status-btn');
    if (!btn) return;

    if (isAvailable) {
        // Стан: Вільний
        btn.innerText = "250 грн / день";
        btn.style.background = "var(--white)"; // Повертаємо білий фон
        btn.style.color = "#000000";
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
        btn.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    } else {
        // Стан: В оренді
        btn.innerText = "В оренді 🔒";
        btn.style.background = "rgba(255, 255, 255, 0.05)"; // Майже прозорий фон
        btn.style.color = "rgba(255, 255, 255, 0.3)";      // Напівпрозорий текст
        btn.style.pointerEvents = "none";                  // Вимикаємо кліки
        btn.style.opacity = "0.7";
        btn.style.boxShadow = "none";                      // Прибираємо тінь
        btn.style.border = "1px solid rgba(255,255,255,0.1)"; // Ледь помітна рамка
    }
}

// Слухаємо базу даних в реальному часі
onValue(ref(db, 'bikes'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        if (data.formula) updateBikeUI('formula', data.formula.available);
        if (data.discovery) updateBikeUI('discovery', data.discovery.available);
    }
});