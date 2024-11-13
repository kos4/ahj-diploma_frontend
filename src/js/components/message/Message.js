import {convertLink, dateFormat} from "../../functions";
import Files from "./Files";

export default class Message {

  constructor() {
    this.files = new Files();
  }

  render(data, place = 'beforeend', scroll = 0) {
    const chat = document.querySelector('.content');
    const message = this.markup(data);
    chat.insertAdjacentHTML(place, message);
    if (!scroll) {
      chat.scrollTop = chat.scrollHeight;
    } else {
      chat.scrollTop = scroll;
    }
  }

  markup(data) {
    const message = convertLink(data.message);
    const date = dateFormat(data.date);
    let files = '';

    if (data.hasOwnProperty('files')) {
      files = this.files.render(data.files);
    }

    return `
      <div class="message__container">
        <div class="message__container-interlocutor">
          ${message}
        </div>
        ${files}
        <div class="message__header">
          ${date}
        </div>
      </div>
    `;
  }
}