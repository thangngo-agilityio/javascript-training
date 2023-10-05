import { TOGGLE_STATUS } from '../constants/common';
import {
  PRODUCT_MESSAGE,
  VALIDATE_MESSAGE
} from '../constants/message';
import {
  Popup
} from '../helpers/renderPopup';
import { handleToggleLoading } from '../helpers/toggle';
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
    try {
      const queryString = buildQuery(query)
      const data = await this.model.getProduct(queryString);

      this.view.bindSortProduct(data);
      this.view.displayProduct(data);
    } catch (error) {
      this.popup.error({
        message: VALIDATE_MESSAGE.getFailed,
      });
    }
  };

  addProduct = async (data) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN)
    try {
      await this.model.handleAddProduct(data);
      this.popup.success({
        message: PRODUCT_MESSAGE.addSuccess,
      });
      await this.showProduct();
    } catch {
      this.popup.error({
        message: PRODUCT_MESSAGE.addFailed,
      });
    }
    handleToggleLoading(TOGGLE_STATUS.CLOSE)
  };

  delProduct = async (id) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN)
    try {
      await this.model.handleDelProduct(id);
      await this.showProduct();
      this.popup.success({
        message: PRODUCT_MESSAGE.removeSuccess,
      });
    } catch {
      this.popup.error({
        message: PRODUCT_MESSAGE.removeFail,
      });
    }
    handleToggleLoading(TOGGLE_STATUS.CLOSE)
  };

  detailProduct = async (id) => {
    try {
      const data = await this.model.getProductId(id);
      this.view.renderProductDetail(data);
    } catch {
      this.popup.error({
        message: VALIDATE_MESSAGE.getFailed
      });
    }
  };

  editProduct = async (data) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN)
    try {
      await this.model.handleEditProduct(data, data.id);
      await this.showProduct();
      this.popup.success({
        message: PRODUCT_MESSAGE.editSuccess,
      });
    } catch {
      this.popup.error({
        message: PRODUCT_MESSAGE.editFail,
      });
    }
    handleToggleLoading(TOGGLE_STATUS.CLOSE)
  };
}
