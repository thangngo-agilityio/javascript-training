import {
  querySelector,
  getElementById
} from "../helpers/doms";
import { clearError, showError } from "../utils/validators/formError";
import { loginValidator } from "../utils/validators/validateLogin";

/**
 * @class UserView
 *
 * Manages view data user
 */
export default class LoginView {
  constructor() {
    this.loginForm = querySelector('.form-login');
    this.emailElement = getElementById('email');
    this.passwordElement = getElementById('password');
    this.confirmPasswordElement = getElementById('confirmPassword');
    this.inputGroupElement = querySelector('.input-group.hidden');
    this.btnLoginElement = querySelector('.header-action-signIn');
    this.btnRegisterElement = querySelector('.header-action-register');
    this.btnSubmitElement = querySelector("[type='submit']");
    this.signInEvent = null;
    this.signUpEvent = null;
  }

  /**
   * @description get value form sign in
   */
  formSignInEventHandler = async (e) => {
    e.preventDefault();

    const user = {
      email: this.emailElement.value.trim() || '',
      password: this.passwordElement.value.trim() || '',
    };
    const isError = loginValidator(user, 'SIGNIN');
    const isEmpty = (object) => {
      return Object.keys(object).length === 0;
    }

    if(!isEmpty(isError)) {
      showError(isError);
    } else {
      if (this.signInEvent) {
        clearError()
        await this.signInEvent(user)
      }
    }
  }

  /**
   * @description get value form sign up
   */
  formSignUpEventHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: this.emailElement.value.trim() || '',
      password: this.passwordElement.value.trim() || '',
      confirmPassword: this.confirmPasswordElement.value.trim() || '',
    }
    const isError = loginValidator(user, 'SIGNUP');
    const isEmpty = (object) => {
      return Object.keys(object).length === 0;
    }

    if(!isEmpty(isError)) {
      showError(isError);
    } else {
      if (this.signUpEvent) {
        clearError();
        await this.signUpEvent(user)
      }
    }



  };

  bindUserSignIn() {
    this.loginForm.removeEventListener('submit', this.formSignUpEventHandler);
    this.loginForm.addEventListener('submit', this.formSignInEventHandler);
  };

  bindUserSignUp() {
    this.loginForm.removeEventListener('submit', this.formSignInEventHandler);
    this.loginForm.addEventListener('submit', this.formSignUpEventHandler);
  };

  displayLogin(userSingIn, userSignUp) {
    this.signInEvent = userSingIn;
    this.signUpEvent = userSignUp;
    this.bindFormEvent();
  };


  bindFormEvent() {
    const toggleAction = () => {
      this.btnRegisterElement.classList.toggle('active');
      this.btnLoginElement.classList.toggle('active');
    }
    this.bindUserSignIn();

    this.btnLoginElement.addEventListener('click', e => {
      e.preventDefault();
      clearError();
      toggleAction();
      this.loginForm.reset();
      this.inputGroupElement.classList.toggle('hidden')

      // If submit button has element
      if(this.btnSubmitElement) {
        this.btnSubmitElement.innerHTML = 'Sign In';
      }

      this.bindUserSignIn();
    })
    this.btnRegisterElement.addEventListener('click', e => {
      e.preventDefault();
      clearError();
      toggleAction();
      this.loginForm.reset();
      this.inputGroupElement.classList.toggle('hidden')

      // If submit button has element
      if(this.btnSubmitElement) {
        this.btnSubmitElement.innerHTML = 'Sign Up';
      }

      this.bindUserSignUp();
    })
  };
}
