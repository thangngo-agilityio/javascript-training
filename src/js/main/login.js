import LoginController from '../controllers/login';
import LoginModel from '../models/login';
import LoginView from '../views/login';

const appLogin = () => {
  new LoginController(new LoginModel(), new LoginView(LoginModel));
};

appLogin()
