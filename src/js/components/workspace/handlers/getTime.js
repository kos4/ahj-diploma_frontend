export default function getTime(form, webSoc, commandMessage, json) {
  form.message.value = "";
  json.type = "getTime";
  json.message = commandMessage[2];

  webSoc.sendMessage(json);
}
