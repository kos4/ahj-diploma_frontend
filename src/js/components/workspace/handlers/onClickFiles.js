export default function onClickFiles(fileInput) {
  fileInput.dispatchEvent(new MouseEvent("click"));
}
