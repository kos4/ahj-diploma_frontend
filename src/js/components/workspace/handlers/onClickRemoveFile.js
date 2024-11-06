import updateFileList from "./updateFileList";

export default function onClickRemoveFile (fileInput, event) {
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