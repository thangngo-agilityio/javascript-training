export function getFormValues(form) {
  const formValues = {};
  const data = new FormData(form);

  for (const [key, value] of data) {
    formValues[key] = value.trim();
  }

  return formValues;
}
