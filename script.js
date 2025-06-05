// Sélectionne le toggle et le body
const toggle = document.querySelector(".toggle");
const body = document.body;

// Active/Désactive le mode sombre au clic
toggle.onclick = () => {
    body.classList.toggle("dark-mode");
};

