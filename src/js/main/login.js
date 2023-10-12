import LoginController from '../controllers/login.js';
import LoginModel from '../models/login.js';
import LoginView from '../views/login.js';

const appLogin = () => {
  new LoginController(new LoginModel(), new LoginView(LoginModel));
};

appLogin()
