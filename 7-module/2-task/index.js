import createElement from '../../assets/lib/create-element.js';

const modalOverlay = createElement(`
    <div class="modal__overlay"></div>
  `)
  const modalInner = createElement(`
    <div class="modal__inner"> </div>
    `)
  const buttonClose = createElement(`
    <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
    </button>
    `)
  const modalHeader = createElement(`
      <div class="modal__header"></div>
      `)
  const modalTitle = createElement(`
        <h3 class="modal__title"></h3>
      `)
  const modalBody = createElement (`
    <div class="modal__body"></div>
    `)
export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    modalInner.appendChild(modalHeader);
    modalInner.appendChild(buttonClose);
    modalInner.appendChild(modalTitle);
    modalInner.appendChild(modalBody);
    
    this.modal.appendChild(modalOverlay);
    this.modal.appendChild(modalInner);


    this.keyListener = (event) => {
      if (event.code == 'Escape') {
        this.close();
      }
    }
    this.buttonCloseListener = () => {
      this.close()
    }
    buttonClose.addEventListener('click', this.buttonCloseListener)
}

open() {
  let body = document.querySelector('body')
  body.classList.add('is-modal-open')
  body.appendChild(this.modal);
  document.addEventListener('keydown', this.keyListener)
}

setTitle(modalTitle) {
let title =  this.modal.querySelector('.modal__title')
title.textContent = ''
title.textContent = modalTitle

}

setBody(node) {
  let modalInner = this.modal.querySelector('.modal__inner');
  let modalBody = modalInner.querySelector('.modal__body');

  modalBody.innerHTML = ''
  modalBody.appendChild(node)
  
}

close() {
  let body = document.querySelector('body')
  body.classList.remove('is-modal-open')
  this.modal.remove()
  document.removeEventListener('keydown', this.keyListener)
  buttonClose.removeEventListener('click', this.buttonCloseListener)
}
}
