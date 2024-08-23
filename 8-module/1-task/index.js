import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    
    this.addEventListeners();

  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() { 
    let container = document.querySelector('.container');
    let mobile = '767px';
    
    if (container) {
      this.leftIndex = Math.min(
        container.getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px';
    }

    if (!this.initialCart) {
    this.initialCart = this.elem.getBoundingClientRect().top + window.scrollY;
    }

    if (window.scrollY > this.initialCart) {

      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 9999,
        right: '10px',
        left: this.leftIndex

      });
    } else {

      Object.assign(this.elem.style, {
        position: '',
        top: '',
        zIndex: '',
        right: '',
        left: '',

      });

    if (document.documentElement.clientWidth <= mobile) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        zIndex: '',
        right: '',
        left: '',
      });
      }
    }
  }
}
