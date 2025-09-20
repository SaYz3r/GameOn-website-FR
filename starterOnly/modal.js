// FONCTION DE NAVIGATION RESPONSIVE
function editNav() {
  // Récupère l'élément avec l'ID "myTopnav" (probablement la barre de navigation)
  var x = document.getElementById("myTopnav");
  
  // Vérifie si la classe actuelle est exactement "topnav"
  if (x.className === "topnav") {
    // Si oui, ajoute la classe "responsive" à la classe existante
    // Résultat : "topnav responsive"
    x.className += " responsive";
  } else {
    // Sinon, remet la classe à "topnav" uniquement
    // Cela retire la classe "responsive" si elle était présente
    x.className = "topnav";
  }
}

// =====================================
// GESTION DE MODAL (fenêtre popup)
// =====================================

// SÉLECTION DES ÉLÉMENTS DOM
const modalbg = document.querySelector(".bground");
// Sélectionne l'élément avec la classe "bground" (arrière-plan de la modal)

const modalBtn = document.querySelectorAll(".modal-btn");
// Sélectionne TOUS les éléments avec la classe "modal-btn" (boutons pour ouvrir la modal)

const formData = document.querySelectorAll(".formData");
// Sélectionne TOUS les éléments avec la classe "formData" (champs de formulaire)
// Note : Cette variable n'est pas utilisée dans le code fourni

// AJOUT D'ÉVÉNEMENTS
// Parcourt chaque bouton modal et lui ajoute un écouteur d'événement
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Quand on clique sur n'importe quel bouton .modal-btn, la fonction launchModal() se déclenche

// FONCTION D'OUVERTURE DE LA MODAL
function launchModal() {
  // Change le style CSS pour rendre la modal visible
  modalbg.style.display = "block";
  // Passe l'affichage de "none" (caché) à "block" (visible)
}


// FERMETURE DE LA MODAL
// Sélectionne l'élément span avec la classe "close"
const closeBtn = document.querySelector(".close");

// Ajoute un écouteur d'événement au clic sur le bouton de fermeture
closeBtn.addEventListener("click", closeModal);

// Fonction pour fermer la modal
function closeModal() {
  // Cache la modal en remettant display à "none"
  modalbg.style.display = "none";
}

// BONUS : Fermer la modal en cliquant sur l'arrière-plan
modalbg.addEventListener("click", function(event) {
  // Vérifie si le clic est directement sur l'arrière-plan (pas sur le contenu de la modal)
  if (event.target === modalbg) {
    closeModal();
  }
});

// BONUS : Fermer la modal avec la touche Échap
document.addEventListener("keydown", function(event) {
  // Vérifie si la touche pressée est "Escape" et si la modal est visible
  if (event.key === "Escape" && modalbg.style.display === "block") {
    closeModal();
  }
});


