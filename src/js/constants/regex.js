export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const CHARACTERS_REGEX = /^(?=.*\d)[0-9a-zA-Z]{8,}$/;
export const UPPERCASE_REGEX = /^(?=.*[A-Z]).*$/;
export const LOWERCASE_REGEX = /^(?=.*[a-z]).*$/;
export const A_CHARACTER_REGEX = /^(?=.*\d).*$/;
export const NAME_CHARACTERS_REGEX = /^[a-z ,.'-]+$/i;
export const PRICE_REGEX = /^[1-9][0-9]*$/;
export const IMAGE_REGEX = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
export const QUANTITY_REGEX = /^[1-9][0-9]*$/;
