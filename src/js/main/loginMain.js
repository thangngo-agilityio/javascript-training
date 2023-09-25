import LoginController from '../controllers/login';
import LoginModel from '../models/login';
import LoginView from '../views/login';

const app = () => {
  new LoginController(new LoginModel(), new LoginView(LoginModel));
};

app();
