import ProductController from "../controllers/product.js"
import ProductModel from "../models/product.js"
import ProductView from "../views/product.js"

const appProduct = () => {
  new ProductController(new ProductModel(), new ProductView)
}

appProduct();
