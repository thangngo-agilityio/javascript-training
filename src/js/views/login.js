// constants
import {
  AUTHEN_MESSAGE
} from "../constants/index.js";
import {
  isEmpty
} from "../helpers/empty.js";
// helpers
import {
  querySelector,
  getElementById,
  Popup
} from "../helpers/index.js";
// utils
import {
  clearError,
  showError,
  loginValidator,
  removeErrorMessage
} from "../utils/index.js";

/**
 * @class LoginView
 *
 * Manages view data user
 */
export default class LoginView {
  constructor() {
    this.loginForm = querySelector('#form-login');
    this.emailElement = getElementById('email');
    this.passwordElement = getElementById('password');
    this.confirmPasswordElement = getElementById('confirmPassword');
    this.inputGroupElement = querySelector('.input-group.hidden');
    this.btnLoginElement = querySelector('.header-action-signIn');
    this.btnRegisterElement = querySelector('.header-action-register');
    this.btnSubmitElement = querySelector("[type='submit']");
    this.signInEvent = null;
    this.signUpEvent = null;
    this.popup = new Popup();
  }

  /**
   * @description get value form sign in
   */
  formSignInEventHandler = async (e) => {
    e.preventDefault();
    removeErrorMessage();


    const user = {
      email: this.emailElement.value.trim() && this.emailElement.value.toLowerCase() || '',
      password: this.passwordElement.value.trim() || '',
    };
    const isError = loginValidator(user, 'SIGNIN');

    if (!isEmpty(isError)) {
      showError(isError);
      this.popup.error({
        message: AUTHEN_MESSAGE.LOGIN_ERROR
      })
    } else {
      if (this.signInEvent) {
        clearError()
        await this.signInEvent(user)
        this.popup.success({
          message: AUTHEN_MESSAGE.LOGIN_SUCCESS
        })
      }
    }
  }

  /**
   * @description get value form sign up
   */
  formSignUpEventHandler = async (e) => {
    e.preventDefault();
    removeErrorMessage();
    const user = {
      email: this.emailElement.value.trim() && this.emailElement.value.toLowerCase() || '',
      password: this.passwordElement.value.trim() || '',
      confirmPassword: this.confirmPasswordElement.value.trim() || '',
    }
    const isError = loginValidator(user, 'SIGNUP');


    if (!isEmpty(isError)) {
      showError(isError);
    } else {
      if (this.signUpEvent) {
        clearError();
        await this.signUpEvent(user)
      }
    }
  };

  popupSignupSuccess = () => {
    this.popup.success({
      message: AUTHEN_MESSAGE.REGISTER_SUCCESS
    });
  }
  popupSignupError = (user) => {
    if (user) {
      this.popup.error({
        message: AUTHEN_MESSAGE.REGISTER_ERROR
      });
    }
  }

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
    this.bindUserSignIn();

    this.btnLoginElement.addEventListener('click', e => {
      e.preventDefault();
      clearError();
      this.btnLoginElement.classList.add('active');
      this.btnRegisterElement.classList.remove('active');
      this.loginForm.reset();
      this.inputGroupElement.classList.add('hidden')

      // If submit button has element
      if (this.btnSubmitElement) {
        this.btnSubmitElement.innerHTML = 'Sign In';
      }

      this.bindUserSignIn();
    })
    this.btnRegisterElement.addEventListener('click', e => {
      e.preventDefault();
      clearError();
      this.btnRegisterElement.classList.add('active');
      this.btnLoginElement.classList.remove('active');
      this.loginForm.reset();
      this.inputGroupElement.classList.remove('hidden')

      // If submit button has element
      if (this.btnSubmitElement) {
        this.btnSubmitElement.innerHTML = 'Sign Up';
      }

      this.bindUserSignUp();
    })
  };
}
