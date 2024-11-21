/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 829:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "729aea1d1dfd2aea9fef.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// CONCATENATED MODULE: ./src/js/functions.js
function convertLink(text) {
  const regex = /(http[s]*:\/\/(\S+))/gm;
  const subst = `<a href="$1" target="_blank">$2</a>`;
  return text.replace(regex, subst);
}
function dateFormat(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formDataToJson(data) {
  return JSON.stringify(Object.fromEntries(data.entries()));
}
function ext(name) {
  return name.match(/\.([^.]+)$|$/)[1];
}
;// CONCATENATED MODULE: ./src/js/createRequest.js
const host = "https://ahj-diploma-backend-7xgh.onrender.com/";
async function createRequest(options) {
  const response = await fetch(host + options.input, options.init);
  options.callback(await response.json());
}
;// CONCATENATED MODULE: ./src/js/classes/Entity.js


class Entity {
  loadSchedule(userId, callback) {
    createRequest({
      input: "loadSchedule",
      init: {
        method: "POST",
        body: JSON.stringify({
          userId
        })
      },
      callback
    });
  }
  loginUser(form, callback) {
    createRequest({
      input: "login",
      init: {
        method: "POST",
        body: formDataToJson(new FormData(form))
      },
      callback
    });
  }
  loadMore(count, userId, callback) {
    createRequest({
      input: "loadMore",
      init: {
        method: "POST",
        body: JSON.stringify({
          count,
          userId
        })
      },
      callback
    });
  }
  sendFiles(formData, userId, callback) {
    formData.append("userId", userId);
    createRequest({
      input: "sendFiles",
      init: {
        method: "POST",
        body: formData
      },
      callback
    });
  }
}
;// CONCATENATED MODULE: ./src/js/components/message/Files.js
class Files {
  render(files) {
    let html = "";
    for (let type in files) {
      files[type].forEach(file => {
        switch (type) {
          case "image":
            html += this.markupImage(file);
            break;
          case "audio":
            html += this.markupAudio(file);
            break;
          case "video":
            html += this.markupVideo(file);
            break;
          default:
            html += this.markupDoc(file);
        }
      });
    }
    return `<div class="filesUploadList">${html}</div>`;
  }
  markupAudio(file) {
    return `
      <div class="filesUploadList__item">
        <figure>
          <figcaption>${file.name}:</figcaption>
          <audio controls src="${file.url}"></audio>
          <a class="filesUploadList__item-link" href="${file.url}" download="${file.name}"> Скачать </a>
        </figure>
      </div>
    `;
  }
  markupVideo(file) {
    return `
      <div class="filesUploadList__item">
        <video src="${file.url}" controls>
          Sorry, your browser doesn't support embedded videos, but don't worry, you can
          <a class="filesUploadList__item-link" href="${file.url}" download="${file.name}">download it</a>
          and watch it with your favorite video player!
        </video>
      </div>
    `;
  }
  markupImage(file) {
    return `
      <div class="filesUploadList__item">
        <a class="filesUploadList__item-link" href="${file.url}" download="${file.name}">
          <img class="filesUploadList__item-image" src="${file.url}" alt="${file.name}"/>
        </a>
      </div>
    `;
  }
  markupDoc(file) {
    return `
      <div class="filesUploadList__item">
        <a class="filesUploadList__item-link" href="${file.url}" download="${file.name}">${file.name}</a>
      </div>
    `;
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/downloadFile.js
function downloadFile(chat) {
  const fileLinksDownload = chat.querySelectorAll(".filesUploadList__item-link");
  fileLinksDownload.forEach(el => {
    if (!el.hasAttribute("listner")) {
      el.setAttribute("listner", "");
      el.addEventListener("click", event => {
        event.preventDefault();
        let link = document.createElement("a");
        fetch(el.href).then(response => response.blob()).then(blob => {
          link.href = URL.createObjectURL(blob);
          link.download = el.download;
          link.click();
          setTimeout(() => URL.revokeObjectURL(blob), 3000);
        });
      });
    }
  });
}
;// CONCATENATED MODULE: ./src/js/components/message/Message.js



class Message {
  constructor() {
    this.files = new Files();
  }
  render(data, place = "beforeend", scroll = 0) {
    const chat = document.querySelector(".content");
    const message = this.markup(data);
    chat.insertAdjacentHTML(place, message);
    downloadFile(chat);
    if (!scroll) {
      setTimeout(() => chat.scrollTo(0, chat.scrollHeight), 100);
    } else {
      chat.scrollTop = scroll;
    }
  }
  markup(data) {
    const message = convertLink(data.message);
    const date = dateFormat(data.date);
    let files = "";
    if (Object.hasOwn(data, "files")) {
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
;// CONCATENATED MODULE: ./src/js/classes/WebSoc.js

class WebSoc {
  constructor(user) {
    this.host = "wss://ahj-diploma-backend-7xgh.onrender.com/";
    this.user = user;
    this.message = new Message();
    this.websocket = new WebSocket(this.host);
  }
  fetchMessage() {
    this.websocket.addEventListener("message", e => {
      const data = JSON.parse(e.data);
      if (data.status === "connect") {
        this.user.connectionId = data.id;
        this.websocket.send(JSON.stringify({
          type: "getData",
          userId: this.user.id
        }));
      } else {
        if (data.userId === this.user.id) {
          if (Object.hasOwn(data, "chat")) {
            if (data.id === this.user.connectionId) {
              data.chat.forEach(item => {
                this.message.render(item);
              });
            }
          } else {
            this.message.render(data);
          }
        }
      }
    });
  }
  loadMessage(callback) {
    this.websocket.addEventListener("open", callback);
  }
  sendMessage(json) {
    this.websocket.send(JSON.stringify(json));
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/loadMore.js

const message = new Message();
function loadMore(scroll, response) {
  if (response.status === "ok" && response.message.length > 0) {
    response.message.forEach(item => {
      message.render(item, "afterbegin", scroll);
    });
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onScroll.js


const entity = new Entity();
function onScroll(user) {
  const htmlContent = document.querySelector(".content");
  htmlContent.addEventListener("scroll", event => {
    const element = event.target;
    const count = element.querySelectorAll(".message__container").length;
    if (element.scrollTop === 0) {
      entity.loadMore(count, user.id, loadMore.bind(null, element.offsetHeight));
    }
  });
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onClickFiles.js
function onClickFiles(fileInput) {
  fileInput.dispatchEvent(new MouseEvent("click"));
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onClickRemoveFile.js

function onClickRemoveFile(fileInput, event) {
  const dt = new DataTransfer();
  const element = event.target;
  const file = element.dataset.file;
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    if (files[i].name !== file) {
      dt.items.add(files[i]);
    }
  }
  fileInput.files = dt.files;
  updateFileList(fileInput);
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/updateFileList.js


function updateFileList(fileInput) {
  const container = document.querySelector(".fileList");
  const files = fileInput.files;
  container.innerHTML = "";
  for (const file of files) {
    let name = file.name;
    if (name.length > 10) {
      name = name.slice(0, 10) + "... ." + ext(name);
    }
    container.insertAdjacentHTML("beforeend", `
      <div class="fileList__item">
        <span class="fileList__item-title">${name}</span>
        <span class="fileList__item-remove" data-file="${file.name}"></span>
      </div>
    `);
  }
  const fileListItemRemove = container.querySelectorAll(".fileList__item-remove");
  fileListItemRemove.forEach(element => {
    element.addEventListener("click", onClickRemoveFile.bind(null, fileInput));
  });
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/sendFiles.js
function sendFiles(webSoc, json, response) {
  if (response.status === "ok" && (response.message || response.files)) {
    json.message = response.message;
    json.files = response.files;
    webSoc.sendMessage(json);
  }
}
;// CONCATENATED MODULE: ./src/js/components/Popup/Popup.js

class Popup {
  constructor() {
    this.container = document.querySelector("body");
  }
  render(data) {
    const markup = this.markup(data);
    this.removePopup();
    this.container.insertAdjacentHTML("beforeend", markup);
    const elPopup = this.container.querySelector(".popup");
    const close = elPopup.querySelector(".popup__close");
    const popupWindow = elPopup.querySelector(".popup__window");
    popupWindow.addEventListener("click", event => event.stopPropagation());
    close.addEventListener("click", this.closePopup.bind(this));
    elPopup.addEventListener("click", this.closePopup.bind(this));
  }
  closePopup() {
    this.removePopup();
  }
  removePopup() {
    const items = this.container.querySelectorAll(".popup");
    if (items.length) {
      items.forEach(item => {
        item.remove();
      });
    }
  }
  markup(data) {
    const title = data.title ? data.title : "Сообщение";
    return `
      <div class="popup">
        <div class="popup__window">
          <div class="popup__close">x</div>
          <div class="popup__title">${title}</div>
          <div class="popup__body">${data.body}</div>
        </div>
      </div>
    `;
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/geolocation.js
function geolocation(json, webSoc, popup, form) {
  let sendMessage = "";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(data => {
      sendMessage = `Ваша локация: ${data.coords.latitude} широты, ${data.coords.longitude} долготы.`;
      json.message = sendMessage;
      webSoc.sendMessage(json);
    }, error => {
      popup.render({
        title: `Ошибка. Код: ${error.code}`,
        body: error.message
      });
      console.log(error);
    }, {
      enableHighAccuracy: true
    });
  } else {
    popup.render({
      body: "Ваш браузер не поддерживает определение Геолокации."
    });
  }
  form.message.value = sendMessage;
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/schedule.js


function showNotification(data) {
  const currentDate = new Date(Date.now());
  const currentTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes());
  data.forEach(item => {
    if (currentTime.getTime() === item.date) {
      new Notification(item.message, {
        body: "Уведомления Organizer",
        requireInteraction: true
      });
    }
  });
}
function addSchedule(scheduleMessage, form, json, webSoc, popup, user, schedule) {
  const strData = scheduleMessage[2].split('"');
  const message = strData[1];
  const dateTime = {};
  dateTime.arr = strData[0].split(" ");
  dateTime.time = dateTime.arr[0].split(":").map(item => Number(item));
  dateTime.date = dateTime.arr[1].split(".").map(item => Number(item));
  const date = new Date(dateTime.date[2], dateTime.date[1] - 1, dateTime.date[0], dateTime.time[0], dateTime.time[1]);
  if (date.getTime() > Date.now()) {
    json.type = "schedule";
    json.message = scheduleMessage[1];
    json.data = {
      date: date.getTime(),
      message: message
    };
    webSoc.sendMessage(json);
    form.message.value = "";
    initSchedule(schedule, user);
  } else {
    popup.render({
      title: "Ошибка",
      body: "Время уведомления меньше текущего!"
    });
  }
}
function onLoadSchedule(schedule, response) {
  if (schedule.value) {
    clearInterval(schedule.value);
  }
  const data = response.schedule;
  if (data.length > 0) {
    schedule.value = setInterval(() => {
      showNotification(data);
    }, 60000);
  }
}
function initNotification(schedule, user) {
  const entity = new Entity();
  entity.loadSchedule(user.id, onLoadSchedule.bind(null, schedule));
}
async function initSchedule(schedule, user) {
  const popup = new Popup();
  if (Notification) {
    if (Notification.permission === "granted") {
      initNotification(schedule, user);
      return;
    }
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission) {
        initNotification(schedule, user);
        return;
      }
    }
  } else {
    popup.render({
      body: "Ваш браузер не поддерживает Уведомления."
    });
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/fetchWeather.js
function fetchWeather(form, webSoc, json) {
  form.message.value = "";
  json.type = "fetchWeather";
  json.message = "Сейчас на улице";
  webSoc.sendMessage(json);
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/getTime.js
function getTime(form, webSoc, commandMessage, json) {
  form.message.value = "";
  json.type = "getTime";
  json.message = commandMessage[2];
  webSoc.sendMessage(json);
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/fetchCurrency.js
function fetchCurrency(form, webSoc, commandMessage, json) {
  form.message.value = "";
  json.type = "fetchCurrency";
  json.message = commandMessage[2];
  webSoc.sendMessage(json);
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/fetchAffiche.js
function fetchAffiche(form, webSoc, json) {
  form.message.value = "";
  json.type = "fetchAffiche";
  json.message = "Афиша";
  webSoc.sendMessage(json);
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/fetchMovie.js
function fetchMovie(form, webSoc, json) {
  form.message.value = "";
  json.type = "fetchMovie";
  json.message = "Фильм";
  webSoc.sendMessage(json);
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onSubmitMessage.js











const onSubmitMessage_entity = new Entity();
function onSubmitMessage(form, webSoc, user, schedule) {
  const message = form.message.value;
  const fileInput = document.querySelector(".form__input-files");
  const files = fileInput.files;
  const popup = new Popup();
  if (!message && !files.length) return;
  const json = {
    type: "send",
    date: Date.now(),
    userId: user.id
  };
  if (files.length) {
    const formData = new FormData(form);
    onSubmitMessage_entity.sendFiles(formData, user.id, sendFiles.bind(null, webSoc, json));
    fileInput.value = "";
    form.message.value = "";
    updateFileList(fileInput);
    return;
  }
  const commandMessage = message.match(/^@([a-zа-я]+) *(.*)/i);
  if (commandMessage) {
    switch (commandMessage[1]) {
      case "location":
        geolocation(json, webSoc, popup, form);
        break;
      case "schedule":
        addSchedule(commandMessage, form, json, webSoc, popup, user, schedule);
        break;
      case "погода":
        fetchWeather(form, webSoc, json);
        break;
      case "время":
        getTime(form, webSoc, commandMessage, json);
        break;
      case "валюта":
        fetchCurrency(form, webSoc, commandMessage, json);
        break;
      case "афиша":
        fetchAffiche(form, webSoc, json);
        break;
      case "фильм":
        fetchMovie(form, webSoc, json);
        break;
      default:
        popup.render({
          body: "Данной команды не существует."
        });
    }
    return;
  }
  json.message = message;
  webSoc.sendMessage(json);
  form.message.value = "";
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onKeypressMessage.js

function onKeypressMessage(webSoc, user, schedule, event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    const form = event.target.closest("form");
    onSubmitMessage(form, webSoc, user, schedule);
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onChangeFiles.js

function onChangeFiles(event) {
  updateFileList(event.target);
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onDropFiles.js

function onDropFiles(fileInput, event) {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files && files.length) {
    const dt = new DataTransfer();
    for (let i = 0; i < fileInput.files.length; i++) {
      dt.items.add(fileInput.files[i]);
    }
    for (let i = 0; i < files.length; i++) {
      dt.items.add(files[i]);
    }
    fileInput.files = dt.files;
    updateFileList(fileInput);
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/recordMedia.js


async function recordMedia(stream, recorder, constraints, mimeType, currentElement, user, webSoc) {
  const chunks = [];
  currentElement.classList.add("footer__record");
  stream = await navigator.mediaDevices.getUserMedia(constraints);
  recorder = new MediaRecorder(stream);
  recorder.addEventListener("start", () => {
    console.log("start");
  });
  recorder.addEventListener("dataavailable", event => {
    chunks.push(event.data);
  });
  recorder.addEventListener("stop", () => {
    const blob = new Blob(chunks, {
      type: mimeType
    });
    const entity = new Entity();
    const json = {
      type: "send",
      date: Date.now(),
      userId: user.id
    };
    const formData = new FormData();
    formData.append("files", blob);
    formData.append("message", "");
    entity.sendFiles(formData, user.id, sendFiles.bind(null, webSoc, json));
  });
  currentElement.addEventListener("click", stopRecord.bind(null, recorder, stream, currentElement));
  recorder.start();
}
function stopRecord(recorder, stream, currentElement) {
  recorder.stop();
  stream.getTracks().forEach(track => track.stop());
  currentElement.classList.remove("footer__record");
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onClickAudio.js

function onClickAudio(user, webSoc, event) {
  const currentElement = event.target;
  let stream, recorder;
  if (!currentElement.classList.contains("footer__record")) {
    recordMedia(stream, recorder, {
      audio: true
    }, "audio/mp3", currentElement, user, webSoc);
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/handlers/onClickVideo.js

function onClickVideo(user, webSoc, event) {
  const currentElement = event.target;
  let stream, recorder;
  if (!currentElement.classList.contains("footer__record")) {
    recordMedia(stream, recorder, {
      video: true,
      audio: true
    }, "video/mp4", currentElement, user, webSoc);
  }
}
;// CONCATENATED MODULE: ./src/js/components/workspace/Workspace.js










class Workspace {
  constructor(app, user) {
    this.app = app;
    this.user = user;
    this.webSoc = new WebSoc(user);
    this.message = new Message();
    this.schedule = {
      value: null
    };
  }
  init() {
    this.renderChat();
    this.subscribeOnEvents();
    initSchedule(this.schedule, this.user);
  }
  subscribeOnEvents() {
    const elMessage = this.app.querySelector("#message");
    const fileContainer = this.app.querySelector(".footer__files");
    const fileInput = fileContainer.querySelector(".form__input-files");
    const chatContainer = this.app.querySelector(".content");
    const btnAudio = this.app.querySelector(".footer__audio");
    const btnVideo = this.app.querySelector(".footer__video");
    this.webSoc.fetchMessage();
    this.webSoc.loadMessage(onScroll.bind(null, this.user));
    elMessage.addEventListener("keypress", onKeypressMessage.bind(null, this.webSoc, this.user, this.schedule));
    fileContainer.addEventListener("click", onClickFiles.bind(null, fileInput));
    fileInput.addEventListener("change", onChangeFiles);
    chatContainer.addEventListener("dragover", event => event.preventDefault());
    chatContainer.addEventListener("drop", onDropFiles.bind(null, fileInput));
    btnAudio.addEventListener("click", onClickAudio.bind(null, this.user, this.webSoc));
    btnVideo.addEventListener("click", onClickVideo.bind(null, this.user, this.webSoc));
  }
  renderChat() {
    this.app.innerHTML = this.markup();
  }
  markup() {
    const avatar = __webpack_require__(829);
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
;// CONCATENATED MODULE: ./src/js/components/Login.js


class Login {
  constructor(app) {
    this.app = app;
  }
  init() {
    this.app.innerHTML = this.markup();
    this.form = this.app.querySelector("form");
    this.form.addEventListener("submit", this.onSubmit.bind(this));
  }
  onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const entity = new Entity();
    entity.loginUser(form, this.onLogin.bind(this));
  }
  onLogin(response) {
    if (response.status === "ok") {
      const user = response.user;
      const workspace = new Workspace(this.app, user);
      localStorage.setItem("user", JSON.stringify(user));
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
;// CONCATENATED MODULE: ./src/js/app.js


const app = document.querySelector(".app");
const user = JSON.parse(localStorage.getItem("user"));
if (user && user.id) {
  const workspace = new Workspace(app, user);
  workspace.init();
} else {
  const login = new Login(app);
  login.init();
}
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;