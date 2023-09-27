import LoginController from '../controllers/login';
import LoginModel from '../models/login';
import LoginView from '../views/login';

export const appLogin = () => {
  new LoginController(new LoginModel(), new LoginView(LoginModel));
};


