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
import {
  sortAsc,
  sortNameAsc,
  sortNameDec,
  sortPriceAsc,
  sortPriceDec,
  sortValue
} from '../utils/sortValue';
import {
  handleToggleLoading
} from '../helpers/toggle';
import {
  TOGGLE_STATUS
} from '../constants/common';

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
      this.handlerUpdateProduct(data.id);
      this.modalMain.classList.add('hidden');
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
  handlerUpdateProduct = async (id) => {
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
    }
  };

  handlerSearchProduct = (handler) => {
    const searchProduct = querySelector('.input-search');

    const searchName = debounce(async (e) => {
      this.query.filter = e.target.value;
      await handler(this.query);
    }, 500);

    searchProduct.addEventListener('input', searchName);
  }

  /**
   * @description handler sort product
   */
  handlerSortProduct = async (data) => {
    const sortSelect = querySelector('.sort-dropdown');

    sortSelect.addEventListener('change', (e) => {
      e.preventDefault()
      handleToggleLoading(TOGGLE_STATUS.OPEN)
      const target = e.target.value;
      setTimeout(() => {
        switch (target) {
          case 'name-asc':
            sortNameAsc(data)
            break;
          case 'name-dec':
            sortNameDec(data)
            break;
          case 'price-asc':
            sortPriceAsc(data)
            break
          case 'price-dec':
            sortPriceDec(data)
            break;
          default:
            break
        }
        this.displayProduct(data);
        handleToggleLoading(TOGGLE_STATUS.CLOSE)
      }, 500);
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
    this.handlerSearchProduct(handler)
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
      this.modalMain.classList.remove('hidden');
    });

    this.btnClose.addEventListener('click', () => {
      this.modalForm.reset();
      clearError();
      this.modalMain.classList.add('hidden');
    });
  }
}
