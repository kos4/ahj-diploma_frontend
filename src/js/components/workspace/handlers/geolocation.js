export function geolocation(json, webSoc, popup, form) {
  let sendMessage = "";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        sendMessage = `Ваша локация: ${data.coords.latitude} широты, ${data.coords.longitude} долготы.`;
        json.message = sendMessage;
        webSoc.sendMessage(json);
      },
      (error) => {
        popup.render({
          title: `Ошибка. Код: ${error.code}`,
          body: error.message,
        });
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  } else {
    popup.render({
      body: "Ваш браузер не поддерживает определение Геолокации.",
    });
  }

  form.message.value = sendMessage;
}
