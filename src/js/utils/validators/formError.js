import {
  getElementById,
  querySelector,
  querySelectorAll
} from "../../helpers/doms.js"

/**
 * @description handle show error
 * @param error
 */
export const showError = (error) => {
  clearError();
  Object.entries(error).forEach(([key, value]) => {
    const target = getElementById(`${key}-error`);

    if (target) {
      target.innerHTML = value
    }
  })
}

/**
 * @description handle remove error
 * @param error
 */
export const clearError = () => {
  const errorField = querySelectorAll('.error-message');
  errorField.forEach((field) => {
    field.innerHTML = ''
  });
}

export const removeErrorMessage = () => {
  const formItems = querySelectorAll('.form-input');

  formItems.forEach((item) => {
    const getItemId = getElementById(item.name)
    getItemId.addEventListener('focus', () => {
      querySelector(`#${item.name}-error`).textContent = '';
    })
  })
};
