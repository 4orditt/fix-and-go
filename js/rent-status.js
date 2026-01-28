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
        btn.innerText = "Орендувати";
        btn.style.background = "var(--white)";
        btn.style.color = "#000000";
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
        btn.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
        btn.style.border = "none";
    } else {
        // Стан: В оренді
        btn.innerText = "Орендується";
        btn.style.background = "rgba(255, 255, 255, 0.05)";
        btn.style.color = "rgba(255, 255, 255, 0.3)";
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.7";
        btn.style.boxShadow = "none";
        btn.style.border = "1px solid rgba(255,255,255,0.1)";
    }
}

// Слухаємо базу даних в реальному часі
onValue(ref(db, 'bikes'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Перевіряємо старі велосипеди
        if (data.formula) updateBikeUI('formula', data.formula.available);
        if (data.discovery) updateBikeUI('discovery', data.discovery.available);
        
        // Перевіряємо новий велосипед (formula_2)
        if (data.formula_2) updateBikeUI('formula_2', data.formula_2.available);
    }
});