import createElement from '../../assets/lib/create-element.js';

const LeftRibon = createElement(`
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
`)

const RightRibon = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  `)

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement("div");
    this.elem.classList.add('ribbon');

    this.elem.appendChild(LeftRibon)
    this.scrollInner()
    this.elem.appendChild(RightRibon)
    this.Scrolling()
  }

scrollInner () {
  let navInner = document.createElement("nav");
  navInner.classList.add('ribbon__inner');

    for (let category of this.categories) {

      let a = document.createElement("a");
      a.href = "#";
      a.classList.add('ribbon__item');
      a.dataset.id = category.id;
      a.textContent = category.name;

    let ce = new CustomEvent('ribbon-select', { 
      detail: category.id, 
      bubbles: true    
  })
  a.addEventListener('click', (ev) => {
    ev.preventDefault()

    navInner.querySelectorAll('a').forEach(item => {
      item.classList.remove('ribbon__item_active')
    })
    a.classList.add('ribbon__item_active');
    a.dispatchEvent(ce);
})

  navInner.appendChild(a)

  let allButtons = navInner.querySelectorAll('a');
  allButtons[0].classList.add('ribbon__item_active')
}

this.elem.appendChild(navInner)
  }


  Scrolling() {
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right')
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left')
    this.arrowLeft.classList.remove('ribbon__arrow_visible');
    this.arrowRight.classList.add('ribbon__arrow_visible')
    this.ribbonInner = this.elem.querySelector('.ribbon__inner')

    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0)
    })

    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0)
    })
    
    this.ribbonInner.addEventListener('scroll', () => {
      this.updateScrollVisibility();
    });
  }

  updateScrollVisibility() {

    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollRight = this.ribbonInner.scrollWidth - scrollLeft - this.ribbonInner.clientWidth;

    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else this.arrowLeft.classList.add('ribbon__arrow_visible');
  
    if (scrollRight <= 0) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else this.arrowRight.classList.add('ribbon__arrow_visible');
    

    }
}


