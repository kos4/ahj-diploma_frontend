export function debounce(func, ms) {
  let timeout;
  return function (number, id, onLoadMore) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

export function convertLink(text) {
  const regex = /(http[s]*:\/\/(\S+))/gm;
  const subst = `<a href="$1" target="_blank">$2</a>`;

  return text.replace(regex, subst);
}

export function dateFormat(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formDataToJson(data) {
  return JSON.stringify(Object.fromEntries(data.entries()));
}

export function ext(name) {
  return name.match(/\.([^.]+)$|$/)[1]
}