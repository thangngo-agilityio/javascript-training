import {
  MAX_POPUP,
  VERTICAL_OFFSET
} from "../constants/index.js";
import {
  createElement,
  querySelector
} from "./doms.js";

export class Popup {
  currentPopupCount = 0;
  maxPopupCount = MAX_POPUP;
  verticalOffset = VERTICAL_OFFSET

  createPopup(type, message) {
    const mainElement = querySelector('.main-content');
    const popup = createElement('div');

    if (popup) {
      popup.classList.add('popup', `popup-${type}`, 'open');

      this.currentPopupCount++;

      popup.innerHTML = `<div class="popup-body">
                        <p class="popup-message">${message}</p>
                      </div>`;

      popup.onclick = (e) => {
        const target = e.target;

        if (target.closest('.popup-close')) {
          popup.remove();
          this.currentPopupCount--;
        }
      };

      if (this.currentPopupCount >= this.maxPopupCount) {
        return;
      }

      // Auto remove popup after 1 seconds
      setTimeout(() => {
        popup.remove();
        this.currentPopupCount--;
      }, 1500);

      // Add popupElement to mainElement
      mainElement.appendChild(popup);
    }
  }

  success({
    message,
  }) {
    this.createPopup('success', message);
  }

  error({
    message,
  }) {
    this.createPopup('error', message);
  }
}
