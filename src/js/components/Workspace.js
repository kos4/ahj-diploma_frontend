export default class Workspace {
  constructor(app, user) {
    this.app = app;
    this.user = user;
  }

  init() {
    this.app.innerHTML = this.markup();
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
          <form class="form" action="">
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