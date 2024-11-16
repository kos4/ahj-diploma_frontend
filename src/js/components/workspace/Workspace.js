import WebSoc from "../../classes/WebSoc";
import Message from "../message/Message";
import onScroll from "./handlers/onScroll";
import onClickFiles from "./handlers/onClickFiles";
import onKeypressMessage from "./handlers/onKeypressMessage";
import onChangeFiles from "./handlers/onChangeFiles";
import onDropFiles from "./handlers/onDropFiles";
import {initSchedule} from "./handlers/schedule";

export default class Workspace {
  constructor(app, user) {
    this.app = app;
    this.user = user;
    this.webSoc = new WebSoc(user);
    this.message = new Message();
    this.schedule = { value: null };
  }

  init() {
    this.renderChat();
    this.subscribeOnEvents();
    initSchedule(this.schedule, this.user);
  }

  subscribeOnEvents() {
    const formMessage = document.getElementById('message');
    const fileContainer = document.querySelector('.footer__files');
    const fileInput = fileContainer.querySelector('.form__input-files');
    const chatContainer = document.querySelector('.content');

    this.webSoc.fetchMessage(this.downloadFile);
    this.webSoc.loadMessage(onScroll.bind(null, this.user));
    formMessage.addEventListener('keypress', onKeypressMessage.bind(null, this.webSoc, this.user, this.schedule));
    fileContainer.addEventListener('click', onClickFiles.bind(null, fileInput));
    fileInput.addEventListener('change', onChangeFiles);
    chatContainer.addEventListener('dragover', event => event.preventDefault());
    chatContainer.addEventListener('drop', onDropFiles.bind(null, fileInput));
  }

  downloadFile() {
    const fileLinksDownload = document.querySelectorAll('.filesUploadList__item-link');

    fileLinksDownload.forEach(el => {
      el.addEventListener('click', event => {
        event.preventDefault();
        let link = document.createElement('a');
        fetch(el.href)
          .then(response => response.blob())
            .then(blob => {
              link.href = URL.createObjectURL(blob);
              link.download = el.download;
              link.click();
              setTimeout(() => URL.revokeObjectURL(blob), 3000);
            }
          );
      });
    });
  }

  renderChat() {
    this.app.innerHTML = this.markup();
  }

  markup() {
    const avatar = require('../../../images/avatar.png');

    return `
      <div class="header">
        <div class="header__avatar">
          <img src="${avatar}" alt="Аватар">
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
        <form class="form form__message" action="" enctype="multipart/form-data">
          <div class="footer__files">
            <input type="file" class="form__input-files" multiple name="files">
            <span class="footer__files-button"></span>
          </div>
          <div class="footer__message">
            <div class="form__group">
              <label for="message"></label>
              <textarea class="form__textarea" id="message" name="message" placeholder="Введите сообщение..."></textarea>
            </div>
            <div class="fileList"></div>          
          </div>
          <div class="footer__audio"></div>
          <div class="footer__video"></div>
        </form>
      </div>
    `;
  }
}