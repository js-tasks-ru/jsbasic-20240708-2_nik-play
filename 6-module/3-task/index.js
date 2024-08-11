import createElement from '../../assets/lib/create-element.js';

const divArrow = createElement(`
        <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
`)

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement("div");
    this.elem.classList.add('carousel');
    
    this.elem.appendChild(divArrow)
    
    this.carouselInner();
    
    this.buttonSwitch();
    this.initCarousel()
  }

  buttonSwitch() {

    let divLeft = document.createElement('div');
    divLeft.classList.add('carousel__arrow')
    divLeft.classList.add('carousel__arrow_left')
   

    let imgLeft = document.createElement('img');
    imgLeft.src = "/assets/images/icons/angle-left-icon.svg";
    imgLeft.alt = "icon";
    
    divLeft.appendChild(imgLeft);
    
    this.elem.appendChild(divLeft);
  }

  carouselInner() {
    
    let divInner = document.createElement('div');
    divInner.classList.add('carousel__inner')

    for (let slide of this.slides) {

      let divSlide = document.createElement('div');
      divSlide.classList.add('carousel__slide')
      divSlide.dataset.id = slide.id;

       let ce = new CustomEvent("product-add", { 
          detail: slide.id, 
          bubbles: true 
      })

        let imgCarousel = document.createElement('img');
        imgCarousel.src = `/assets/images/carousel/${slide.image}`
        imgCarousel.alt = 'slide'
        imgCarousel.classList.add("carousel__img")

        let divCaption = document.createElement('div');
        divCaption.classList.add("carousel__caption")

        let span = document.createElement('span');
        span.classList.add('carousel__price')
        span.textContent = "€" + slide.price.toFixed(2);

        let divTitle = document.createElement('div');
        divTitle.classList.add('carousel__title')
        divTitle.textContent = slide.name;

        let button = document.createElement('button');
        button.classList.add('carousel__button')
        button.addEventListener('product-add', (ev) => {
       
        })
        button.addEventListener('click', () => {
            button.dispatchEvent(ce)
        })

        let img = document.createElement('img');
        img.src = "/assets/images/icons/plus-icon.svg";
        img.alt = "icon";

        button.appendChild(img);

        divCaption.appendChild(span);
        divCaption.appendChild(divTitle);
        divCaption.appendChild(button);

        divSlide.appendChild(imgCarousel);
        divSlide.appendChild(divCaption);

        divInner.appendChild(divSlide);
    }
    this.elem.appendChild(divInner);
  }


  initCarousel() {

  this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
  this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
  let innerCarousel = this.elem.querySelector('.carousel__inner');
  let carouselWidth = 500; //можно ведь задать заранее значение, если через offsetWidth нельзя?
  this.currentSlide = 0;
  this.currentIndex = 0;
  
  this.arrowLeft.style.display = 'none';  
  
  this.arrowRight.addEventListener('click', () => {
    this.currentSlide += carouselWidth;
      this.currentIndex++;
  
      innerCarousel.style.transform = `translateX(-${this.currentSlide}px)`
      this.updateArrowsVisibility()
      })
  
      this.arrowLeft.addEventListener('click', () => {
        this.currentSlide -= carouselWidth;
      this.currentIndex--;
  
      innerCarousel.style.transform = `translateX(-${this.currentSlide}px)`
      this.updateArrowsVisibility()
      })

      }
      updateArrowsVisibility() {
        if (this.currentIndex === 0) {
          this.arrowLeft.style.display ='none'
        } else this.arrowLeft.style.display = ''
        if (this.currentIndex >= this.slides.length - 1) {
          this.arrowRight.style.display ='none'
        } else this.arrowRight.style.display = ''

    }
  

}
