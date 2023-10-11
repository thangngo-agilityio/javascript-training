// helpers
import {
  createElement,
  querySelector,
  handleToggleLoading,
  querySelectorAll,
  Popup
} from '../helpers';
// Constants
import {
  PRODUCT_MESSAGE,
  TOGGLE_STATUS,
  VALIDATE_MESSAGE
} from '../constants';
// Templates
import {
  productTemplate
} from '../templates/productCard';
// utils
import {
  getFormValues,
  clearError,
  showError,
  validateForm,
  debounce,
  sortNameAsc,
  sortNameDec,
  sortPriceAsc,
  sortPriceDec,
  removeErrorMessage,
} from '../utils';
// images
import delIcon from '../../assets/icon/icon_del.svg';
import logoutIcon from '../../assets/icon/icon_logout.svg';

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
    this.modalDel = querySelector('.modal-del')
    this.btnAdd = querySelector('.btn-add-product');
    this.btnClose = querySelector('#close-btn');
    this.confirmCancel = querySelector('#btn-cancel')
    this.nameElement = querySelector('#name');
    this.priceElement = querySelector('#price');
    this.imageElement = querySelector('#image');
    this.quantityElement = querySelector('#quantity');
    this.inputAll = querySelectorAll('.form-input');
    this.isAuth = localStorage.getItem('LOGIN')
    this.query = {};
    this.popup = new Popup()
  }

  displayProduct(data) {
    if (this.listProduct.lastElementChild !== null) {
      while (this.listProduct.lastElementChild.id !== 'add-card') {
        this.listProduct.removeChild(this.listProduct.lastElementChild);
      }
    }

    if (data) {
      try {
        data.forEach((product) => {
          const divProduct = createElement('div');
          divProduct.setAttribute('class', 'product-card');
          divProduct.innerHTML = productTemplate(delIcon, product);

          this.listProduct.append(divProduct);
        });
      } catch (error) {
        this.popup.error({
          message: VALIDATE_MESSAGE.getFailed
        })
      }
    }
    this.bindButtonLogout()
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
    btnEdit.textContent = 'Save';

    formBtn.appendChild(btnEdit)

    this.nameElement.value = data.name || '';
    this.priceElement.value = data.price || '';
    this.imageElement.value = data.image || '';
    this.quantityElement.value = data.quantity || '';


    btnEdit.addEventListener('click', () => {
      removeErrorMessage()
      this.handlerUpdateProduct(data.id);
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
        message: PRODUCT_MESSAGE.addFailed,
      });
    } else {
      await handler(formValues);
      this.modalForm.reset();
      this.btnAdd.classList.add('hidden');
      this.modalMain.classList.add('hidden');
      this.popup.success({
        message: PRODUCT_MESSAGE.addSuccess
      })
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
        const productId = btnDel.dataset.id
        this.modalDel.style.display = 'flex';
        const confirmBtn = querySelector('.confirm-btn')
        const confirmYes = createElement('button')
        confirmYes.setAttribute('class', 'btn btn-yes')
        confirmYes.textContent = 'Yes'
        confirmBtn.appendChild(confirmYes)

        confirmYes.addEventListener('click', () => {
          if (confirmYes) {
            handler(productId);
            this.modalDel.style.display = 'none'
            confirmYes.remove()
            this.popup.success({
              message: PRODUCT_MESSAGE.removeSuccess,
            });
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
        await handler(idProduct);
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
      this.modalMain.classList.add('hidden');
      this.popup.success({
        message: PRODUCT_MESSAGE.editSuccess,
      });
    }
  };

  /**
   * @description handler search product
   */
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

  bindButtonLogout = (handler) => {
    const btnAccount = querySelector('.nav-login');
    if (this.isAuth) {
      btnAccount.innerHTML = `<img class='btn-logout' src="${logoutIcon}" alt="logout" />`
    }
    const btnLogout = querySelector('.btn-logout');

    if (btnLogout) {
      btnLogout.addEventListener('click', handler)
    }
  }

  bindAddProduct = (handler) => {
    this.btnAdd.addEventListener('click', (e) => {
      e.preventDefault();
      removeErrorMessage()
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

    this.confirmCancel.addEventListener('click', () => {
      this.modalDel.style.display = 'none'
      querySelector('.btn-yes').remove()
    })

    this.btnClose.addEventListener('click', () => {
      this.modalForm.reset();
      clearError();
      this.modalMain.classList.add('hidden');
      querySelector('.btn-edit-product').remove()
    });
  }
}
