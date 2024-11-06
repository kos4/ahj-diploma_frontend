import onClickRemoveFile from "./onClickRemoveFile";
import {ext} from "../../../functions";

export default function updateFileList (fileInput) {
  const container = document.querySelector('.fileList');
  const files = fileInput.files;

  container.innerHTML = '';

  for (const file of files) {
    let name = file.name;

    if (name.length > 10) {
      name = name.slice(0, 10) + '... .' + ext(name);
    }

    container.insertAdjacentHTML('beforeend', `
      <div class="fileList__item">
        <span class="fileList__item-title">${name}</span>
        <span class="fileList__item-remove" data-file="${file.name}"></span>
      </div>
    `);
  }

  const fileListItemRemove = container.querySelectorAll('.fileList__item-remove');

  fileListItemRemove.forEach(element => {
    element.addEventListener('click', onClickRemoveFile.bind(null, fileInput));
  });
}