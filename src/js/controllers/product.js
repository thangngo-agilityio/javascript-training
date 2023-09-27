export default class ProductController {
  constructor(model, view) {
    this.model = model;
    this.view = view
    this.init();
  }

  init = async () => {
    this.view.displayProduct();
  }

}
