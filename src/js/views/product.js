// helpers
import {
  createElement,
  querySelector,
  handleToggleLoading,
  querySelectorAll,
  Popup,
} from '../helpers/index.js';
// Constants
import {
  PRODUCT_MESSAGE,
  TOGGLE_STATUS,
} from '../constants/index.js';
// Templates
import {
  productTemplate
} from '../templates/productCard.js';
// utils
import {
  getFormValues,
  clearError,
  showError,
  validateForm,
  sortNameAsc,
  sortNameDec,
  sortPriceAsc,
  sortPriceDec,
  removeErrorMessage,
} from '../utils/index.js';
/**
 * @class ProductView
 *
 * Manages view data user
 */
export default class ProductView {
  constructor() {
    this.listProduct = querySelector('#manage-list');
    this.addProduct = querySelector('#add-card');
    this.modalMain = querySelector('#modal-overlay');
    this.modalForm = querySelector('#modal-form');
    this.modalTitle = querySelector('#modal-title');
    this.modalDel = querySelector('#modal-del');
    this.btnAdd = querySelector('#btn-add');
    this.btnClose = querySelector('#close-btn');
    this.confirmCancel = querySelector('#btn-cancel');
    this.nameElement = querySelector('#name');
    this.priceElement = querySelector('#price');
    this.imageElement = querySelector('#image');
    this.quantityElement = querySelector('#quantity');
    this.inputAll = querySelectorAll('.form-input');
    this.query = {};
    this.popup = new Popup();
  }

  displayProduct(data) {
    if (this.listProduct && this.listProduct.lastElementChild !== null) {
      while (this.listProduct.lastElementChild.id !== 'add-card') {
        this.listProduct.removeChild(this.listProduct.lastElementChild);
      }
    }

    if (data.length > 0) {
      data.forEach((product) => {
        const divProduct = createElement('div');
        divProduct.setAttribute('class', 'product-card');
        divProduct.innerHTML = productTemplate(product);
        this.listProduct.append(divProduct);
      });
    } else {
      const emptyMessage = createElement('p');
      emptyMessage.setAttribute('class', 'empty-message')
      emptyMessage.innerHTML = `No food items available!!`
      this.listProduct.append(emptyMessage)
    }
  }

