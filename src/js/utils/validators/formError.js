import { getElementById, querySelectorAll } from "../../helpers/doms"

export const showError = (error) => {
  clearError();
  Object.entries(error).forEach(([key, value]) => {
    const target = getElementById(`${key}-error`);

    if(target) {
      target.innerHTML = value
    }
  })
}

export const clearError = () => {
  const errorField = querySelectorAll('.error-message');
  errorField.forEach((field) => {field.innerHTML = ''});
}
