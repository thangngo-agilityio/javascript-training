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
    try {
      const data = await this.productService.get(query);
      if (data.length) {
        this.productList = data.map((item) => ({
          ...item
        }))
      }
      return this.productList.reverse();
    } catch (error) {
      return error;
    }
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
    try {
      const addProduct = await this.productService.post(data);

      if (addProduct) {
        this.productList.push({
          ...addProduct
        });
      }
      return this.productList;
    } catch (error) {
      return error;
    }
  };

  /**
   * @description Delete product by id
   * return data product remove
   * @param id
   */
  handleDelProduct = async (id) => {
    try {
      const delId = await this.productService.delete(id);

      if (delId) {
        this.productList.filter(i => i.id !== id)
      }
      return this.productList
    } catch (error) {
      return error;
    }
  };

  /**
   * @description Edit product item by id and save response to json server
   * return product item
   */
  handleEditProduct = async (data, id) => {
    try {
      const updateProduct = await this.productService.put(data, id);

      if (updateProduct) {
        this.productList = data.map(item => {
          item.id === id ? {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
          } : item
        })
      }
      return this.productList
    } catch (error) {
      return  error
    }
  };
}
