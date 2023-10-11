import {
  validateConfirmPassword,
  validateEmail,
  validatePassword
} from "./validateInput"

/**
 * @description handle validate form sign in
 * @param user
 * @returns {FormError} errors object
 */
export const validateFormSignIn = (user) => {
  const error = {
    ...(validateEmail(user.email) && {
      email: validateEmail(user.email)
    }),
    ...(validatePassword(user.password) && {
      password: validatePassword(user.password),
    }),
  };

  return error;
}

/**
 * @description handle validate form sign up
 * @param user
 * @returns {FormError} errors object
 */
export const validateFormSignUp = (user) => {
  const error = {
    ...(validateEmail(user.email) && {
      email: validateEmail(user.email)
    }),
    ...(validatePassword(user.password) && {
      password: validatePassword(user.password),
    }),
    ...(validateConfirmPassword(user.password, user.confirmPassword) && {
      confirmPassword: validateConfirmPassword(user.password, user.confirmPassword),
    })
  };
  return error
}

export const loginValidator = (user, type) => {
  switch (type) {
    case 'SIGNUP':
      return validateFormSignUp(user);
    case 'SIGNIN':
      return validateFormSignIn(user);
    default:
      return {}
  }
}
