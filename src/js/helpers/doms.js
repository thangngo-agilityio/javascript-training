/**
 * @description query html element
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export const querySelector = (selector) => {
  if (typeof document !== 'undefined') {
    return document.querySelector(selector);
  }
};

/**
 * @description query all html elements
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns list html elements
 */
export const querySelectorAll = (selector) => {
  if (typeof document !== 'undefined') {
    return document.querySelectorAll(selector);
  }
};

/**
 * @description query html element by id
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export function getElementById(selector) {
  if (typeof document !== 'undefined') {
    return document.getElementById(selector);
  }
}

/**
 * @description create html elements
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns create elements
 */
export const createElement = (element) => {
  if (typeof document !== 'undefined') {
    return document.createElement(element);
  }
};
