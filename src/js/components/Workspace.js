import {debounce} from "../functions";
import Entity from "../classes/Entity";

export default class Workspace {
  constructor(app, user) {
    this.app = app;
    this.user = user;
    this.entity = new Entity();
  }

  init() {
    this.subscribeOnEvents();
  }

  subscribeOnEvents() {
    this.websocket = new WebSocket('ws://localhost:8082');

    this.websocket.addEventListener('open', () => {
      this.renderChat();
      this.enterSendForm();

      const htmlContent = document.querySelector('.content');
      htmlContent.addEventListener('scroll', (event) => {
        const element = event.target;
        const count = element.querySelectorAll('.message__container').length;

        if (element.scrollTop === 0) {
          this.entity.loadMore(count, this.user.id, this.onLoadMore.bind(this, element.offsetHeight));
        }
      });
    });

    this.websocket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);

      if (data.status === 'connect') {
        this.user.connectionId = data.id;
        this.websocket.send(JSON.stringify({
          type: 'getData', userId: this.user.id,
        }));
      } else {
        if (data.userId === this.user.id) {
          if (Object.hasOwn(data, 'chat')) {
            if (data.id === this.user.connectionId) {
              data.chat.forEach(item => {
                this.renderMessage(item);
              });
            }
          }else {
            this.renderMessage(data);
          }
        }
      }
    });
  }

  onLoadMore(scroll, response) {
    if (response.status === 'ok' && response.message.length > 0) {
      response.message.forEach(item => {
        this.renderMessage(item, 'afterbegin', scroll);
      });
    }
  }

  enterSendForm() {
    document.getElementById("message").addEventListener("keypress", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.submitForm(e.currentTarget.closest('form'));
      }
    });
  }

  submitForm(form) {
    const message = form.message.value;

    if (!message) return;

    this.sendMessage(message);
    form.message.value = '';
  }

  sendMessage(message) {
    const json = JSON.stringify({
      type: 'send', message, date: Date.now(), userId: this.user.id,
    });
    this.websocket.send(json);
  }

  renderMessage(data, place = 'beforeend', scroll = 0) {
    const chat = document.querySelector('.content');
    const message = this.markupMessage(data);
    chat.insertAdjacentHTML(place, message);
    if (!scroll) {
      chat.scrollTop = chat.scrollHeight;
    } else {
      chat.scrollTop = scroll;
    }
  }

  convertLink(text) {
    const regex = /(http[s]*:\/\/(\S+))/gm;
    const subst = `<a href="$1" target="_blank">$2</a>`;

    return text.replace(regex, subst);
  }

  renderChat() {
    this.app.innerHTML = this.markup();
  }

  markupMessage(data) {
    const message = this.convertLink(data.message);

    return `
      <div class="message__container">
        <div class="message__container-interlocutor">
          ${message}
        </div>
        <div class="message__header">
          ${new Date(data.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    `;
  }

  markup() {
    return `
      <div class="header">
        <div class="header__avatar">
          <img src="${require('../../images/avatar.png')}" alt="Аватар">
        </div>
        <div class="header__title">
          <div class="header__app-name">Organizer</div>
          <div class="header__user-name">${this.user.name}</div>
        </div>
        <div class="header__search">
          <form class="form" action="">
            <div class="form__group">
              <label for="search"></label>
              <input type="text" class="form__input" id="search" name="search" placeholder="Введите запрос">
            </div>
          </form>
        </div>
        <div class="header__menu"></div>
      </div>
      <div class="content"></div>
      <div class="footer">
        <div class="footer__files"></div>
        <div class="footer__message">
          <form class="form form__message" action="">
            <div class="form__group">
              <label for="message"></label>
              <textarea class="form__textarea" id="message" name="message" placeholder="Введите сообщение..."></textarea>
            </div>
          </form>
        </div>
        <div class="footer__audio"></div>
        <div class="footer__video"></div>
      </div>
    `;
  }
}