// Liste des questions
const questions = [
    { question: "Quelle est la capitale de la France ?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { question: "Combien font 5 × 6 ?", options: ["30", "25", "20", "35"], correct: 0 },
    { question: "Quel océan borde la côte ouest des États-Unis ?", options: ["Atlantique", "Pacifique", "Indien", "Arctique"], correct: 1 },
    { question: "Qui a écrit 'Les Misérables' ?", options: ["Victor Hugo", "Molière", "Émile Zola", "Jean de La Fontaine"], correct: 0 },
    { question: "Quelle est la planète la plus proche du soleil ?", options: ["Venus", "Mercure", "Mars", "Jupiter"], correct: 1 },
    { question: "Quel est le symbole chimique de l'or ?", options: ["Ag", "Au", "Fe", "Hg"], correct: 1 },
    { question: "Quelle année a marqué la fin de la Seconde Guerre mondiale ?", options: ["1943", "1945", "1947", "1950"], correct: 1 },
    { question: "Quelle est la plus grande forêt du monde ?", options: ["Forêt amazonienne", "Taïga sibérienne", "Forêt du Congo", "Forêt boréale"], correct: 0 },
    { question: "Quel pays a gagné la Coupe du Monde de football en 2018 ?", options: ["Brésil", "France", "Allemagne", "Argentine"], correct: 1 },
    { question: "Combien de côtés a un hexagone ?", options: ["5", "6", "7", "8"], correct: 1 },
];

let currentQuestionIndex = 0;
localStorage.setItem("quizScore", 0);
let activeSound = null; // Stocke le son en cours pour le stopper
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress");

// Charger une question
function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionText.textContent = questionData.question;
    
    answerOptions.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        answerOptions.appendChild(btn);
    });

    nextBtn.style.display = "none"; // Cache le bouton "Suivant"
}

// Vérifier la réponse
function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];

    // Sélectionne le bon son en fonction de la question
    let correctSound = new Audio(`sounds/correct${currentQuestionIndex + 1}.mp3`);
    let wrongSound = new Audio(`sounds/wrong${currentQuestionIndex + 1}.mp3`);

    if (selectedIndex === questionData.correct && !document.querySelector(".option.correct")) {
    let currentScore = parseInt(localStorage.getItem("quizScore") || 0);
    localStorage.setItem("quizScore", currentScore + 1);
    }

    // Arrêter le son actif s'il y en a un
    if (activeSound !== null) { 
    activeSound.pause();
    activeSound.currentTime = 0; // Réinitialise le son
    }

    document.querySelectorAll(".option").forEach((btn, index) => {
if (activeSound) { 
    activeSound.pause();
    activeSound.currentTime = 0;
    activeSound = null;
}

if (selectedIndex === questionData.correct) {  
    document.querySelectorAll(".option")[selectedIndex].classList.add("correct");
    activeSound = new Audio(`sounds/correct${currentQuestionIndex + 1}.mp3`);
} 

else {  
    document.querySelectorAll(".option")[selectedIndex].classList.add("wrong");
    activeSound = new Audio(`sounds/wrong${currentQuestionIndex + 1}.mp3`);
}

activeSound.play();
        btn.disabled = true; // Désactive les choix après clic
    });

    nextBtn.style.display = "block"; // Affiche le bouton "Suivant"
}

// Passer à la prochaine question
nextBtn.onclick = () => {
    // Arrêter le son actif avant de changer de question
    if (activeSound) {
    activeSound.pause();
    activeSound.currentTime = 0;
    activeSound = null; // Réinitialise la variable du son actif
        }
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();

        // Animation fluide de la jauge de progression
        progressBar.style.transition = "width 0.5s ease-in-out";
        progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
    } else {
        questionText.textContent = "Quiz terminé ! 🎉";
        // Ajouter le bouton "Libérable ?" sous "Quiz terminé !"
    const liberableBtn = document.createElement("button");
    liberableBtn.textContent = "Libérable ?";
    liberableBtn.id = "liberable-btn";
    liberableBtn.onclick = () => window.location.href = "liberation.html"; // Redirection vers la nouvelle page
    document.getElementById("quiz-container").appendChild(liberableBtn);
        answerOptions.innerHTML = "";
        nextBtn.style.display = "none";
    }
    
};


// Lancer le quiz
loadQuestion();