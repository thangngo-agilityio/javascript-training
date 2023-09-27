export default class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view
    this.init();
  }

  init = async () => {
    const getProduct = await this.model.getProduct()
    await this.view.displayProduct(getProduct);

  }

}
