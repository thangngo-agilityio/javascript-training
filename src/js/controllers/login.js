import {
  redirect
} from "../helpers/redirect";

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
    this.view.displayLogin(this.signIn, this.signUp);
  }

  signIn = async (user) => {
    const dataUser = await this.model.getAllUser();
    const foundUser = this.findUser(dataUser, user.email, user.password);

    if (foundUser) {
      localStorage.setItem('LOGIN', foundUser.id.toString());
    }
  }

  signUp = async (user) => {
    const dataUser = await this.model.getAllUser();
    const foundUser = this.findEmail(dataUser, user.email);

    if (foundUser) {
      alert(foundUser, 'Account already!!!')
    } else {
      const dataUserSignup = await this.model.handleSignUp(user);

      localStorage.setItem('LOGIN', dataUserSignup.id)
      redirect('/src/pages/index.html')
      alert('Register success!!')
    }
  }

  findUser = (dataUser, email, password) => {
    if (password) {
      return dataUser.find(data => data.email === email && data.password === password);
    } else {
      return dataUser.find(data => data.email === email)
    }
  }
  findEmail = (dataUser, email) => {
    return dataUser.find(data => data.email === email)
  }
}
