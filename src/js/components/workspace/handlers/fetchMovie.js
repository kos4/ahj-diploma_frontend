export default function fetchMovie(form, webSoc, json) {
  form.message.value = "";
  json.type = "fetchMovie";
  json.message = "Фильм";

  webSoc.sendMessage(json);
}
