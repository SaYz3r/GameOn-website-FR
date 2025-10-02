// FONCTION DE NAVIGATION RESPONSIVE
function editNav() {
  // Récupère l'élément avec l'ID "myTopnav" (probablement la barre de navigation)
  var x = document.getElementById("myTopnav");
  
  // Vérifie si la classe actuelle est exactement "topnav"
  if (x.className === "topnav") {
    // Si oui, ajoute la classe "responsive" à la classe existante
    // Résultat : "topnav responsive"
    x.className += " responsive";
    // Empêche le scroll du body quand le menu est ouvert
    document.body.style.overflow = 'hidden'
  } else {
    // Sinon, remet la classe à "topnav" uniquement
    // Cela retire la classe "responsive" si elle était présente
    x.className = "topnav";
    // Réactive le scroll du body
    document.body.style.overflow = '';
  }
}

document.addEventListener('click', function(event) {
  var nav = document.getElementById("myTopnav");
  var mainNavbar = nav.querySelector('.main-navbar');
  var icon = nav.querySelector('.icon');
  
  if (nav.className.includes("responsive") && 
      !mainNavbar.contains(event.target) && 
      !icon.contains(event.target)) {
    editNav();
  }
});

// =====================================
// GESTION DE MODAL
// =====================================

// SÉLECTION DES ÉLÉMENTS DOM
const modalbg = document.querySelector(".bground");
// Sélectionne l'élément avec la classe "bground" (arrière-plan de la modal)

const modalBtn = document.querySelectorAll(".modal-btn");
// Sélectionne TOUS les éléments avec la classe "modal-btn" (boutons pour ouvrir la modal)

const formData = document.querySelectorAll(".formData");

// Variable pour savoir si le formulaire a été validé
let formWasValidated = false;

// Ouvrir la modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Quand on clique sur n'importe quel bouton .modal-btn, la fonction launchModal() se déclenche

// FONCTION D'OUVERTURE DE LA MODAL
function launchModal() {
  // Change le style CSS pour rendre la modal visible
  modalbg.style.display = "block";
  // S'assurer que le formulaire est visible et la confirmation cachée
  document.querySelector('form').style.display = 'flex';
  document.querySelector('.form-confirmer').style.display = 'none';
}

// Fermer la modal (bouton X du formulaire)
const closeBtn = document.querySelector("form .close");
closeBtn.addEventListener("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  closeModalFromForm();
});

// Fonction pour fermer depuis le formulaire (sans vider)
function closeModalFromForm() {
  modalbg.style.display = "none";
}

// Fonction pour fermer depuis la confirmation (avec vidage)
function closeModal() {
  // Cache la modal en remettant display à "none"
  modalbg.style.display = "none";
  
  // Réinitialiser le formulaire UNIQUEMENT s'il a été validé
  if (formWasValidated) {
    resetForm();
    formWasValidated = false; // Réinitialiser le flag
  }
  
  // Toujours remettre l'affichage du formulaire pour la prochaine ouverture
  document.querySelector('form').style.display = 'flex';
  document.querySelector('.form-confirmer').style.display = 'none';
}

// Fonction pour réinitialiser complètement le formulaire
function resetForm() {
  const form = document.querySelector('form');
  
  // Vider tous les champs
  form.reset();
  
  // Retirer toutes les classes d'erreur et de validation
  const inputs = form.querySelectorAll('input.text-control');
  inputs.forEach(input => {
    input.classList.remove('error', 'valid');
  });
  
  // Cacher tous les messages d'erreur
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => {
    error.style.display = 'none';
  });
}

// Fermer en cliquant sur l'arrière-plan
modalbg.addEventListener("click", function(event) {
  if (event.target === modalbg) {
    // Si on est sur la page de confirmation, vider le formulaire
    if (formWasValidated) {
      closeModal();
    } else {
      // Sinon, juste fermer sans vider
      closeModalFromForm();
    }
  }
});

