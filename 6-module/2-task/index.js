import createElement from '../../assets/lib/create-element.js';

const table = createElement(`
    <table class="table">
        <thead>
            <tr>
                <th>Имя</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Вася</td>
            </tr>
            <tr>
                <td>Петя</td>
            </tr>
        </tbody>
    </table>
`)
export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = document.createElement("div")
    this.elem.classList.add('card')
    this.createTopCard();
    this.createBodyCard();
    this.ce = new CustomEvent("product-add", { 
        detail: this.product.id, 
        bubbles: true 
  })
}


createTopCard() {
    let div = document.createElement('div');
    div.classList.add('card__top')

    let img = document.createElement('img');
    img.classList.add('card__image')
    img.src = `/assets/images/products/${this.product.image}`
    img.alt = 'product';

    let span = document.createElement('span');
    span.classList.add('card__price')
    span.textContent = "€" + this.product.price.toFixed(2)

    div.appendChild(img)
    div.appendChild(span)
    this.elem.appendChild(div)

}

createBodyCard() {
    let divBody = document.createElement('div');
    divBody.classList.add('card__body')

    let divTitle = document.createElement('div');
    divTitle.classList.add('card__title');
    divTitle.textContent = this.product.name

    let button = document.createElement('button');
    button.classList.add('card__button')
    button.type = "button"
    button.addEventListener('product-add', (ev) => {
       
    })
    button.addEventListener('click', () => {
        button.dispatchEvent(this.ce)
    })

    let img = document.createElement('img');
    img.src = "/assets/images/icons/plus-icon.svg"
    img.alt = 'icon';
    
    divBody.appendChild(divTitle) 
    button.appendChild(img)
    divBody.appendChild(button)   
    this.elem.appendChild(divBody)

}


}