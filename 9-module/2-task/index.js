import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {}

  async render() {

    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();

    this.cart = new Cart(this.cartIcon);

    this.products = await this.fetchProducts();

    const gridHolder = document.querySelector('[data-products-grid-holder]');
    gridHolder.innerHTML = ''; 
    this.productsGrid = new ProductsGrid(this.products);
    gridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail;
      const product = this.products.find(item => item.id === productId);
      if (product) {
        this.cart.addProduct(product);
      }
    });

    document.body.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({ category: event.detail });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({ noNuts: event.target.checked });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
    });
  }

  renderCarousel() {
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
  }

  renderRibbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
  }

  renderCartIcon() {
    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
  }

  async fetchProducts() {
    const response = await fetch('products.json');
    const products = await response.json();
    return products;
  }
}
