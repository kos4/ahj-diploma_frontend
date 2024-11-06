import {convertLink, dateFormat} from "../../functions";

export default class Message {

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

    return `
      <div class="message__container">
        <div class="message__container-interlocutor">
          ${message}
        </div>
        <div class="message__header">
          ${date}
        </div>
      </div>
    `;
  }
}