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
    const data = await this.model.getProduct('', queryString);
    console.log('controller:', data);
    this.view.bindSortProduct(data);
    this.view.displayProduct(data);
    handleToggleLoading(TOGGLE_STATUS.CLOSE)
  };

  addProduct = async (data) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN)
    const addData = await this.model.handleAddProduct(data);
    console.log(addData);
    this.view.displayProduct(addData)
    handleToggleLoading(TOGGLE_STATUS.CLOSE)
  };

  delProduct = async (id) => {
    const delData = await this.model.handleDelProduct(id);
    this.showProduct(delData)
  }

  detailProduct = async (id) => {
    const data = await this.model.getProductById(id);
    this.view.renderProductDetail(data);
  };

  editProduct = async (data) => {
    await this.model.handleEditProduct(data, data.id);
    this.showProduct()
  };
}
