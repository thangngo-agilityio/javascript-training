/**
 * @description setup DOM and load controller
 * @param path string
 * @param callback function
 */

export const isRedirect = (path, replace) => {
  if (replace) {
    window.location.replace(path);
  }

  window.location.assign(path)
}
