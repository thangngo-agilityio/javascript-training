// Filter parameters and concatenate all queries to String
export const buildQuery = (params) => {
  const queryString = Object.keys(params || {})
    .filter((key) => !!params[key])
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&');

  return queryString;
};
