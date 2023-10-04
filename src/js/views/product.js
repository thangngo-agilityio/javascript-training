// DOM common
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
import {
  debounce
} from '../utils/debounce';
// images
import delIcon from '../../assets/icon/icon_del.svg';

/**
 * @class ProductView
 *
 * Manages view data user
 */
export default class ProductView {
  constructor() {
    this.listProduct = querySelector('.manage-list');
    this.addProduct = querySelector('#add-card');
    this.modalMain = querySelector('.modal-overlay');
    this.modalForm = querySelector('#modal-form');
    this.modalTitle = querySelector('#modal-title');
    this.btnAdd = querySelector('.btn-add-product');
    this.btnClose = querySelector('#close-btn');
    this.nameElement = querySelector('#name');
    this.priceElement = querySelector('#price');
    this.imageElement = querySelector('#image');
    this.quantityElement = querySelector('#quantity');
    this.query = {};
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

  /**
   * @description render product detail for edit card.
   */
  renderProductDetail(data) {
    this.modalMain.classList.remove('hidden');
    this.modalTitle.textContent = 'Edit';
    this.btnAdd.classList.add('hidden');
    const formBtn = querySelector('.form-btn')
    const btnEdit = createElement('button')
    btnEdit.setAttribute('type', 'button');
    btnEdit.setAttribute('class', 'btn btn-edit-product');
    btnEdit.textContent = 'Edit';

    formBtn.appendChild(btnEdit)

    this.nameElement.value = data.name || '';
    this.priceElement.value = data.price || '';
    this.imageElement.value = data.image || '';
    this.quantityElement.value = data.quantity || '';


    btnEdit.addEventListener('click', () => {
      console.log(123);
      console.log('btn: ', this.btnEdit);
      console.log('click: ', data);
      console.log('click: ', data.id);
      this.handlerEditProduct(data.id);
    });
  }

  /**
   * @description handler add product
   */
  handleAddProduct = async (handler) => {
    const formValues = getFormValues(this.modalForm);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage);
    } else {
      await handler(formValues);
      this.modalForm.reset();
      this.btnAdd.classList.add('hidden');
      this.btnEdit.classList.remove('hidden');
      this.modalMain.classList.add('hidden');
    }
  };

  /**
   * @description handler delete product
   */
  handlerDelProduct(handler) {
    const modalContent = this.listProduct;
    modalContent.addEventListener('click', (e) => {
      const target = e.target;
      const btnDel = target.closest('.btn-del');

      if (btnDel) {
        const productId = btnDel.dataset.id;
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
            modalOverlay.remove();
          }
        });
      }
    });
  }

  /**
   * @description handler detail product
   */
  handlerDetailProduct = (handler) => {
    this.listProduct.addEventListener('click', async (e) => {
      const target = e.target;
      const btnEdit = target.closest('.btn-edit');
      const idProduct = target.dataset.id;

      if (btnEdit) {
        if (idProduct !== undefined) {
          await handler(idProduct);
        }
      }
    });
  };

  /**
   * @description handler edit product
   */
  handlerEditProduct = async (id) => {
    const formValues = getFormValues(this.modalForm);

    const errorMessage = validateForm(formValues);
    const btnEdit = querySelector('.btn-edit-product')

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage);
    } else {
      await this.updateProduct({
        ...formValues,
        id,
      });
      btnEdit.remove()
      this.modalForm.reset();
      this.modalMain.classList.add('hidden');
    }
  };

  /**
   * @description handler sort product
   */
  handlerSortProduct = async (data) => {
    const sortSelect = querySelector('.sort-dropdown');

    sortSelect.addEventListener('change', (e) => {
      const target = e.target.value;
      if (target == 'name-asc') {
        data.sort((nameFirst, nameSecond) => {
          if (nameFirst.name < nameSecond.name) return -1;
          if (nameFirst.name > nameSecond.name) return 1;
          return 0;
        });
      } else if (target == 'name-dec') {
        data.sort((nameFirst, nameSecond) => {
          if (nameFirst.name > nameSecond.name) return -1;
          if (nameFirst.name < nameSecond.name) return 1;
          return 0;
        });
      } else if (target == 'price-asc') {
        data.sort((priceFirst, priceSecond) => {
          if (priceFirst.price < priceSecond.price) return -1;
          if (priceFirst.price > priceSecond.price) return 1;
          return 0;
        });
      } else if (target == 'price-dec') {
        data.sort((priceFirst, priceSecond) => {
          if (priceFirst.price > priceSecond.price) return -1;
          if (priceFirst.price < priceSecond.price) return 1;
          return 0;
        });
      }

      this.displayProduct(data);
    });
  };

  removeBtnEdit() {
    window.removeEventListener('click', this.btnEdit.bind(this))
  }

  bindAddProduct = (handler) => {
    this.btnAdd.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleAddProduct(handler);
    });
  };

  bindDelProduct = (handler) => {
    this.handlerDelProduct(handler);
  };

  bindDetailProduct = (handler) => {
    this.handlerDetailProduct(handler);
  };

  bindSearchProduct = async (handler) => {
    const searchProduct = querySelector('.input-search');

    const searchName = debounce(async (e) => {
      this.query.filter = e.target.value;
      await handler(this.query);
    }, 500);

    searchProduct.addEventListener('input', searchName);
  };

  bindSortProduct = async (data) => {
    this.handlerSortProduct(data);
  };

  bindProductList(handler) {
    this.bindSearchProduct(handler);
  }

  /**
   * @description manage add event listener for page
   */
  bindManageEvent() {
    this.addProduct.addEventListener('click', () => {
      this.modalTitle.textContent = 'Create a new food';
      this.btnAdd.classList.remove('hidden');
      this.btnEdit.classList.add('hidden');
      this.modalMain.classList.remove('hidden');
    });

    this.btnClose.addEventListener('click', () => {
      this.modalForm.reset();
      clearError();
      this.modalMain.classList.add('hidden');
    });
  }
}
