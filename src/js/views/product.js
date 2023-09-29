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
    this.nameElement = querySelector('#name');
    this.priceElement = querySelector('#price');
    this.imageElement = querySelector('#image');
    this.quantityElement = querySelector('#quantity');
  }

  displayProduct(data) {
    if (data) {
      data.forEach((product) => {
        const divProduct = createElement('div');
        divProduct.setAttribute('class', 'product-card');
        divProduct.innerHTML = productTemplate(delIcon, product);

        this.listProduct.append(divProduct);
      });
    }
    this.bindDetailProduct(data)
    this.bindManageEvent();
  }

  handleAddProduct = async (e) => {
    e.preventDefault();
    const formValues = getFormValues(this.modalForm);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage);
    } else {
      await this.addCard(formValues);
      this.modalForm.reset();
      this.modalMain.classList.add('hidden')
    }
  };

  handlerDelProduct(handler) {
    const modalContent = this.listProduct
    modalContent.addEventListener('click', (e) => {
      const target = e.target;
      const btnDel = target.closest('.btn-del');
      const productId = btnDel.dataset.id;

      if (productId) {
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

  handleDetailProduct(data) {
    const index = [...data].find(i => i.id)
    console.log(data);
    this.nameElement.value = index.name
    this.priceElement.value = index.price
    this.imageElement.value = index.image
    this.quantityElement.value = index.quantity

    this.listProduct.addEventListener('click', (e) => {
      const target = e.target
      const btnEdit = target.closest('.btn-edit')
      const productId = btnEdit.dataset.id
      if (productId === index.id) {
        console.log(index.id);
        this.modalMain.classList.remove('hidden')
        this.submitEditProduct(data)
      }
    })
  }

  async handlerUpdateUser(data) {
    const formValues = getFormValues(this.modalForm);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage);
    } else {
      await this.bindUpdateUser({ ...formValues, data});
      this.modalForm.reset();
      this.modalMain.classList.add('hidden')
    }
  }

  submitEditProduct(data) {
    this.modalForm.addEventListener('submit', () => {
      this.handlerUpdateUser(data)
    })
  }

  bindAddProduct = (handler) => {
    this.btnSave.addEventListener('click', () => {
      this.addCard = handler;
      console.log(this.addCard = handler);
      clearError();
    });

    this.modalForm.addEventListener('submit', this.handleAddProduct);
  };

  bindDelProduct = (handler) => {
    this.handlerDelProduct(handler);
  };

  bindDetailProduct = (data) => {
    this.handleDetailProduct(data)
  }

  bindManageEvent() {
    this.addProduct.addEventListener('click', () => {
      this.modalTitle.textContent = 'Create a new food';
      this.modalMain.classList.remove('hidden');
    });

    this.btnClose.addEventListener('click', () => {
      this.modalForm.reset()
      this.modalMain.classList.add('hidden');
    });
  }
}
