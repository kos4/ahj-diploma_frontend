export function debounce(func, ms) {
  let timeout;
  return function (number, id, onLoadMore) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}