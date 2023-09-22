import {
  querySelector,
  querySelectorAll
} from "../helpers/doms";

/**
 * @class UserView
 *
 * Manages view data user
 */
export default class LoginView {
  constructor() {
    this.loginForm = querySelector('.form-login');
    this.createAccountForm = querySelector('#createAccount');
  }

  displayLogin() {

    this.bindFormEvent();
  }

  setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector('.form-message');

    messageElement.textContent = message;
    messageElement.classList.remove("form-message_success", "form-message_error");
    messageElement.classList.add(`form-message_${type}`);
  }

  setInputError(inputElement, message) {
    inputElement.classList.add("form-input_error")
    inputElement.parentElement.querySelector(".input-error_message").textContent = message;
  }

  clearInputError(inputElement) {
    inputElement.classList.remove("form-input_error");
    inputElement.parentElement.querySelector(".input-error_message").textContent = "";
  }

  bindFormEvent() {
    document.addEventListener("DOMContentLoaded", () => {
      querySelector("#linkCreateAccount").addEventListener('click', (e) => {
        e.preventDefault()
        this.loginForm.classList.add("form-hidden");
        this.createAccountForm.classList.remove("form-hidden");
      })

      querySelector("#linkLogin").addEventListener('click', (e) => {
        e.preventDefault()
        this.loginForm.classList.remove("form-hidden");
        this.createAccountForm.classList.add("form-hidden");
      })
    })

    this.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform your Fetch login
        this.setFormMessage(this.loginForm, "error", "Invalid username/password combination");
      })

    document.querySelectorAll('.form-input').forEach(inputElement => {
      inputElement.addEventListener('blur', e => {
        if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
          this.setInputError(inputElement, "Username must be at least 10 characters in length");
        }
      })
      inputElement.addEventListener('click', e => {
        this.clearInputError(inputElement)
      })
    })
  }
}
