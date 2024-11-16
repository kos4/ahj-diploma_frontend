import {formDataToJson} from "../functions";
import {createRequest} from "../createRequest";

export default class Entity {

  loadSchedule(userId, callback) {
    createRequest({
      input: 'loadSchedule',
      init: {
        method: 'POST',
        body: JSON.stringify({userId}),
      },
      callback
    });
  }

  loginUser(form, callback) {
    createRequest({
      input: 'login',
      init: {
        method: 'POST',
        body: formDataToJson(new FormData(form)),
      },
      callback
    });
  }

  loadMore(count, userId, callback) {
    createRequest({
      input: 'loadMore',
      init: {
        method: 'POST',
        body: JSON.stringify({count, userId}),
      },
      callback
    });
  }

  sendFiles(formData, userId, callback) {
    formData.append('userId', userId);
    createRequest({
      input: 'sendFiles',
      init: {
        method: 'POST',
        body: formData,
      },
      callback
    });
  }
}