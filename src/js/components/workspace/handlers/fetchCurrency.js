export default function fetchCurrency(form, webSoc, commandMessage, json) {
  form.message.value = '';
  json.type = 'fetchCurrency';
  json.message = commandMessage[2];

  webSoc.sendMessage(json);
}