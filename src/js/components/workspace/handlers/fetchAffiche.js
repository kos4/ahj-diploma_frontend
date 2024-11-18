export default function fetchAffiche(form, webSoc, json) {
  form.message.value = '';
  json.type = 'fetchAffiche';
  json.message = 'Афиша';

  webSoc.sendMessage(json);
}