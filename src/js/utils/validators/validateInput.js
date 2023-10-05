import {
  VALIDATE_MESSAGE
} from "../../constants/message"
import {
  A_CHARACTER_REGEX,
  CHARACTERS_REGEX,
  EMAIL_REGEX,
  IMAGE_REGEX,
  NAME_CHARACTERS_REGEX,
  PRICE_REGEX,
  QUANTITY_REGEX,
  SPECIAL_REGEX,
  UPPERCASE_REGEX
} from "../../constants/regex";

const validateRequired = (value = '', field) => {
  return value ? undefined : VALIDATE_MESSAGE.requiredError.replace('{field}', field);
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
    return VALIDATE_MESSAGE.notValidEmail;
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
    return VALIDATE_MESSAGE.charactersPassWordError;
  }

  if (!password.match(UPPERCASE_REGEX)) {
    return VALIDATE_MESSAGE.upperCasePassWordError;
  }

  if (!password.match(A_CHARACTER_REGEX)) {
    return VALIDATE_MESSAGE.ANumberCharacterPassWordError;
  }

  if (!password.match(SPECIAL_REGEX)) {
    return VALIDATE_MESSAGE.specialPassWordError;
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
    return VALIDATE_MESSAGE.confirmPasswordError;
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
    return VALIDATE_MESSAGE.nameValid;
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
    return VALIDATE_MESSAGE.priceValid;
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
    return VALIDATE_MESSAGE.imageValid;
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
    return VALIDATE_MESSAGE.quantityValid;
  }

  return;
}
