import "./popup.css";

export default class Popup {
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

    popupWindow.addEventListener("click", (event) => event.stopPropagation());
    close.addEventListener("click", this.closePopup.bind(this));
    elPopup.addEventListener("click", this.closePopup.bind(this));
  }

  closePopup() {
    this.removePopup();
  }

  removePopup() {
    const items = this.container.querySelectorAll(".popup");

    if (items.length) {
      items.forEach((item) => {
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
