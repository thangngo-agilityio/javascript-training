import {
  createElement,
  querySelector
} from '../helpers/doms';
import {
  productTemplate
} from '../templates/productCard';
// utils
import {
  getFormValues
} from '../utils/formValue';
import {
  clearError,
  showError
} from '../utils/validators/formError';
import {
  validateForm
} from '../utils/validators/validateForm';

import delIcon from '../../assets/icon/icon_del.svg';

export default class ProductView {
  constructor() {
    this.listProduct = querySelector('.manage-list');
    this.addProduct = querySelector('.manage-card');
    this.modalMain = querySelector('#modal-main');
    this.modalForm = querySelector('#modal-form');
    this.modalTitle = querySelector('#modal-title');
    this.btnSave = querySelector('#save-btn');
    this.btnClose = querySelector('#close-btn');
    this.nameElement = querySelector('#food');
    this.priceElement = querySelector('#price');
    this.imageElement = querySelector('#image');
    this.quantityElement = querySelector('#quantity');
  }

  displayProduct(data) {
    if (this.listProduct.lastElementChild !== null) {
      while (this.listProduct.lastElementChild.id !== 'add-card') {
        this.listProduct.removeChild(this.listProduct.lastElementChild);
      }
    }

    if (data) {
      data.forEach((product) => {
        const divProduct = createElement('div');
        divProduct.setAttribute('class', 'product-card');
        divProduct.innerHTML = productTemplate(delIcon, product);

        this.listProduct.append(divProduct);
      });
    }

    this.bindManageEvent();
  }

  handleAddProduct = async (e) => {
    e.preventDefault();
    const formValues = getFormValues(this.modalForm);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage);
    } else {
      this.btnSave.setAttribute('disabled', '');
      await this.addCard(formValues);
      this.modalForm.reset();
    }
  };

  handlerDelProduct(handler) {
    const modalContent = this.listProduct
    modalContent.addEventListener('click', (e) => {
      const target = e.target;
      const btnDel = target.closest('.btn-del');
      const productId = btnDel.dataset.id;
      if (btnDel) {
        const container = querySelector('.container');

        const modalOverlay = createElement('div');
        modalOverlay.setAttribute('class', 'modal-overlay');

        const modalConfirm = createElement('div');
        modalConfirm.setAttribute('class', 'modal-confirm');

        const titleConfirm = createElement('h2');
        titleConfirm.setAttribute('class', 'confirm-title');
        titleConfirm.textContent = 'Are you sure you want to delete this food?';

        const groupBtn = createElement('div');
        groupBtn.setAttribute('class', 'confirm-btn');

        const confirmCancel = createElement('button');
        confirmCancel.setAttribute('class', 'btn btn-cancel');
        confirmCancel.textContent = 'Cancel';
        const confirmYes = createElement('button');
        confirmYes.setAttribute('class', 'btn btn-yes');
        confirmYes.textContent = 'Yes';

        groupBtn.append(confirmCancel, confirmYes);

        modalConfirm.append(titleConfirm, groupBtn);

        modalOverlay.appendChild(modalConfirm);

        container.appendChild(modalOverlay);

        confirmCancel.addEventListener('click', () => {
          modalOverlay.classList.add('hidden');
        });

        confirmYes.addEventListener('click', () => {
          if (confirmYes) {
            handler(productId);
            modalOverlay.remove()
          }
        });
      }
    });
  };

  bindAddProduct = (handler) => {
    this.btnSave.addEventListener('click', () => {
      this.addCard = handler;
      clearError();
      this.modalMain.classList.add('hidden');
    });

    this.modalForm.addEventListener('submit', this.handleAddProduct);
  };

  bindDelProduct = (handler) => {
    this.handlerDelProduct(handler);
  };

  bindManageEvent() {
    this.addProduct.addEventListener('click', () => {
      this.modalTitle.textContent = 'Create a new food';
      this.modalMain.classList.remove('hidden');
    });

    this.btnClose.addEventListener('click', () => {
      this.modalMain.classList.add('hidden');
    });
  }
}