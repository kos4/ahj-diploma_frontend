const host = "https://ahj-diploma-backend-7xgh.onrender.com/";
export async function createRequest(options) {
  const response = await fetch(host + options.input, options.init);
  options.callback(await response.json());
}
