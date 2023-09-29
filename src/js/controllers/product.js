import { PRODUCT_MESSAGE, VALIDATE_MESSAGE } from '../constants/message';
import { Popup } from '../helpers/renderPopup';

export default class ProductController {
  popup = new Popup();
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init = async () => {
    await this.showProduct(this.view.query);
    this.view.bindAddProduct(this.addProduct);
    this.view.bindDelProduct(this.delProduct);
  };
  showProduct = async (query) => {
    try {
      const data = await this.model.getProduct(query);

      this.view.displayProduct(data);
    } catch (error) {
      this.popup.error({ message: VALIDATE_MESSAGE.getFailed });
    }
  };
  addProduct = async (data) => {
    try {
      await this.model.handleAddProduct(data);
      this.popup.success({
        message: PRODUCT_MESSAGE.addSuccess,
      });
      await this.showProduct(this.view.query);
    } catch {
      this.popup.error({
        message: PRODUCT_MESSAGE.addFailed,
      });
    }
  };

  delProduct = async (id) => {
    try {
      await this.model.handleDelProduct(id);
      await this.showProduct(this.view.query);
      this.popup.success({ message: PRODUCT_MESSAGE.removeSuccess });
    } catch {
      this.popup.error({ message: PRODUCT_MESSAGE.removeFail });
    }
  };
}
