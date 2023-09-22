/**
 * @description query html element
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export const querySelector = (selector, parent = document) => {
  return parent.querySelector(selector);
};

/**
 * @description query all html elements
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns list html elements
 */
export const querySelectorAll = (selector, parent = document) => {
  return parent.querySelectorAll(selector);
};

/**
 * @description query html element by id
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export function getElementById(selector, parent = document) {
  return parent.getElementById(selector);
}

/**
 * @description create html elements
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns create elements
 */
export const createElement = (element, parent = document) => {
  return parent.createElement(element);
};
