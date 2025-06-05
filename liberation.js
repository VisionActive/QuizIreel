// 🎯 Récupérer le score et le convertir en nombre
let score = parseInt(localStorage.getItem("quizScore") || 0);

// 🎯 Sélection des éléments HTML
const scoreDisplay = document.getElementById("score-display");
const liberationMessage = document.getElementById("liberation-message");
const retryBtn = document.getElementById("retry-btn");
const callBtn = document.getElementById("call-btn");
const buttonContainer = document.getElementById("button-container");
const popup = document.createElement("div");

// 🎯 Affichage du score
scoreDisplay.innerHTML = `<span style="font-size: 36px; color: ${score < 7 ? 'red' : 'green'};">Score : ${score}</span>`;

// 🎯 Gestion de l'affichage des boutons selon le score
if (score < 7) {
    // 🔴 Échec : Affichage du message rouge
    liberationMessage.innerHTML = `<span style="font-size: 32px; font-weight: bold; color: white;">AH ÇA NOUS CONNAÎT PAS ?</span>`;
    
    retryBtn.style.display = "block";
    callBtn.style.display = "none";

    // 🔹 Vérifier si le bouton "La flemme ?" existe déjà
    let lazyBtn = document.getElementById("lazy-btn");
    if (!lazyBtn) {
        lazyBtn = document.createElement("button");
        lazyBtn.textContent = "La flemme ?";
        lazyBtn.id = "lazy-btn";
        lazyBtn.onclick = showPopup;
        buttonContainer.appendChild(lazyBtn);
    }
    lazyBtn.style.display = "block";
} else {
    // 🟢 Succès : Affichage du message vert
    liberationMessage.innerHTML = `<span style="font-size: 32px; font-weight: bold; color: white;">LIBERAAAABLE ! Appelle ce numéro et on vient te libérer !</span>`;
    
    callBtn.style.display = "block";
    callBtn.innerHTML = "📞 Appeler";
    callBtn.onclick = () => window.location.href = "tel:+33782807581";   // 📞 Lien pour appeler le numéro

    // 🔹 Ajout du message sous le bouton "Appeler"
    const joinGroupText = document.createElement("p");
    joinGroupText.innerHTML = `Aussi... tu peux rejoindre le <a href="https://www.insérerlelienici.com" target="_blank">groupe des bloqués</a> et envoie une photo de toi !`;
    joinGroupText.id = "join-group-text";
    buttonContainer.appendChild(joinGroupText);


    // 🚀 Suppression des boutons inutiles en cas de succès
    retryBtn.style.display = "none";
    let lazyBtn = document.getElementById("lazy-btn");
    if (lazyBtn) lazyBtn.remove();
}

// 🎯 Fonction pour afficher le pop-up
function showPopup() {
    popup.innerHTML = `
        <div id="popup-content">
            <span id="close-popup" onclick="closePopup()">✖</span>
            <p>Rejoins ce groupe :</p>
            <a href="https://insererlelienici.com" target="_blank">👉 Groupe WhatsApp 👈</a>
            <p>Et envoie une photo de toi avec les lunettes de la honte à côté de toi ! 🤣</p>
        </div>
    `;
    popup.id = "popup";
    document.body.appendChild(popup);
}

// 🎯 Fonction pour fermer le pop-up
function closePopup() {
    document.getElementById("popup").remove();
}

// 🎯 Effet d'animation à l'affichage du score et du message
liberationMessage.style.opacity = "0";
scoreDisplay.style.opacity = "0";

setTimeout(() => {
    liberationMessage.style.transition = "opacity 0.8s ease-in-out";
    liberationMessage.style.opacity = "1";
    
    scoreDisplay.style.transition = "opacity 0.8s ease-in-out";
    scoreDisplay.style.opacity = "1";
}, 300);

// 🎯 Tests pour vérifier que l'affichage fonctionne bien
console.log("Score :", score);
console.log("État final du bouton Recommencer :", retryBtn.style.display);
console.log("État final du bouton Appeler :", callBtn.style.display);
console.log("État final du bouton La flemme :", document.getElementById("lazy-btn") ? "Visible" : "Absent");

function showPopup() {
    popup.innerHTML = `
        <div id="popup-content">
            <span id="close-popup" onclick="closePopup()">✖</span>
            <p>Pour sortir d'ici sans effort, rejoins le <a href="https://www.insérerlelienici.com" target="_blank">groupe des bloqués</a> et envoie une photo de toi !</p>
        </div>
    `;
    popup.id = "popup";
    document.body.appendChild(popup);
}

document.getElementById("lazy-btn").addEventListener("click", () => {
    console.log("Bouton 'La flemme ?' cliqué");
    showPopup();
});

function showPopup() {
    console.log("showPopup() a été exécuté");

    let existingPopup = document.getElementById("popup");
    if (!existingPopup) {
        const popup = document.createElement("div");
        popup.id = "popup";
        popup.innerHTML = `
            <div id="popup-content">
                <span id="close-popup" onclick="closePopup()">✖</span>
                <p>Pour sortir d'ici sans effort, rejoins le 
                    <a href="https://www.insérerlelienici.com" target="_blank">groupe des bloqués</a> 
                    et envoie une photo de toi !
                </p>
            </div>
        `;
        document.body.appendChild(popup);
    } else {
        existingPopup.style.display = "block";
        existingPopup.classList.add("popup-show"); // Appliquer l’animation
    }
}

function closePopup() {
    console.log("Croix cliquée, fermeture du pop-up"); // Vérification dans la console
    let popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "none";
        popup.classList.remove("popup-show"); // 🔹 Supprimer l'animation d'apparition
    }
}

liberationMessage.style.color = "black";