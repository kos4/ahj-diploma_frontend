export default function fetchWeather(form, webSoc, json) {
  form.message.value = '';
  json.type = 'fetchWeather';
  json.message = 'Сейчас на улице';

  webSoc.sendMessage(json);
}