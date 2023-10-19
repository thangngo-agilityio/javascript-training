// service
import HttpsService from '../service/httpsService.js';

/**
 * @class UserModel
 * Manages the products data
 */
export default class ProductModel {
  constructor() {
    this.productService = new HttpsService('products');
    this.productList = [];
  }

  /**
   * @description get all product from server
   * @return list product return after make a GET request to server
   * @param products Products[]
   */
  async getProduct(query) {
    const data = await this.productService.get(query);
    if (data.length) {
      this.productList = data.map((item) => ({
        ...item
      }))
    }
    return this.productList.reverse();
  }

  /**
   * @description get id product from server
   * @return list product return after make a GET request to server
   * @param id id product
   */
  async getProductById(id) {
    return await this.productService.getById(id);
  }

  /**
   * @description create new product item and save response to mock api
   * return product item
   * @return product
   */
  handleAddProduct = async (data) => {
    const addProduct = await this.productService.post(data);

    if (addProduct) {
      this.productList.push({
        ...addProduct
      });
    }
    return this.productList;
  };

  /**
   * @description Delete product by id
   * return data product remove
   * @param id
   */
  handleDelProduct = async (id) => {
    const delProduct = await this.productService.delete(id);
    const getData = await this.getProduct()

    if (delProduct.id = id) {
      this.productList = getData
    }
    return this.productList
  };

  /**
   * @description Edit product item by id and save response to json server
   * return product item
   */
  handleEditProduct = async (data, id) => {
    const updateProduct = await this.productService.put(data, id);
    const getData = await this.productService.get(data)

    if (updateProduct) {
      this.productList = getData.map(item => {
        item.id === id ? {
          ...item
        } : item
      })
    }
    return this.productList
  };
}
