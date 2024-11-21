import updateFileList from "./updateFileList";

export default function onDropFiles(fileInput, event) {
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
