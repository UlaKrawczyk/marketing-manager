"use strict";

//slider w podstronach z zadaniami

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

console.log('wreszcie działa!!!')
startSlide();