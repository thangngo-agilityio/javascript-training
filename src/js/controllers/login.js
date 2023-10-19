// constants
import { TOGGLE_STATUS } from '../constants/index.js';
// helpers
import { isRedirect, handleToggleLoading } from '../helpers/index.js';

/**
 * @class UserController
 * Link the user input and the view output for add edit delete data
 * @param model
 * @param view
 */
export default class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init = async () => {
    this.view.displayLogin(this.signIn, this.signUp);
  };

  signIn = async (user) => {
    handleToggleLoading(TOGGLE_STATUS.isShown);
    const dataUser = await this.model.getAllUser();
    const foundUser = this.findUser(dataUser, user.email, user.password);
    localStorage.setItem('LOGIN', foundUser.id.toString());
    isRedirect('/');
    handleToggleLoading(TOGGLE_STATUS.isHidden);
  };

  signUp = async (user) => {
    const dataUser = await this.model.getAllUser();
    const foundUser = this.findUser(dataUser, user.email);

    if (foundUser) {
      this.view.popupSignupError(foundUser);
    } else {
      handleToggleLoading(TOGGLE_STATUS.isShown);
      const dataUserSignup = await this.model.handleSignUp(user);
      this.view.popupSignupSuccess();
      localStorage.setItem('LOGIN', dataUserSignup.id);
      setTimeout(() => {
        isRedirect('/authen.html');
      }, 1000);
      handleToggleLoading(TOGGLE_STATUS.isHidden);
    }
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
}
