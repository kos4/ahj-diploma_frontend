import updateFileList from "./updateFileList";
import Entity from "../../../classes/Entity";
import sendFiles from "./sendFiles";

const entity = new Entity();

export default function onSubmitMessage(form, webSoc, user) {
  const message = form.message.value;
  const fileInput = document.querySelector('.form__input-files');
  const files = fileInput.files;

  if (!message && !files.length) return;

  const json = {
    type: 'send', date: Date.now(), userId: user.id,
  };

  if (files.length) {
    const formData = new FormData(form);

    entity.sendFiles(formData, user.id, sendFiles.bind(null, webSoc, json));
    fileInput.value = '';
    updateFileList(fileInput);
  } else {
    json.message = message;
    webSoc.sendMessage(json);
  }

  form.message.value = '';
}