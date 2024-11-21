import Entity from "../../../classes/Entity";
import Popup from "../../Popup/Popup";

function showNotification(data) {
  const currentDate = new Date(Date.now());
  const currentTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
  );

  data.forEach((item) => {
    if (currentTime.getTime() === item.date) {
      new Notification(item.message, {
        body: "Уведомления Organizer",
        requireInteraction: true,
      });
    }
  });
}

export function addSchedule(
  scheduleMessage,
  form,
  json,
  webSoc,
  popup,
  user,
  schedule,
) {
  const strData = scheduleMessage[2].split('"');
  const message = strData[1];
  const dateTime = {};

  dateTime.arr = strData[0].split(" ");
  dateTime.time = dateTime.arr[0].split(":").map((item) => Number(item));
  dateTime.date = dateTime.arr[1].split(".").map((item) => Number(item));

  const date = new Date(
    dateTime.date[2],
    dateTime.date[1] - 1,
    dateTime.date[0],
    dateTime.time[0],
    dateTime.time[1],
  );

  if (date.getTime() > Date.now()) {
    json.type = "schedule";
    json.message = scheduleMessage[1];
    json.data = {
      date: date.getTime(),
      message: message,
    };

    webSoc.sendMessage(json);
    form.message.value = "";
    initSchedule(schedule, user);
  } else {
    popup.render({
      title: "Ошибка",
      body: "Время уведомления меньше текущего!",
    });
  }
}

function onLoadSchedule(schedule, response) {
  if (schedule.value) {
    clearInterval(schedule.value);
  }

  const data = response.schedule;

  if (data.length > 0) {
    schedule.value = setInterval(() => {
      showNotification(data);
    }, 60000);
  }
}

function initNotification(schedule, user) {
  const entity = new Entity();
  entity.loadSchedule(user.id, onLoadSchedule.bind(null, schedule));
}

export async function initSchedule(schedule, user) {
  const popup = new Popup();

  if (Notification) {
    if (Notification.permission === "granted") {
      initNotification(schedule, user);

      return;
    }

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();

      if (permission) {
        initNotification(schedule, user);

        return;
      }
    }
  } else {
    popup.render({
      body: "Ваш браузер не поддерживает Уведомления.",
    });
  }
}
