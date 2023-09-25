import {
  VALIDATE_MESSAGE
} from "../../constants/message"
import {
  A_CHARACTER_REGEX,
  CHARACTERS_REGEX,
  EMAIL_REGEX,
  UPPERCASE_REGEX
} from "../../constants/regex";

const validateRequired = (value = '', field) => {
  return value ? undefined : VALIDATE_MESSAGE.requiredError.replace('{field}', field);
};

export const validateEmail = (email = '') => {
  if (!email) {
    return validateRequired(email, 'Email');
  }

  if (!email.match(EMAIL_REGEX)) {
    return VALIDATE_MESSAGE.notValidEmail;
  }

  return;
};

export const validatePassword = (password = '') => {
  if (!password) {
    return validateRequired(password, 'Password')
  }

  if (!password.match(CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.charactersPassWordError;
  }

  if (!password.match(UPPERCASE_REGEX)) {
    return VALIDATE_MESSAGE.upperCasePassWordError;
  }

  if (!password.match(A_CHARACTER_REGEX)) {
    return VALIDATE_MESSAGE.ANumberCharacterPassWordError;
  }

  return
}

export const validateConfirmPassword = (password = '', passwordConfirm = '') => {
  if (!passwordConfirm) {
    return validateRequired(passwordConfirm, 'Password confirmation');
  }

  if (passwordConfirm !== password) {
    return VALIDATE_MESSAGE.confirmPasswordError;
  }

  return;
}
