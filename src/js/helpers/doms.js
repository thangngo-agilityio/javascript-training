/**
 * @description query html element
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export const querySelector = (selector) => {
  return document?.querySelector(selector);
};

/**
 * @description query all html elements
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns list html elements
 */
export const querySelectorAll = (selector) => {
  return document?.querySelectorAll(selector);
};

/**
 * @description query html element by id
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export function getElementById(selector) {
  return document?.getElementById(selector);
}

/**
 * @description create html elements
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns create elements
 */
export const createElement = (element) => {
  return document?.createElement(element);
};
