import updateFileList from "./updateFileList";

export default function onChangeFiles (event) {
  updateFileList(event.target);
}