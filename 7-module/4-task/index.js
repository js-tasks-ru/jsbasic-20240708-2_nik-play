
export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.elem = document.createElement('div')
    this.elem.classList.add('slider')
    this.steps = steps;

    this.createSliderThumbProgress ()
    this.sliderSteps ()

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    

    this.buttonDown = (event) => {
      

      document.addEventListener('pointermove', this.onMouseMove)
      document.addEventListener('pointerup', this.onMouseUp)
      }


    this.onMouseMove = (event) => {
      this.elem.classList.add('slider_dragging')
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
    
        if (leftRelative < 0) {
            leftRelative = 0;
        }
    
        if (leftRelative > 1) {
            leftRelative = 1;
        }
    
        let leftPercents = leftRelative * 100;
  
        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
  
        this.value = Math.round(approximateValue);

        this.sliderValue.textContent = this.value
        this.sliderThumb.style.left = `${leftPercents}%`;
        this.sliderProgress.style.width = `${leftPercents}%`;
        
        }

    this.onMouseUp = (event) => {
      document.removeEventListener('pointermove', this.onMouseMove);
     this.elem.classList.remove('slider_dragging')
      thumb.onMouseUp = null;

      let ce = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
      
    let sliderSteps = this.elem.querySelectorAll('span')
    sliderSteps.forEach((span) => { 
      if (span.classList.contains('slider__step-active')) {
        span.classList.remove('slider__step-active')
      }
      sliderSteps[this.value + 1].classList.add('slider__step-active')
      
    })
    sliderSteps[this.value + 1].dispatchEvent(ce)
    }

    this.buttonClick = (event) => {
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

      thumb.addEventListener('pointerdown', this.buttonDown)
      this.elem.addEventListener('click', this.buttonClick)
      
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
