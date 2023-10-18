export const AUTHEN_MESSAGE = {
  LOGIN_ERROR: 'Your Email or Password is incorrect, please try again',
  REGISTER_ERROR: 'Your email already in use, please try again',
  LOGIN_SUCCESS: 'Logged in successfully!',
  REGISTER_SUCCESS: 'Sign Up Success!',
};

export const VALIDATE_MESSAGE = {
  NOT_VALID_EMAIL: 'Email is not valid',
  REQUIRED_ERROR: '{field} is required',
  CHARACTERS_PASSWORD_ERROR: 'Please enter at least 8 characters for password',
  UPPERCASE_PASSWORD_ERROR: 'Please enter at least 1 uppercase letter',
  LOWERCASE_PASSWORD_ERROR: 'Please enter at least 1 lowercase letter',
  SPECIAL_PASSWORD_ERROR: 'Please enter at least 1 special letter',
  NUMBER_CHARACTER_PASSWORD_ERROR: 'Please enter at least 1 number character',
  CONFIRM_PASSWORD_ERROR: 'Password confirmation do not match password',
  NAME_VALID: 'Please enter at least 3 to 13 characters for name',
  PRICE_VALID: 'The food price cannot be empty and greater than 0',
  IMAGE_VALID: 'The food image URL cannot be empty and must be in the right format',
  QUANTITY_VALID: 'The food quantity cannot be empty and must be an integer that greater than 0',
  GET_FAILED: 'Get user failed',
};

export const PRODUCT_MESSAGE = {
  ADD_SUCCESS: 'Add product successfully!',
  ADD_FAILED: 'Add product fail!',
  REMOVE_SUCCESS: 'Remove successfully!',
  EDIT_SUCCESS: 'Edit successfully!',
  EDIT_FAILED: 'Edit failed, You need to change the value',
}
