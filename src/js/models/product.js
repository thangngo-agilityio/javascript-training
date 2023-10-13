// service
import HttpsService from "../service/httpsService.js";

/**
 * @class UserModel
 * Manages the products data
 */
export default class ProductModel {
  constructor() {
    this.productService = new HttpsService('products')
    this.productList = []
  }

  /**
   * @description get all product from server
   * @return list product return after make a GET request to server
   * @param products Products[]
   */
  async getProduct(query) {
    const data = await this.productService.get(query)
    console.log('model', data);
    if (data) {
      for (const item of data) {
        const response = await this.getProductById(item.id);
        console.log(response);
        this.productList.push({
          ...response,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity
        })
      }
    }
    return this.productList;
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
    try {
      const addProduct = await this.productService.post(data)

      if (addProduct) {
        this.productList.push({
          name: addProduct.name,
          price: addProduct.price,
          image: addProduct.image,
          quantity: addProduct.quantity
        });
      }
    } catch (error) {
      Error(error)
    }

    return this.productList
  }

  /**
   * @description Delete product by id
   * return data product remove
   * @param id
   */
  handleDelProduct = async (id) => {
    const delProduct = await this.productService.delete(id);

    if (delProduct) {
      this.productList.filter(i => i.id !== id)
    }

    return this.productList
  }

  /**
   * @description Edit product item by id and save response to json server
   * return product item
   */
  handleEditProduct = async (data, id) => {
    return await this.productService.put(data, id);
  }
}
