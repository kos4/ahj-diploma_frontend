import updateFileList from "./updateFileList";
import Entity from "../../../classes/Entity";
import sendFiles from "./sendFiles";
import Popup from "../../Popup/Popup";
import {geolocation} from "./geolocation";

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
    geolocation(json, webSoc, popup, form);

    return;
  }

  json.message = message;
  webSoc.sendMessage(json);
  form.message.value = '';
}