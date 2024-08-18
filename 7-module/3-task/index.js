
export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.elem = document.createElement('div')
    this.elem.classList.add('slider')
    this.steps = steps;


    this.createSliderThumbProgress ()
    this.sliderSteps ()

    this.buttonMoveSlider = (event) => {
      event.preventDefault
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      let valuePercents = this.value / segments * 100;

      let ce = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })

      this.sliderValue.textContent = this.value
      this.sliderThumb.style=`left: ${valuePercents}%;`
      this.sliderProgress.style=`width: ${valuePercents}%;`

      let sliderSteps = this.elem.querySelectorAll('span')
      sliderSteps.forEach((span) => { 
        if (span.classList.contains('slider__step-active')) {
          span.classList.remove('slider__step-active')
        }
        sliderSteps[this.value + 1].classList.add('slider__step-active')
        
      })
      sliderSteps[this.value + 1].dispatchEvent(ce)
      }
      this.elem.addEventListener('click', this.buttonMoveSlider)
    }
 

 
  createSliderThumbProgress () {
    this.sliderProgress = document.createElement('div')
    this.sliderThumb = document.createElement('div')
    this.sliderValue = document.createElement('span')

    this.sliderThumb.classList.add('slider__thumb')
    this.sliderThumb.style="left: 0%;"

    this.sliderProgress.classList.add('slider__progress')
    this.sliderProgress.style="width: 0%;"

    this.sliderValue.classList.add('slider__value')
    this.sliderValue.textContent = 0

    this.sliderThumb.appendChild(this.sliderValue)
    this.elem.appendChild(this.sliderThumb)
    this.elem.appendChild(this.sliderProgress)
  }

  sliderSteps () {
    let sliderSteps = document.createElement('div')
    sliderSteps.classList.add('slider__steps')

    for (let i = 0; i < this.steps; i++) {
      let sliderStepActive = document.createElement('span')
      if (i == 0) {
      sliderStepActive.classList.add('slider__step-active')
      }
      sliderSteps.appendChild(sliderStepActive)
    }
 
    this.elem.appendChild(sliderSteps)
  }
}