// Fermer avec la touche Échap
document.addEventListener("keydown", function(event) {
  // Vérifie si la touche pressée est "Escape" et si la modal est visible
  if (event.key === "Escape" && modalbg.style.display === "block") {
    // Si on est sur la page de confirmation, vider le formulaire
    if (formWasValidated) {
      closeModal();
    } else {
      // Sinon, juste fermer sans vider
      closeModalFromForm();
    }
  }
});

// =====================================
// FONCTIONS DE VALIDATION
// =====================================

function validateFirstName() {
  const firstInput = document.getElementById('first');
  const firstError = document.getElementById('first-error');
  const value = firstInput.value.trim();
  
  // Vérification: vide ou moins de 2 caractères
  if (value === '' || value.length < 2) {
    firstInput.classList.add('error');
    firstInput.classList.remove('valid');
    firstError.style.display = 'block';
    firstError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    return false;
  }
  
  // Validation réussie
  firstInput.classList.add('valid');
  firstInput.classList.remove('error');
  firstError.style.display = 'none';
  return true;
}

// Validation du nom
function validateLastName() {
  const lastInput = document.getElementById('last');
  const lastError = document.getElementById('last-error');
  const value = lastInput.value.trim();
  
  // Vérification: vide ou moins de 2 caractères
  if (value === '' || value.length < 2) {
    lastInput.classList.add('error');
    lastInput.classList.remove('valid');
    lastError.style.display = 'block';
    lastError.textContent = 'Le nom doit contenir au moins 2 caractères';
    return false;
  }
  
  // Validation réussie
  lastInput.classList.add('valid');
  lastInput.classList.remove('error');
  lastError.style.display = 'none';
  return true;
}

// Validation de l'email (format valide)
function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const value = emailInput.value.trim();  
  // Regex pour valider le format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Vérification: vide
  if (value === '') {
    emailInput.classList.add('error');
    emailInput.classList.remove('valid');
    emailError.style.display = 'block';
    emailError.textContent = 'L\'email est obligatoire';
    return false;
  }
  
  // Vérification: format invalide
  if (!emailRegex.test(value)) {
    emailInput.classList.add('error');
    emailInput.classList.remove('valid');
    emailError.style.display = 'block';
    emailError.textContent = 'Format d\'email invalide';
    return false;
  }
  
  // Validation réussie
  emailInput.classList.add('valid');
  emailInput.classList.remove('error');
  emailError.style.display = 'none';
  return true;
}

function validateBirthdate() {
  const birthdateInput = document.getElementById('birthdate');
  const birthdateError = document.getElementById('birthdate-error');
  const value = birthdateInput.value;

  if (!value) {
    birthdateInput.classList.add('error');
    birthdateInput.classList.remove('valid');
    birthdateError.style.display = 'block';
    birthdateError.textContent = 'La date de naissance est obligatoire';
    return false;
  }

  const today = new Date();
  const birthDate = new Date(value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    birthdateInput.classList.add('error');
    birthdateInput.classList.remove('valid');
    birthdateError.style.display = 'block';
    birthdateError.textContent = 'Vous devez avoir au moins 18 ans';
    return false;
  }

  // Validation réussie
  birthdateInput.classList.add('valid');
  birthdateInput.classList.remove('error');
  birthdateError.style.display = 'none';
  return true;
}

