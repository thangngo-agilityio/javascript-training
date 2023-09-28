import {
  createElement,
  querySelector
} from "../helpers/doms";
import {
  productTemplate
} from "../templates/productCard";
// utils
import {
  getFormValues
} from "../utils/formValue";
import {
  clearError,
  showError
} from "../utils/validators/formError";
import {
  validateForm
} from "../utils/validators/validateForm";

import delIcon from '../../assets/icon/icon_del.svg';


export default class ProductView {
  constructor() {
    this.listProduct = querySelector('.manage-list');
    this.addProduct = querySelector('.manage-card')
    this.modalMain = querySelector('#modal-main')
    this.modalForm = querySelector('#modal-form')
    this.modalTitle = querySelector('#modal-title')
    this.btnSave = querySelector('#save-btn')
    this.btnClose = querySelector('#close-btn');
    this.nameElement = querySelector('#food');
    this.priceElement = querySelector('#price');
    this.imageElement = querySelector('#image');
    this.quantityElement = querySelector('#quantity');
  }

  handleAddProduct = async (e) => {
    e.preventDefault()
    const formValues = getFormValues(this.modalForm)

    const errorMessage = validateForm(formValues);
    console.log(errorMessage);


    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage)
      console.log(errorMessage);
    } else {
      this.btnSave.setAttribute('disabled', '');
      await this.addCard(formValues);
      this.modalForm.reset();
      this.modalMain.remove();
    }
  }

  bindAddProduct = (handler) => {
    this.btnSave.addEventListener('click', () => {
      this.addCard = handler;
      clearError()
    })

    this.modalForm.addEventListener('submit', this.handleAddProduct)
  }

  displayProduct(data) {
    console.log(data);
    if (this.listProduct.lastElementChild !== null) {
      while (this.listProduct.lastElementChild.id !== 'add-card') {
        this.listProduct.removeChild(this.listProduct.lastElementChild)
      }
    }

    if (data) {
      data.forEach(product => {
        const divProduct = createElement('div')
        divProduct.setAttribute('class', 'product-card')
        divProduct.innerHTML = productTemplate(delIcon, product)

        this.listProduct.append(divProduct);
      })
    }

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
