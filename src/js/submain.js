"use strict";

//slider on subpages with tasks lists

const arrowLeft = document.querySelector('#arrow-left');
const arrowRight = document.querySelector('#arrow-right');
let sliderTasks = document.querySelectorAll('.task-main');
let sliderFooters = document.querySelectorAll('.task-footer');
let current = 0;

function reset() {
  for (let i = 0; i < sliderTasks.length; i++) {
    sliderTasks[i].style.display = "none";
    sliderFooters[i].style.display = "none";
  }
}

function startSlide() {
  reset();
  sliderTasks[0].style.display = 'block';
  sliderFooters[0].style.display = 'block';
}

function slideLeft() {
  reset();
  sliderTasks[current - 1].style.display = "block";
  sliderFooters[current - 1].style.display = "block";
  current--;
}

function slideRight() {
  reset();
  sliderTasks[current + 1].style.display = "block";
  sliderFooters[current + 1].style.display = "block";
  current++;
}

arrowLeft.addEventListener('click', function () {
  if (current === 0) {
    current = sliderTasks.length;
  }
  slideLeft();
});
arrowRight.addEventListener('click', function () {
  if (current === sliderTasks.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();