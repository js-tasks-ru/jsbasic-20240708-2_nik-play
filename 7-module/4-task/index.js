
export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.steps = steps;
    this.value = value;
    this.segments = steps - 1;

    this.createSlider();
    this.addeventlisteners();
    }
    
    addeventlisteners(){
      let thumb = this.elem.querySelector('.slider__thumb');
      thumb.ondragstart = () => false;

      this.elem.addEventListener('click', (event) => this.click(event));
      this.elem.addEventListener('pointerdown', this.onMouseDown)

    }

    onMouseDown = (event) => {
      event.preventDefault();
      document.addEventListener('pointermove', this.onMouseMove);
      document.addEventListener('pointerup', this.onMouseUp, {once: true});
      this.elem.classList.add('slider_dragging')
    }

    onMouseMove = (event) => {
      event.preventDefault();
      this.left = event.clientX - this.elem.getBoundingClientRect().left;
      this.leftRelative = this.left / this.elem.offsetWidth;
    
        if (this.leftRelative < 0) {
          this.leftRelative = 0;
        }
    
        if (this.leftRelative > 1) {
          this.leftRelative = 1;
        }
    
        this.leftPercents = this.leftRelative * 100;
  
        this.value = Math.round(this.leftRelative * this.segments);

        this.valuePercents = this.value / this.segments * 100;

        this.thumb.style.left = `${this.leftPercents}%`;
        this.progress.style.width = `${this.leftPercents}%`;
        this.sliderValue.innerHTML = this.value;
        this.allSteps.forEach((span) => { 
          if (span.classList.contains('slider__step-active')) {
            span.classList.remove('slider__step-active')
          }
          this.allSteps[this.value].classList.add('slider__step-active')
          });
        
        }

        onMouseUp = () =>{
      document.removeEventListener('pointermove', this.onMouseMove);
      this.elem.classList.remove('slider_dragging')
      
      this.thumb.style.left = `${this.valuePercents}%`;
      this.progress.style.width = `${this.valuePercents}%`;

       this.elem.dispatchEvent(
        new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
        })
      );
    }

    click(event) {
      event.preventDefault()

      this.left = event.clientX - this.elem.getBoundingClientRect().left;
      this.leftRelative = this.left / this.elem.offsetWidth;
      this.value = Math.round(this.leftRelative * this.segments);
      this.valuePercents = this.value / this.segments * 100;
  
      this.thumb.style.left = `${this.valuePercents}%`;
      this.progress.style.width = `${this.valuePercents}%`;
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


      this.valuePercents = this.value / this.segments * 100;
  
      this.thumb.style.left = `${this.valuePercents}%`;
      this.progress.style.width = `${this.valuePercents}%`;
      this.sliderValue.innerHTML = this.value;

      this.thumb.style.left = `${this.valuePercents}%`;
      this.progress.style.width = `${this.valuePercents}%`;
      this.sliderValue.innerHTML = this.value;

        for(let i = 0; i < this.steps; i++) {
          let step = document.createElement('span');
          sliderSteps.appendChild(step);
        }
      this.allSteps = sliderSteps.querySelectorAll('span'); 
      this.allSteps[this.value].classList.add('slider__step-active');
    }
  }
