export default function sendFiles(webSoc, json, response) {
  if (response.status === 'ok' && response.message) {
    json.message = response.message;
    webSoc.sendMessage(json);
  }
}