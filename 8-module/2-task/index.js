import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.elem = document.createElement("div");
    this.elem.classList.add('products-grid')

    this.Inner = document.createElement("div");
    this.Inner.classList.add('products-grid__inner')
    this.elem.appendChild(this.Inner)

    this.products = products;
    this.filteredProducts = [];
    this.activeFilters = {};

    this.createAllProducts();
  }

  createAllProducts() {
    this.products.map((product) => {
      let productCard = new ProductCard(product)
      this.Inner.appendChild(productCard.elem)
    })
  }

  filter() {

    this.filteredProducts = this.products.filter((product) => {
         
        if (this.activeFilters.noNuts && product.nuts) {
            return false;
        }

        if (this.activeFilters.vegeterianOnly && !product.vegeterian) {
            return false;
        }

        if (this.activeFilters.maxSpiciness !== undefined && product.spiciness > this.activeFilters.maxSpiciness) {
            return false;
        }

        if (this.activeFilters.category && product.category !== this.activeFilters.category) {
            return false;
        }

        return true;
    });
  }

  updateFilter(filters) {

        this.activeFilters = Object.assign(this.activeFilters, filters);

        this.filter()
    
        this.Inner.innerHTML = "";
    
        this.filteredProducts.forEach((product) => {
            let productCard = new ProductCard(product);
            this.Inner.appendChild(productCard.elem);
        });
        }

}
