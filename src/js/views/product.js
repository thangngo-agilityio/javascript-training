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
  showError
} from "../utils/validators/formError";
import {
  validateForm
} from "../utils/validators/validateForm";

import delIcon from '../../assets/icon/icon_del.svg';
import editIcon from '../../assets/icon/icon_edit.svg'


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

    this.products = null
  }

  handleAddProduct = async (e) => {
    e.preventDefault()
    const formValues = getFormValues(this.modalForm)

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage, this.modalForm)
    } else {

      this.btnSave.setAttribute('disabled', '');
      await this.addProduct(formValues);
      this.modalForm.reset();
      this.modalMain.remove();
    }
  }

  bindAddProduct = (handler) => {
    this.btnSave.addEventListener('click', () => {
      this.addProduct = handler;
    })

    this.modalForm.addEventListener('submit', this.handleAddProduct)
  }

  displayProduct(data) {
    console.log(data);

    const divProduct = createElement('div');
    divProduct.classList.add('product-card')
    divProduct.innerHTML = productTemplate(delIcon, editIcon, data)
    this.listProduct.append(divProduct)


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
