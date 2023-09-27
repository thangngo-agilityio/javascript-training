import {
  createElement,
  querySelector
} from "../helpers/doms";

export default class ProductView {
  constructor() {
    this.listProduct = querySelector('manage-list');
    this.addProduct = querySelector('.manage-card')
    this.modalMain = querySelector('#modal-main')
    this.modalForm = querySelector('#modal-form')
    this.modalTitle = querySelector('#modal-title')
    this.btnClose = querySelector('#close-btn');
  }

  handleAddProduct = (products) => {
    this.modalForm.addEventListener('submit', e => {
      e.preventDefault();

      products.forEach(product => {
        const divProduct = createElement
      })
    })
  }

  displayProduct() {


    this.bindManageEvent();
  }

  bindManageEvent() {
    this.addProduct.addEventListener('click', () => {
      this.modalTitle.textContent = 'Create a new food'
      this.modalMain.classList.remove('hidden')
    })

    this.btnClose.addEventListener('click', () => {
      this.modalMain.classList.add('hidden')
    })
  }


}
