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
    type: 'send', message, date: Date.now(), userId: user.id,
  };

  if (files.length) {
    const formData = new FormData(form);

    entity.sendFiles(formData, user.id, sendFiles.bind(null, webSoc));
    fileInput.value = '';
    updateFileList(fileInput);
  } else {
    webSoc.sendMessage(json);
  }

  form.message.value = '';
}