  /**
   * @description render product detail for edit card.
   */
  renderProductDetail(data) {
    this.modalMain.classList.remove('hidden');
    this.modalTitle.textContent = 'Edit';
    this.btnAdd.classList.add('hidden');
    const formBtn = querySelector('.form-btn');
    const btnEdit = createElement('button');
    btnEdit.setAttribute('type', 'button');
    btnEdit.setAttribute('class', 'btn btn-edit-product');
    btnEdit.textContent = 'Save';

    formBtn.appendChild(btnEdit);

    this.nameElement.value = data.name || '';
    this.priceElement.value = data.price || '';
    this.imageElement.value = data.image || '';
    this.quantityElement.value = data.quantity || '';

    btnEdit.addEventListener('click', () => {
      if (data.name != this.nameElement.value || data.price != this.priceElement.value || data.image != this.imageElement.value || data.quantity != this.quantityElement.value) {
        removeErrorMessage();
        btnEdit.setAttribute('disabled', false)
        this.handleUpdateProduct(data.id);
      } else {
        btnEdit.setAttribute('disabled', true)
        this.modalMain.classList.add('hidden');
        btnEdit.remove();
        this.popup.error({message: PRODUCT_MESSAGE.EDIT_FAILED})
      }
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
      this.popup.error({
        message: PRODUCT_MESSAGE.ADD_FAILED,
      });
    } else {
      try {
        await handler(formValues);
        this.modalForm.reset();
        this.btnAdd.classList.add('hidden');
        this.modalMain.classList.add('hidden');
        this.popup.success({
          message: PRODUCT_MESSAGE.ADD_SUCCESS,
        });
      } catch (error) {
        return error;
      }
    }
  };

  /**
   * @description handler delete product
   */
  handleDelProduct(handler) {
    if (this.listProduct) {
      this.listProduct.addEventListener('click', (e) => {
        const target = e.target;
        const btnDel = target.closest('.btn-del');

        if (btnDel) {
          const productId = btnDel.dataset.id;
          this.modalDel.style.display = 'flex';
          const confirmBtn = querySelector('.confirm-btn');
          const confirmYes = createElement('button');
          confirmYes.setAttribute('class', 'btn btn-yes');
          confirmYes.textContent = 'Yes';
          confirmBtn.appendChild(confirmYes);

          confirmYes.addEventListener('click', () => {
            if (confirmYes) {
              handler(productId);
              this.modalDel.style.display = 'none';
              confirmYes.remove();
              this.popup.success({
                message: PRODUCT_MESSAGE.REMOVE_SUCCESS,
              });
            }
          });
        }
      });
    }
  }

  /**
   * @description handler detail product
   */
  handleDetailProduct = (handler) => {
    if (this.listProduct) {
      this.listProduct.addEventListener('click', async (e) => {
        const target = e.target;
        const btnEdit = target.closest('.btn-edit');
        const idProduct = target.dataset.id;

        if (btnEdit) {
          await handler(idProduct);
        }
      });
    }
  };

  /**
   * @description handler edit product
   */
  handleUpdateProduct = async (id) => {
    const formValues = getFormValues(this.modalForm);

    const errorMessage = validateForm(formValues);
    const btnEdit = querySelector('.btn-edit-product');

    if (Object.keys(errorMessage).length !== 0) {
      showError(errorMessage);
    } else {
      try {
        await this.updateProduct({
          ...formValues,
          id,
        });
        btnEdit.remove();
        this.modalMain.classList.add('hidden');
        this.modalForm.reset();
        this.popup.success({
          message: PRODUCT_MESSAGE.EDIT_SUCCESS,
        });
      } catch (error) {
        return error;
      }
    }
  };

  /**
   * @description handler search product
   */
  handleSearchProduct = (data) => {
    const searchProduct = querySelector('.input-search');

    if (searchProduct) {
      searchProduct.addEventListener('input', (e) => {
        handleToggleLoading(TOGGLE_STATUS.isShown)
        this.value = e.target.value.toLowerCase();
        setTimeout(() => {
          const searchValue = data.filter(i => i.name.toLowerCase().includes(this.value))
          this.displayProduct(searchValue);
          handleToggleLoading(TOGGLE_STATUS.isHidden)
        }, 1000);
      });
    }
  };

  /**
   * @description handler sort product
   */
  handleSortProduct = (data) => {
    const sortSelect = querySelector('.sort-dropdown');

    if (sortSelect) {
      sortSelect.addEventListener('change', async (e) => {
        e.preventDefault();
        const target = e.target.value
        handleToggleLoading(TOGGLE_STATUS.isShown);

        setTimeout(() => {
          switch (target) {
            case 'name-asc':
              sortNameAsc(data);
              break;
            case 'name-dec':
              sortNameDec(data);
              break;
            case 'price-asc':
              sortPriceAsc(data);
              break;
            case 'price-dec':
              sortPriceDec(data);
              break;
            default:
              break;
          }
          this.displayProduct(data);
          handleToggleLoading(TOGGLE_STATUS.isHidden);
        }, 500);
      });
    }
  };

  bindButtonLogout = (handler) => {
    const btnAccount = querySelector('.nav-login');
    const isAuth = localStorage?.getItem('LOGIN');
    if (isAuth) {
      btnAccount.innerHTML = `<img class='btn-logout' src="/svgs/icon_logout.svg" alt="logout" />`;
    }

    const btnLogout = querySelector('.btn-logout');

    if (btnLogout) {
      btnLogout.addEventListener('click', handler);
    }
  };

  bindAddProduct = (handler) => {
    if (this.btnAdd) {
      this.btnAdd.addEventListener('click', (e) => {
        e.preventDefault();
        removeErrorMessage();
        this.handleAddProduct(handler);
      });
    }
  };

  bindDelProduct = (handler) => {
    this.handleDelProduct(handler);
  };

  bindDetailProduct = (handler) => {
    this.handleDetailProduct(handler);
  };

  bindSearchProduct = async (data) => {
    this.handleSearchProduct(data);
  };

  bindSortProduct = async (data) => {
    this.handleSortProduct(data);
  };

  /**
   * @description manage add event listener for page
   */
  bindManageEvent() {
    if (this.addProduct) {
      this.addProduct.addEventListener('click', () => {
        this.modalTitle.textContent = 'Create a new food';
        this.btnAdd.classList.remove('hidden');
        this.modalMain.classList.remove('hidden');
      });
    }

    if (this.confirmCancel) {
      this.confirmCancel.addEventListener('click', () => {
        this.modalDel.style.display = 'none';
        querySelector('.btn-yes').remove();
      });
    }

    if (this.btnClose) {
      this.btnClose.addEventListener('click', () => {
        this.modalForm.reset();
        clearError();
        this.modalMain.classList.add('hidden');
        const btnEdit = querySelector('.btn-edit-product');
        if (btnEdit) {
          btnEdit.remove();
        }
      });
    }
  }
}
