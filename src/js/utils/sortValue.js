export const sortNameAsc = (data) => {
  data.sort((item1, item2) => {
    if (item1.name > item2.name) return -1;
    if (item1.name < item2.name) return 1;
    return 0;
  })
}

export const sortNameDec = (data) => {
  data.sort((item1, item2) => {
    if (item2.name > item1.name) return -1;
    if (item2.name < item1.name) return 1;
    return 0;
  })
}

export const sortPriceAsc = (data) => {
  data.sort((item1, item2) => item1.price - item2.price);
}

export const sortPriceDec = (data) => {
  data.sort((item1, item2) => item2.price - item1.price)
}

