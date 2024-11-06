const host = 'http://localhost:8082/';
export async function createRequest(options) {
  const response = await fetch(host + options.input, options.init);
  options.callback(await response.json());
}