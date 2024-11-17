export default function sendFiles(webSoc, json, response) {
  if (response.status === 'ok' && (response.message || response.files)) {
    json.message = response.message;
    json.files = response.files;
    webSoc.sendMessage(json);
  }
}