import {
  TOGGLE_STATUS
} from '../constants/common';
import {
  PRODUCT_MESSAGE,
  VALIDATE_MESSAGE
} from '../constants/message';
import {
  Popup
} from '../helpers/renderPopup';
import {
  handleToggleLoading
} from '../helpers/toggle';
import {
  buildQuery
} from '../utils/buildQuery';

/**
 * @class UserController
 * Link the user input and the view output for add edit delete data
 * @param model
 * @param view
 */
export default class ProductController {
  popup = new Popup();
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  /**
   * @description function init to
   */
  init = async () => {
    await this.showProduct();
    this.view.bindAddProduct(this.addProduct);
    this.view.bindDelProduct(this.delProduct);
    this.view.bindProductList(this.showProduct);
    this.view.bindDetailProduct(this.detailProduct);
    this.view.updateProduct = this.editProduct;
  };

  showProduct = async (query) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN)
    const queryString = buildQuery(query)
    const data = await this.model.getProduct(queryString);
    this.view.bindSortProduct(data);
    this.view.displayProduct(data);
    handleToggleLoading(TOGGLE_STATUS.CLOSE)
  };

  addProduct = async (data) => {
    await this.model.handleAddProduct(data);
    await this.showProduct();
  };

  delProduct = async (id) => {
    await this.model.handleDelProduct(id);
    await this.showProduct();
  }

  detailProduct = async (id) => {
    const data = await this.model.getProductById(id);
    this.view.renderProductDetail(data);
  };

  editProduct = async (data) => {
    await this.model.handleEditProduct(data, data.id);
    await this.showProduct();
  };
}
