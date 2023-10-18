const sortAsc = (key) => {
  return (a, b) => (a[key] > b[key]) ? 1 : (b[key] > a[key]) ? -1 : 0
}
const sortDesc = (key) => {
  return (a, b) => (a[key] < b[key]) ? 1 : (b[key] < a[key]) ? -1 : 0
}

export const sortNameAsc = (data) => {
  data.sort(sortAsc('name'))
}

export const sortNameDec = (data) => {
  data.sort(sortDesc('name'))
}

export const sortPriceAsc = (data) => {
  data.sort(sortAsc('price'))
}

export const sortPriceDec = (data) => {
  data.sort(sortDesc('price'))
}
