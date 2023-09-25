import {
  MAX_POPUP, VERTICAL_OFFSET
} from "../constants";
import {
  createElement,
  querySelector
} from "./doms";

export class Popup {

  createPopup(type, title, message) {
    const mainElement = querySelector('.main-content');
    const popup = createElement('div');
    const currentPopupCount = 0;
    const maxPopupCount = MAX_POPUP;
    const verticalOffset = VERTICAL_OFFSET

    popup.classList.add('popup', `popup-${type}`, 'open');

    if (currentPopupCount >= maxPopupCount) {
      return;
    }

    this.currentPopupCount++;

    popup.innerHTML = `<div class="popup-body">
                        <h3 class="popup-title">${title}</h3>
                        <p class="popup-message">${message}</p>
                      </div>
                      <button class="popup-close">&times;</button>`;

    requestAnimationFrame(() => {
      const topPosition = currentPopupCount * (popup.offsetHeight + verticalOffset);

      popup.style.top = `${topPosition}px`;
    });

    // Auto remove popup after 5 seconds
    setTimeout(() => {
      popup.remove();
      currentPopupCount--;
    }, 5000);

    popup.onclick = (e) => {
      const target = e.target;

      if(target.closest('.popup-close')) {
        popup.remove();
        currentPopupCount--;
      }
    };

    // Add popupElement to mainElement
    mainElement.appendChild(popup);
  }

  success({message, title = 'success'}) {
    this.createPopup('success', title, message);
  }

  error({message, title = 'error'}) {
    this.createPopup('error', title, message);
  }
}
