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
  this.gallery = gallery;
  this.images = Array.from(gallery.querySelectorAll("img"));
  this.modal = document.querySelector(".modal");
  this.prevButton = document.querySelector(".prev");
  this.nextButton = document.querySelector(".next");
  this.closeButton = document.querySelector(".closeButton");

  //bind our methods to the instance when we need them
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  //we don't remove this listener, because it happens once, on pageload
  this.images.forEach((image) =>
    image.addEventListener("click", (e) => this.showImage(e.currentTarget))
  );

  this.images.forEach((image) => {
    image.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.showNextImage(e.currentTarget);
      }
    });
  });

  this.modal.addEventListener("click", this.handleClickOutside);
}

Gallery.prototype.openModal = function () {
  if (this.modal.matches(".open")) {
    console.info("modal open");
    return;
  }
  this.modal.classList.add("open");
  //event listeners to be bound when we open the modal:
  window.addEventListener("keyup", this.handleKeyUp);
  this.nextButton.addEventListener("click", this.showNextImage);
  this.prevButton.addEventListener("click", this.showPrevImage);
  this.closeButton.addEventListener("click", this.closeModal);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  //event listeners to be removed when we close the modal:
  window.removeEventListener("keyup", this.handleKeyUp);
  this.nextButton.removeEventListener("click", this.showNextImage);
  this.prevButton.removeEventListener("click", this.showPrevImage);
  this.closeButton.removeEventListener("click", this.closeModal);
};

Gallery.prototype.handleClickOutside = function (e) {
  if (e.target === e.currentTarget) {
    //if the thing that we clicked is the same that we are actually
    //listening for = outside (not anything inside it)
    this.closeModal();
  }
};

Gallery.prototype.handleKeyUp = function (e) {
  if (e.key === "Escape") return this.closeModal(); //one liner
  if (e.key === "ArrowRight") return this.showNextImage();
  if (e.key === "ArrowLeft") return this.showPrevImage();
  //return - if sb clicks escape we dont need to check arrows...
};

Gallery.prototype.showNextImage = function () {
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImage = function () {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

Gallery.prototype.showImage = function (el) {
  if (!el) {
    console.info("no image to show");
    return;
  }
  //update modal with info
  this.modal.querySelector("img").src = el.src;
  this.modal.querySelector("h4").textContent = el.title;
  this.modal.querySelector("figure p").textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

//pobieramy konkretną galerię i dla niej odpalamy funkcję Gallery!
const gallery1 = new Gallery(document.querySelector(".gallery-1"));
console.log(gallery1);
