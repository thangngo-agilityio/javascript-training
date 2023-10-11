import {
  TOGGLE_STYLE
} from "../constants";
import {
  querySelector
} from "./doms"

export const handleToggleLoading = (status) => {
  const toggle = querySelector('.toggle');

  toggle.style.display = status ? TOGGLE_STYLE.FLEX : TOGGLE_STYLE.NONE
}
