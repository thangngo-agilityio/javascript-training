import { PRODUCT_MESSAGE, VALIDATE_MESSAGE } from '../constants/message';
import { Popup } from '../helpers/renderPopup';
import { buildQuery } from '../utils/buildQuery';

export default class ProductController {
  popup = new Popup();
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

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
      console.log(query);
      const queryString = buildQuery(query)
      console.log(queryString);
      const data = await this.model.getProduct(queryString);

      this.view.displayProduct(data);
    } catch (error) {
      console.log(error);
      this.popup.error({
        message: VALIDATE_MESSAGE.getFailed,
      });
    }
  };

  addProduct = async (data) => {
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
  };

  delProduct = async (id) => {
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
  };

  detailProduct = async (id) => {
    try {
      const data = await this.model.getProductId(id);
      await this.view.renderProductDetail(data);
    } catch {
      this.popup.error({ message: VALIDATE_MESSAGE.getFailed });
    }
  };

  editProduct = async (data) => {
    try {
      console.log('data:', data.id);
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
  };
}
