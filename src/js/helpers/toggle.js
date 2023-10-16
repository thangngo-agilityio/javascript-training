import {
  TOGGLE_STYLE
} from "../constants/index.js";
import {
  querySelector
} from "./doms.js"

export const handleToggleLoading = (status) => {
  const toggle = querySelector('.toggle');

  if (toggle) {
    toggle.style.display = status ? TOGGLE_STYLE.SHOW : TOGGLE_STYLE.HIDE
  }
}
