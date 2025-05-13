
export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.steps = steps;
    this.value = value;
    this.segments = steps - 1;

    this.createSlider() 
    this.addeventlisteners()
  }

  addeventlisteners(){
    this.elem.addEventListener('click', (event) => this.newSliderValue(event));
  }

  newSliderValue(event) {
    event.preventDefault()

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    this.value = Math.round(leftRelative * this.segments);
    let valuePercents = this.value / this.segments * 100;
  
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    this.sliderValue.innerHTML = this.value;

    for (let step of this.allSteps) {
      step.classList.remove('slider__step-active');
    }
    this.allSteps[this.value].classList.add('slider__step-active');


    this.elem.dispatchEvent(
    new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    })
    );

  }

  createSlider() {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    let sliderThumb = document.createElement('div');
    sliderThumb.classList.add('slider__thumb')
    this.elem.appendChild(sliderThumb);

    this.sliderValue = document.createElement('span');
    this.sliderValue.classList.add('slider__value');
    this.sliderValue.innerHTML = this.value;
    
    sliderThumb.appendChild(this.sliderValue);

    let progressBar = document.createElement('div');
    progressBar.classList.add("slider__progress");
    this.elem.appendChild(progressBar);

    let sliderSteps = document.createElement('div');
    sliderSteps.classList.add("slider__steps");
    this.elem.appendChild(sliderSteps);

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');

    this.thumb.style.left = `0%`;
    this.progress.style.width = `0%`;

      for(let i = 0; i < this.steps; i++) {
        let step = document.createElement('span');
        sliderSteps.appendChild(step);
      }
    this.allSteps = sliderSteps.querySelectorAll('span'); 
    this.allSteps[this.value].classList.add('slider__step-active');
  }

}
