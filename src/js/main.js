"use strict";

const body = document.body;
const banner = document.querySelector(".banner");
const nav = document.querySelector(".nav");
const navHamburger = document.querySelector(".nav__hamburger");
const navMenu = document.querySelector(".nav__menu");
let navLinks = document.querySelectorAll(".navigation__link");
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let bannerWidth;
let lastScroll = 0;

//navigation width
function setNavWidth() {
  bannerWidth = banner.offsetWidth;
  nav.style.width = bannerWidth + "px";
}
window.onload = function () {
  setNavWidth();
};
window.onresize = function () {
  setNavWidth();
};

//navigation revealing or hiding depanding on scroll direction
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll == 0) {
    body.classList.remove(scrollUp);
    return;
  }
  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    //down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains(scrollDown)
  ) {
    //up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});

//look of hamburger menu after slightly scrolling down
function changeHamburger() {
  const mq835 = window.matchMedia("(max-width: 835px)");
  const scrolledDown = window.pageYOffset;

  if (mq835.matches && scrolledDown > 40) {
    navHamburger.classList.add("btn-menu_scrolled");
  } else if (!mq835.matches && scrolledDown > 100) {
    navHamburger.classList.add("btn-menu_scrolled");
  } else {
    navHamburger.classList.remove("btn-menu_scrolled");
  }
}
window.addEventListener("scroll", changeHamburger);

//navigation - hamburger menu changes on cross and menu appears
navHamburger.addEventListener("click", function () {
  const isOpened = navHamburger.getAttribute("aria-expanded") === "true";

  navHamburger.classList.toggle("btn-menu_open", !isOpened);
  navHamburger.setAttribute("aria-expanded", String(!isOpened));
  navMenu.classList.toggle("nav__menu_open", !isOpened);
});

//menu closes after clicking one of the links
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navMenu.classList.toggle("nav__menu_open");
    navHamburger.classList.toggle("btn-menu_open");
    navHamburger.setAttribute("aria-expanded", "false");
  });
}

//animation on scroll - skills-slide sections - only the first
const slide = document.querySelector(".slide--js");

if (
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].boundingClientRect.y < 0) {
      slide.classList.add("slide-emerge");
    } else {
      slide.classList.remove("slide-emerge");
    }
  });
  observer.observe(document.querySelector("#pixel-anchor"));
}

//section experience - elements appear on scroll
const sliders = document.querySelectorAll(".experience__content");

const slideOptions = {
  rootMargin: "-50px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.firstElementChild.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
slideOptions);

sliders.forEach((slider) => {
  appearOnScroll.observe(slider);
});

//gallery - we can use it many times on a page
function Gallery(gallery) {
  if (!gallery) {
    throw new Error("no gallery found!");
  }
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const closeButton = document.querySelector(".closeButton");
  let currentImage;

  function openModal() {
    console.info("opening modal");
    if (modal.matches(".open")) {
      console.info("modal open");
      return;
    }
    modal.classList.add("open");
    //event listeners to be bound when we open the modal:
    window.addEventListener("keyup", handleKeyUp);
    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);
    closeButton.addEventListener("click", closeModal);
  }

  function closeModal() {
    modal.classList.remove("open");
    //event listeners to be removed when we close the modal:
    window.removeEventListener("keyup", handleKeyUp);
    nextButton.removeEventListener("click", showNextImage);
    prevButton.removeEventListener("click", showPrevImage);
    closeButton.removeEventListener("click", closeModal);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      //if the thing that we clicked is the same that we are actually listening for = outside (not anything inside it)
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === "Escape") return closeModal(); //one liner
    if (e.key === "ArrowRight") return showNextImage();
    if (e.key === "ArrowLeft") return showPrevImage();
    //return - if sb clicks escape we dont need to check arrows...
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el) {
    if (!el) {
      console.info("no image to show");
      return;
    }
    //update modal with info
    modal.querySelector("img").src = el.src;
    modal.querySelector("h4").textContent = el.title;
    modal.querySelector("figure p").textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  images.forEach((image) =>
    image.addEventListener("click", (e) => showImage(e.currentTarget))
  );

  images.forEach((image) => {
    image.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        showNextImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener("click", handleClickOutside);
}

//pobieramy konkretną galerię i dla niej odpalamy funkcję Gallery!
const gallery1 = Gallery(document.querySelector(".gallery-1"));
