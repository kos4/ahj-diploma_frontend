export default function sendFiles(webSoc, json, response) {
  if (response.status === 'ok' && response.message) {
    json.message = response.message;
    json.files = response.files;
    webSoc.sendMessage(json);
  }
}