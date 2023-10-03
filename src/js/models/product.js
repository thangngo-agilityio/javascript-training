import HttpsService from "../service/httpsService";

/**
 * @class UserModel
 * Manages the products data
 */
export default class ProductModel {
  constructor() {
    this.productService = new HttpsService('products')
  }

  /**
   * @description get all product from server
   * @return list product return after make a GET request to server
   */
  async getProduct(query) {
    return await this.productService.get(query)
  }

  /**
   * @description get id product from server
   * @return list product return after make a GET request to server
   */

  async getProductId(id) {
    return await this.productService.getById(id)
  }

  /**
   * @description create new product item and save response to mock api return product item
   */
  handleAddProduct = async (data) => {
    const newProduct = {
      name: data.name,
      price: Number(data.price),
      image: data.image,
      quantity: Number(data.quantity),
    };

    return await this.productService.post(newProduct)
  }

  handleDelProduct = async (id) => {
    return await this.productService.delete(id);
  }

  handleEditProduct = async (data, id) => {
    return await this.productService.put(data, id)
  }
}
