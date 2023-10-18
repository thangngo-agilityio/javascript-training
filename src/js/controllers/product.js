// constants
import {
  TOGGLE_STATUS
} from '../constants/index.js';
// helpers
import {
  handleToggleLoading
} from '../helpers/index.js';
// utils
import {
  buildQuery
} from '../utils/index.js';

/**
 * @class UserController
 * Link the user input and the view output for add edit delete data
 * @param model
 * @param view
 */
export default class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  /**
   * @description function init to
   */
  init = async () => {
    await this.showProduct(this.view.query);
    this.view.bindAddProduct(this.addProduct);
    this.view.bindDelProduct(this.delProduct);
    this.view.bindDetailProduct(this.detailProduct);

    this.view.updateProduct = this.editProduct;
  };

  showProduct = async (query) => {
    handleToggleLoading(TOGGLE_STATUS.isShown);
    const data = await this.model.getProduct(query);
    this.view.bindButtonLogout();
    this.view.bindManageEvent();
    this.view.bindSortProduct(data);
    this.view.bindSearchProduct(data)
    this.view.displayProduct(data);
    handleToggleLoading(TOGGLE_STATUS.isHidden);
  };

  addProduct = async (data) => {
    handleToggleLoading(TOGGLE_STATUS.isShown);
    const addData = await this.model.handleAddProduct(data);
    this.showProduct(addData);
    handleToggleLoading(TOGGLE_STATUS.isHidden);
  };

  delProduct = async (id) => {
    const delProduct = await this.model.handleDelProduct(id);
    this.showProduct(delProduct);
  }

  detailProduct = async (id) => {
    const data = await this.model.getProductById(id);
    this.view.renderProductDetail(data);
  };

  editProduct = async (data) => {
    const editProduct = await this.model.handleEditProduct(data, data.id);
    this.showProduct(editProduct);
  };
}
