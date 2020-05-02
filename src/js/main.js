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
}

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
  } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
    //up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});

//look of hamburger menu after slightly scrolling down
function changeHamburger() {
  const mq835 = window.matchMedia('(max-width: 835px)');
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
navHamburger.addEventListener('click', function () {
  const isOpened = navHamburger.getAttribute('aria-expanded') === 'true';

  navHamburger.classList.toggle('btn-menu_open', !isOpened);
  navHamburger.setAttribute('aria-expanded', String(!isOpened));
  navMenu.classList.toggle('nav__menu_open', !isOpened);
});

//menu closes after clicking one of the links
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function () {
    navMenu.classList.toggle('nav__menu_open');
    navHamburger.classList.toggle('btn-menu_open');
    navHamburger.setAttribute('aria-expanded', 'false');
  });
}

//animation on scroll - skills-slide sections - only the first
const slide = document.querySelector(".slide--js");

if (
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
  let observer = new IntersectionObserver(entries => {
    if (entries[0].boundingClientRect.y < 0) {
      slide.classList.add("slide-emerge");
    } else {
      slide.classList.remove("slide-emerge");
    }
  });
  observer.observe(document.querySelector("#pixel-anchor"));
}

//section experience - elements appear on scroll
const sliders = document.querySelectorAll('.experience__content');

const slideOptions = {
  rootMargin: '-50px',
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      return;
    } else {
      entry.target.firstElementChild.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, slideOptions);

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});