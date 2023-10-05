import { getElementById, querySelectorAll } from "../../helpers/doms"

/**
 * @description handle show error
 * @param error
 */
export const showError = (error) => {
  clearError();
  Object.entries(error).forEach(([key, value]) => {
    const target = getElementById(`${key}-error`);

    if(target) {
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
  errorField.forEach((field) => {field.innerHTML = ''});
}
