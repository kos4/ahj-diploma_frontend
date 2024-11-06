import Entity from "../classes/Entity";
import Workspace from "./workspace/Workspace";

export default class Login {
  constructor(app) {
    this.app = app;
  }

  init() {
    this.app.innerHTML = this.markup();
    this.form = this.app.querySelector('form');
    this.form.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const entity = new Entity();
    entity.loginUser(form, this.onLogin.bind(this));
  }

  onLogin(response) {
    if (response.status === 'ok') {
      const user = response.user;
      const workspace = new Workspace(this.app, user);

      localStorage.setItem('user', JSON.stringify(user));
      workspace.init();
    }
  }

  markup() {
    return `
      <div class="login">
        <h1 class="login__h1">
          Добро пожаловать в Organizer
        </h1>
        <h2 class="login__h2">Авторизация</h2>
        <form class="login__form">
          <div class="form__group">
            <label>
              <input type="text" class="login__form-input" name="name" placeholder="Введите имя">
            </label>
          </div>
          <div class="form__group">
            <label>
              <input type="password" class="login__form-input" name="password" placeholder="Введите пароль">
            </label>
          </div>
          <div class="form__group">
            <label>
              <button class="login__form-btn">Войти</button>
            </label>
          </div>
        </form>
      </div>
    `;
  }
}