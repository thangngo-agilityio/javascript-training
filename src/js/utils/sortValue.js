export const sortNameAsc = (data) => {
  data.sort((string1, string2) => {
    if (string1.name > string2.name) return -1;
    if (string1.name < string2.name) return 1;
    return 0;
  })
}

export const sortNameDec = (data) => {
  data.sort((string1, string2) => {
    if (string2.name > string1.name) return -1;
    if (string2.name < string1.name) return 1;
    return 0;
  })
}

export const sortPriceAsc = (data) => {
  data.sort((price1, price2) => price1.price - price2.price);
}

export const sortPriceDec = (data) => {
  data.sort((price1, price2) => price2.price - price1.price)
}
