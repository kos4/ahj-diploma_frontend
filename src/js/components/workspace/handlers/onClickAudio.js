import Entity from "../../../classes/Entity";
import sendFiles from "./sendFiles";

export default function onClickAudio(user, webSoc, event) {
  const currentElement = event.target;

  let stream = null;
  let recorder = null;

  if (!currentElement.classList.contains('footer__record')) {
    currentElement.classList.add('footer__record');

    (async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.addEventListener("start", () => {
        console.log("start");
      });

      recorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      recorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, {type: 'audio/mp3'});

        const entity = new Entity();
        const json = {
          type: 'send', date: Date.now(), userId: user.id,
        };
        const formData = new FormData();

        formData.append('files', blob);
        formData.append('message', '');

        entity.sendFiles(formData, user.id, sendFiles.bind(null, webSoc, json));
      });

      recorder.start();

      currentElement.addEventListener('click', stopped.bind(null, recorder, stream))
    })();

  } else {
    currentElement.classList.remove('footer__record');
  }
}

function stopped (recorder, stream, event) {
  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());
}