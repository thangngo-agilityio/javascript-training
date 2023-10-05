// constants
import {
  TOGGLE_STATUS,
  AUTHEN_MESSAGE
} from '../constants';
// helpers
import {
  redirect,
  Popup,
  handleToggleLoading
} from '../helpers';

/**
 * @class UserController
 * Link the user input and the view output for add edit delete data
 * @param userModel
 * @param userView
 */
export default class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.popup = new Popup();
    this.init();
  }

  init = async () => {
    this.view.displayLogin(this.signIn, this.signUp);
  };

  signIn = async (user) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN);
    const dataUser = await this.model.getAllUser();
    const foundUser = this.findUser(dataUser, user.email, user.password);

    if (foundUser) {
      localStorage.setItem('LOGIN', foundUser.id.toString());
      redirect('/');
      this.popup.success({
        message: AUTHEN_MESSAGE.loginSuccess
      });
    } else {
      this.popup.error({
        message: AUTHEN_MESSAGE.loginError
      });
    }
    handleToggleLoading(TOGGLE_STATUS.CLOSE);
  };

  signUp = async (user) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN);
    const dataUser = await this.model.getAllUser();

    const foundUser = this.findEmail(dataUser, user.email);

    if (foundUser) {
      this.popup.error({
        message: AUTHEN_MESSAGE.registerError
      });
    } else {
      const dataUserSignup = await this.model.handleSignUp(user);

      this.popup.success({
        message: AUTHEN_MESSAGE.registerSuccess
      });
      localStorage.setItem('LOGIN', dataUserSignup.id);
      setTimeout(() => {
        redirect('/login');
      }, 1000);
    }
    handleToggleLoading(TOGGLE_STATUS.CLOSE);
  };

  findUser = (dataUser, email, password) => {
    if (password) {
      return dataUser.find(
        (data) => data.email === email && data.password === password
      );
    } else {
      return dataUser.find((data) => data.email === email);
    }
  };
  findEmail = (dataUser, email) => {
    return dataUser.find((data) => data.email === email);
  };
}
