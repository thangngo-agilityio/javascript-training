import {
  A_CHARACTER_REGEX,
  CHARACTERS_REGEX,
  EMAIL_REGEX,
  IMAGE_REGEX,
  NAME_CHARACTERS_REGEX,
  PRICE_REGEX,
  QUANTITY_REGEX,
  SPECIAL_REGEX,
  UPPERCASE_REGEX,
  VALIDATE_MESSAGE
} from "../../constants/index.js";

const validateRequired = (value = '', field) => {
  return value ? undefined : VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', field);
};

/**
 * @description handle validate email
 * @param email
 */
export const validateEmail = (email = '') => {
  if (!email) {
    return validateRequired(email, 'Email');
  }

  if (!email.match(EMAIL_REGEX)) {
    return VALIDATE_MESSAGE.NOT_VALID_EMAIL;
  }

  return;
};

/**
 * @description handle validate password
 * @param password
 */
export const validatePassword = (password = '') => {
  if (!password) {
    return validateRequired(password, 'Password')
  }

  if (!password.match(CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.CHARACTERS_PASSWORD_ERROR;
  }

  if (!password.match(UPPERCASE_REGEX)) {
    return VALIDATE_MESSAGE.UPPERCASE_PASSWORD_ERROR;
  }

  if (!password.match(A_CHARACTER_REGEX)) {
    return VALIDATE_MESSAGE.NUMBER_CHARACTER_PASSWORD_ERROR;
  }

  if (!password.match(SPECIAL_REGEX)) {
    return VALIDATE_MESSAGE.SPECIAL_PASSWORD_ERROR;
  }

  return
}

/**
 * @description handle validate password
 * @param password
 */
export const validateConfirmPassword = (password = '', passwordConfirm = '') => {
  if (!passwordConfirm) {
    return validateRequired(passwordConfirm, 'Password confirmation');
  }

  if (passwordConfirm !== password) {
    return VALIDATE_MESSAGE.CONFIRM_PASSWORD_ERROR;
  }

  return;
}

/**
 * @description handle validate name
 * @param name
 */
export const validateName = (name = '') => {
  if (!name) {
    return validateRequired(name, 'Name');
  }

  if (!name.match(NAME_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.NAME_VALID;
  }

  return;
}

/**
 * @description handle validate price
 * @param price
 */
export const validatePrice = (price = '') => {
  if (!price) {
    return validateRequired(price, 'Price');
  }

  if (!price.match(PRICE_REGEX)) {
    return VALIDATE_MESSAGE.PRICE_VALID;
  }

  return;
}

/**
 * @description handle validate image
 * @param image
 */
export const validateImage = (image = '') => {
  if (!image) {
    return validateRequired(image, 'Image');
  }

  if (!image.match(IMAGE_REGEX)) {
    return VALIDATE_MESSAGE.IMAGE_VALID;
  }

  return;
}

/**
 * @description handle validate quantity
 * @param quantity
 */
export const validateQuantity = (quantity = '') => {
  if (!quantity) {
    return validateRequired(quantity, 'Quantity');
  }

  if (!quantity.match(QUANTITY_REGEX)) {
    return VALIDATE_MESSAGE.QUANTITY_VALID;
  }

  return;
}
