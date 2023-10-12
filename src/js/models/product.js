// service
import HttpsService from "../service/httpsService.js";

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
   * @param products Products[]
   */
  async getProduct(query) {
    return await this.productService.get(query)
  }

  /**
   * @description get id product from server
   * @return list product return after make a GET request to server
   * @param id id product
   */
  async getProductById(id) {
    return await this.productService.getById(id)
  }

  /**
   * @description create new product item and save response to mock api
   * return product item
   * @return product
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

  /**
   * @description Delete product by id
   * return data product remove
   * @param id
   */
  handleDelProduct = async (id) => {
    return await this.productService.delete(id);
  }

  /**
   * @description Edit product item by id and save response to json server
   * return product item
   */
  handleEditProduct = async (data, id) => {
    return await this.productService.put(data, id);
  }
}
