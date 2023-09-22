/**
 * @class UserController
 * Link the user input and the view output for add edit delete data
 * @param userModel
 * @param userView
 */
export default class LoginController {
  constructor(loginModel, loginView) {
    this.model = loginModel;
    this.view = loginView;

    this.init();
  }

  init = async () => {
    this.view.displayLogin()
  }
}
