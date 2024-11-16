import updateFileList from "./updateFileList";
import Entity from "../../../classes/Entity";
import sendFiles from "./sendFiles";
import Popup from "../../Popup/Popup";

const entity = new Entity();

export default function onSubmitMessage(form, webSoc, user) {
  const message = form.message.value;
  const fileInput = document.querySelector('.form__input-files');
  const files = fileInput.files;
  const popup = new Popup();

  if (!message && !files.length) return;

  const json = {
    type: 'send', date: Date.now(), userId: user.id,
  };

  if (files.length) {
    const formData = new FormData(form);

    entity.sendFiles(formData, user.id, sendFiles.bind(null, webSoc, json));
    fileInput.value = '';
    form.message.value = '';
    updateFileList(fileInput);

    return;
  }

  if (message === '@location') {
    let sendMessage = '';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        data => {
          sendMessage = `Ваша локация: ${data.coords.latitude} широты, ${data.coords.longitude} долготы.`;
          json.message = sendMessage;
          webSoc.sendMessage(json);
        },
        error => {
          popup.render({
            title: `Ошибка. Код: ${error.code}`,
            body: error.message,
          });
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      popup.render({
        body: 'Ваш браузер не поддерживает определение Геолокации.',
      });
    }

    form.message.value = sendMessage;

    return;
  }

  json.message = message;
  webSoc.sendMessage(json);
  form.message.value = '';
}