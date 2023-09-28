import {
  MAX_POPUP,
  VERTICAL_OFFSET
} from "../constants";
import {
  createElement,
  querySelector
} from "./doms";

export class Popup {
  currentPopupCount = 0;
  maxPopupCount = MAX_POPUP;
  verticalOffset = VERTICAL_OFFSET

  createPopup(type, title, message) {
    const mainElement = querySelector('.main-content');
    const popup = createElement('div');


    popup.classList.add('popup', `popup-${type}`, 'open');

    if (this.currentPopupCount >= this.maxPopupCount) {
      return;
    }

    this.currentPopupCount++;

    popup.innerHTML = `<div class="popup-body">
                        <p class="popup-message">${message}</p>
                      </div>`;

    requestAnimationFrame(() => {
      const topPosition = this.currentPopupCount * (popup.offsetHeight + this.verticalOffset);

      popup.style.top = `${topPosition}px`;
    });

    // Auto remove popup after 5 seconds
    setTimeout(() => {
      popup.remove();
      this.currentPopupCount--;
    }, 5000);

    popup.onclick = (e) => {
      const target = e.target;

      if (target.closest('.popup-close')) {
        popup.remove();
        this.currentPopupCount--;
      }
    };

    // Add popupElement to mainElement
    mainElement.appendChild(popup);
  }

  success({
    message,
    title = 'success'
  }) {
    this.createPopup('success', title, message);
  }

  error({
    message,
    title = 'error'
  }) {
    this.createPopup('error', title, message);
  }
}
