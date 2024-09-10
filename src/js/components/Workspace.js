export default class Workspace {
  constructor(app, user) {
    this.app = app;
    this.user = user;
  }

  init() {
    this.subscribeOnEvents();
  }

  subscribeOnEvents() {
    this.websocket = new WebSocket('ws://localhost:8082');

    this.websocket.addEventListener('open', () => {
      this.renderChat();
      this.enterSendForm();
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

  renderMessage(data) {
    const chat = document.querySelector('.content');
    const message = this.markupMessage(data);
    chat.insertAdjacentHTML('beforeend', message);
    chat.scrollTop = chat.scrollHeight;
  }

  renderChat() {
    this.app.innerHTML = this.markup();
  }

  markupMessage(data) {
    return `
      <div class="message__container">
        <div class="message__container-interlocutor">
          ${data.message}
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