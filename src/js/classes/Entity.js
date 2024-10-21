export default class Entity {
  constructor() {
    this.host = 'http://localhost:8082/';
  }

  loginUser(form, callback) {
    this.createRequest({
      input: 'login',
      init: {
        method: 'POST',
        body: this.formDataToJson(new FormData(form)),
      },
      callback
    });
  }

  loadMore(count, userId, callback) {
    this.createRequest({
      input: 'loadMore',
      init: {
        method: 'POST',
        body: JSON.stringify({count, userId}),
      },
      callback
    });
  }

  async createRequest(options) {
    const response = await fetch(this.host + options.input, options.init);
    options.callback(await response.json());
  }

  formDataToJson(data) {
    return JSON.stringify(Object.fromEntries(data.entries()));
  }
}