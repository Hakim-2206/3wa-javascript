// ---------- VARIABLES ET CONSTANTES --------------

let body = document.querySelector("body");

let buttonDark = document.getElementById("theme-switch");
let buttonGreen = document.getElementById("theme-green");
let buttonRed = document.getElementById("theme-red");
let buttonBlue = document.getElementById("theme-blue");
let previousButton = document.querySelector(".slider button");
let nextButton = document.querySelectorAll(".slider button")[1];
let newsletterCloseButton = document.querySelector(".newsletter__close");
let newsletter = document.querySelector(".newsletter");
let newsletterNavbar = document.querySelector(
  ".menu__item i.icon-mail"
).parentElement;
let emailInput = document.getElementById("subscriber-email");
let likeButton = document.querySelectorAll(".btn__like");
let cards = document.querySelectorAll(".card");

let alertFav = document.createElement("div");
alertFav.classList.add("alert", "alert-danger");
alertFav.role = "alert";
alertFav.textContent = "Vous devez être connecté pour gérer vos favoris";

let alertEmail = document.createElement("div");

const slider = document.querySelector(".slider");

const savedMode = localStorage.getItem("mode");
const savedColor = localStorage.getItem("color");

const reviews = document.querySelectorAll(".review");
const stars = document.querySelectorAll(".filter input");

const images = [
  "canyon.jpg",
  "city.jpg",
  "nature.jpg",
  "ocean.jpg",
  "road.jpg",
  "ski.jpg",
];

const forbiddenDomains = [
  "@yopmail.com",
  "@yopmail.fr",
  "@yopmail.net",
  "@cool.fr.nf",
  "@jetable.fr.nf",
  "@courriel.fr.nf",
  "@moncourrier.fr.nf",
  "@monemail.fr.nf",
  "@monmail.fr.nf",
  "@hide.biz.st",
  "@mymail.infos.st",
];

let currentIndex = 0;

// ---------- FONCTIONS ----------------

images.forEach((imagePath, index) => {
  const img = document.createElement("img");
  img.src = `./img/${imagePath}`;
  img.alt = "Slider";
  img.classList.add("slider__img");
  if (index === 0) {
    img.classList.add("slider__img--current");
  }
  slider.appendChild(img);
});

function clearTheme() {
  body.classList.remove("theme-green", "theme-red", "theme-blue");
}

function switchDark() {
  body.classList.toggle("theme-dark");
  if (body.classList.contains("theme-dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
}

function greenTheme() {
  clearTheme();
  body.classList.add("theme-green");
  localStorage.setItem("color", "green");
}

function redTheme() {
  clearTheme();
  body.classList.add("theme-red");
  localStorage.setItem("color", "red");
}

function blueTheme() {
  clearTheme();
  body.classList.add("theme-blue");
  localStorage.setItem("color", "blue");
}

function applySavedTheme() {
  if (savedMode === "dark") {
    body.classList.add("theme-dark");
  } else {
    body.classList.remove("theme-dark");
  }
  if (savedColor) {
    clearTheme();
    body.classList.add(`theme-${savedColor}`);
  }
}

function previousImg() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider(currentIndex);
}

function nextImg() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider(currentIndex);
}

function updateSlider(newIndex) {
  const images = document.querySelectorAll(".slider__img");
  images.forEach((img) => img.classList.remove("slider__img--current"));
  images[newIndex].classList.add("slider__img--current");
  currentIndex = newIndex;
}

function showNewsletter() {
  newsletter.classList.toggle("newsletter--on");
}

function likeButtonAlert() {
  likeButton.forEach((button) => {
    button.addEventListener("click", () => {
      cards.forEach((card) => {
        if (card.contains(button)) {
          card.appendChild(alertFav);
        }
      });
    });
  });
}

function filterReviews() {
  const selectedStars = Array.from(stars)
    .filter((star) => star.checked)
    .map((star) => star.value);

  reviews.forEach((review) => {
    const reviewStars = review.getAttribute("data-rating");
    if (selectedStars.length === 0 || selectedStars.includes(reviewStars)) {
      review.classList.remove("review--hidden");
    } else {
      review.classList.add("review--hidden");
    }
  });
  stars.forEach((star) => {
    star.addEventListener("change", filterReviews);
  });
}

function formCheck() {
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    let emailValue = emailInput.value.trim();
    if (emailValue) {
      let isForbidden = forbiddenDomains.some(function (domain) {
        return emailValue.toLowerCase().includes(domain.toLowerCase());
      });
      if (isForbidden) {
        // alert("Email interdit !!");
        newsletter.appendChild(alertEmail);
        alertEmail.classList.add("alert", "alert-danger");
        alertEmail.role = "alert";
        alertEmail.textContent = "Email interdit";
        emailInput.value = "";
      } else {
        newsletter.appendChild(alertEmail);
        alertEmail.classList.remove("alert", "alert-danger");
        alertEmail.classList.add("alert", "alert-success");
        alertEmail.textContent = "Inscription à la newsletter validé";
        emailInput.value = "";
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } else {
      alert("Veuillez entrer une adresse mail");
    }
  });
}

// -------- CODE PRINCIPAL -----------

document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  buttonDark.addEventListener("click", switchDark);
  buttonGreen.addEventListener("click", greenTheme);
  buttonRed.addEventListener("click", redTheme);
  buttonBlue.addEventListener("click", blueTheme);
  previousButton.addEventListener("click", previousImg);
  nextButton.addEventListener("click", nextImg);
  newsletterNavbar.addEventListener("click", showNewsletter);
  newsletterCloseButton.addEventListener("click", showNewsletter);
  likeButtonAlert();
  formCheck();
  filterReviews();
});
