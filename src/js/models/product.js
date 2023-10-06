// constants
import {
  PRODUCT_MESSAGE,
  VALIDATE_MESSAGE
} from "../constants";
// helpers
import {
  Popup
} from "../helpers";
// service
import HttpsService from "../service/httpsService";

/**
 * @class UserModel
 * Manages the products data
 */
export default class ProductModel {
  constructor() {
    this.productService = new HttpsService('products')
    this.popup = new Popup()
  }

  /**
   * @description get all product from server
   * @return list product return after make a GET request to server
   */
  async getProduct(query) {
    try {
      return await this.productService.get(query)
    } catch (error) {
      this.popup.error({
        message: VALIDATE_MESSAGE.getFailed,
      });
    }
  }

  /**
   * @description get id product from server
   * @return list product return after make a GET request to server
   */

  async getProductById(id) {
    try {
      return await this.productService.getById(id)
    } catch {
      this.popup.error({
        message: VALIDATE_MESSAGE.getFailed
      });
    }
  }

  /**
   * @description create new product item and save response to mock api return product item
   */
  handleAddProduct = async (data) => {
    try {
      const newProduct = {
        name: data.name,
        price: Number(data.price),
        image: data.image,
        quantity: Number(data.quantity),
      };

      this.popup.success({
        message: PRODUCT_MESSAGE.addSuccess,
      });

      return await this.productService.post(newProduct)
    } catch {
      this.popup.error({
        message: PRODUCT_MESSAGE.addFailed,
      });
    }
  }

  handleDelProduct = async (id) => {
    try {
      await this.productService.delete(id);
      this.popup.success({
        message: PRODUCT_MESSAGE.removeSuccess,
      });
    } catch {
      this.popup.error({
        message: PRODUCT_MESSAGE.removeFail,
      });
    }
  }

  handleEditProduct = async (data, id) => {
    try {
      await this.productService.put(data, id);
      this.popup.success({
        message: PRODUCT_MESSAGE.editSuccess,
      });
    } catch {
      this.popup.error({
        message: PRODUCT_MESSAGE.editFail,
      });
    }
  }
}