// Validation du nombre de tournois (valeur numérique, 0-99)
function validateQuantity() {
  const quantityInput = document.getElementById('quantity');
  const quantityError = document.getElementById('quantity-error');
  const value = quantityInput.value.trim();
  
  // Vérification: vide
  if (value === '') {
    quantityInput.classList.add('error');
    quantityInput.classList.remove('valid');
    quantityError.style.display = 'block';
    quantityError.textContent = 'Le nombre de tournois est obligatoire';
    return false;
  }
    
  // Vérification: pas un nombre valide
  if (isNaN(value) || isNaN(parseFloat(value))) {
    quantityInput.classList.add('error');
    quantityInput.classList.remove('valid');
    quantityError.style.display = 'block';
    quantityError.textContent = 'Veuillez saisir un nombre valide';
    return false;
  }
    
  const number = parseInt(value);
    
  // Vérification: nombre négatif
  if (number < 0) {
    quantityInput.classList.add('error');
    quantityInput.classList.remove('valid');
    quantityError.style.display = 'block';
    quantityError.textContent = 'Le nombre ne peut pas être négatif';
    return false;
  }
    
  // Vérification: nombre trop grand (> 99)
  if (number > 99) {
    quantityInput.classList.add('error');
    quantityInput.classList.remove('valid');
    quantityError.style.display = 'block';
    quantityError.textContent = 'Maximum 99 tournois autorisés';
    return false;
  }
    
  quantityInput.classList.add('valid');
  quantityInput.classList.remove('error');
  quantityError.style.display = 'none';
  return true;
}

// Validation des boutons radio (au moins un sélectionné)
function validateLocation() {
  const locationError = document.getElementById('location-error');
  const radioButtons = document.querySelectorAll('input[name="location"]');
  
  // Vérification qu'au moins un bouton radio est coché
  let isSelected = false;
  for (let radio of radioButtons) {
    if (radio.checked) {
      isSelected = true;
      break;
    }
  }
    
  // Affichage de l'erreur si aucun bouton n'est sélectionné
  if (!isSelected) {
    locationError.style.display = 'block';
    locationError.textContent = 'Veuillez sélectionner un tournoi';
    return false;
  }
    
  // Validation réussie
  locationError.style.display = 'none';
  return true;
}

// Validation de la case conditions générales (obligatoire)
function validateTerms() {
  const checkbox1 = document.getElementById('checkbox1');
  const checkboxError = document.getElementById('checkbox-error');
  
  // Vérification que la case conditions générales est cochée
  if (!checkbox1.checked) {
    checkboxError.style.display = 'block';
    checkboxError.textContent = 'Vous devez accepter les conditions d\'utilisation';
    return false;
  }
  
  // Validation réussie
  checkboxError.style.display = 'none';
  return true;
}

// validation du formulaire
function validate(event) {
  event.preventDefault();

  // Exécution de toutes les validations
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isBirthdateValid = validateBirthdate();
  const isQuantityValid = validateQuantity();
  const isLocationValid = validateLocation();
  const isTermsValid = validateTerms();
  
  // Vérification que toutes les validations sont passées
  const isFormValid = isFirstNameValid && 
                      isLastNameValid && 
                      isEmailValid && 
                      isBirthdateValid &&
                      isQuantityValid && 
                      isLocationValid && 
                      isTermsValid;
  
  // Si le formulaire n'est pas valide, on empêche la soumission
  if (!isFormValid) {
    return false;
  }
  
  // Marquer que le formulaire a été validé avec succès
  formWasValidated = true;
  
  // Cacher le formulaire et afficher la confirmation
  document.querySelector('form').style.display = 'none';
  document.querySelector('.form-confirmer').style.display = 'flex';
}

// GESTION DE LA PAGE DE CONFIRMATION
// Bouton "Fermer" de la confirmation
document.getElementById('fermer-form').addEventListener('click', closeModal);

// Croix de fermeture de la confirmation
const closeConfirmer = document.getElementById('close-confirmer');
if (closeConfirmer) {
  closeConfirmer.addEventListener('click', closeModal);
}

// VALIDATION EN TEMPS RÉEL
document.getElementById('submit-btn').addEventListener('click', validate);
document.getElementById('first').addEventListener('input', validateFirstName);
document.getElementById('last').addEventListener('input', validateLastName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('birthdate').addEventListener('change', validateBirthdate);
document.getElementById('quantity').addEventListener('input', validateQuantity);

// Validation en temps réel des boutons radio
const radioButtons = document.querySelectorAll('input[name="location"]');
radioButtons.forEach(radio => {
  radio.addEventListener('change', validateLocation);
});

// Validation en temps réel de la checkbox conditions
document.getElementById('checkbox1').addEventListener('change', validateTerms);