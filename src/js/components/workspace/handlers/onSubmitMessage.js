import updateFileList from "./updateFileList";
import Entity from "../../../classes/Entity";
import sendFiles from "./sendFiles";
import Popup from "../../Popup/Popup";
import { geolocation } from "./geolocation";
import { addSchedule } from "./schedule";
import fetchWeather from "./fetchWeather";
import getTime from "./getTime";
import fetchCurrency from "./fetchCurrency";
import fetchAffiche from "./fetchAffiche";
import fetchMovie from "./fetchMovie";

const entity = new Entity();

export default function onSubmitMessage(form, webSoc, user, schedule) {
  const message = form.message.value;
  const fileInput = document.querySelector(".form__input-files");
  const files = fileInput.files;
  const popup = new Popup();

  if (!message && !files.length) return;

  const json = {
    type: "send",
    date: Date.now(),
    userId: user.id,
  };

  if (files.length) {
    const formData = new FormData(form);

    entity.sendFiles(formData, user.id, sendFiles.bind(null, webSoc, json));
    fileInput.value = "";
    form.message.value = "";
    updateFileList(fileInput);

    return;
  }

  const commandMessage = message.match(/^@([a-zа-я]+) *(.*)/i);

  if (commandMessage) {
    switch (commandMessage[1]) {
      case "location":
        geolocation(json, webSoc, popup, form);
        break;
      case "schedule":
        addSchedule(commandMessage, form, json, webSoc, popup, user, schedule);
        break;
      case "погода":
        fetchWeather(form, webSoc, json);
        break;
      case "время":
        getTime(form, webSoc, commandMessage, json);
        break;
      case "валюта":
        fetchCurrency(form, webSoc, commandMessage, json);
        break;
      case "афиша":
        fetchAffiche(form, webSoc, json);
        break;
      case "фильм":
        fetchMovie(form, webSoc, json);
        break;
      default:
        popup.render({
          body: "Данной команды не существует.",
        });
    }

    return;
  }

  json.message = message;
  webSoc.sendMessage(json);
  form.message.value = "";
}
