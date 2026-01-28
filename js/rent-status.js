import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://fixgobike-7f611-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- 1. ВЕЛОСИПЕДИ ---
function updateBikeUI(bikeId, isAvailable) {
    const card = document.getElementById(bikeId);
    if (!card) return;
    const btn = card.querySelector('.status-btn');
    if (!btn) return;

    if (isAvailable) {
        btn.innerText = "Орендувати";
        btn.style.background = "var(--white)";
        btn.style.color = "#000000";
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
        btn.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
        btn.style.border = "none";
        btn.href = "https://t.me/KalhozMira";
    } else {
        btn.innerText = "Орендується";
        btn.style.background = "rgba(255, 255, 255, 0.05)";
        btn.style.color = "rgba(255, 255, 255, 0.3)";
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.7";
        btn.style.boxShadow = "none";
        btn.style.border = "1px solid rgba(255,255,255,0.1)";
        btn.removeAttribute('href');
    }
}

onValue(ref(db, 'bikes'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        if (data.formula) updateBikeUI('formula', data.formula.available);
        if (data.discovery) updateBikeUI('discovery', data.discovery.available);
        if (data.formula_2) updateBikeUI('formula_2', data.formula_2.available);
    }
});

// --- 2. АКУМУЛЯТОРИ (ВИПРАВЛЕНО) ---
const countRef = ref(db, 'batteries/count');

onValue(countRef, (snapshot) => {
    // Отримуємо значення. Якщо null, то 0.
    const count = snapshot.val();
    
    console.log("🔥 Отримано з бази кількість АКБ:", count); // ДЛЯ ПЕРЕВІРКИ

    const countElement = document.getElementById('battery-count');
    const mainRow = document.getElementById('battery-main-row');
    const emptyRow = document.getElementById('battery-empty');

    // Перевірка, чи знайшли ми елементи
    if (!countElement || !mainRow || !emptyRow) {
        console.error("❌ Помилка: Не знайдені елементи HTML для батарей!");
        return;
    }

    // Оновлюємо текст
    countElement.textContent = count;

    // Перемикаємо видимість
    if (count > 0) {
        // Є товар
        mainRow.style.display = "flex";
        emptyRow.style.display = "none";
        console.log("✅ Показую товар");
    } else {
        // Немає товару
        mainRow.style.display = "none";
        emptyRow.style.display = "flex";
        console.log("⛔ Показую 'Немає в наявності'");
    }
});