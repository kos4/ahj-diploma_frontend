import Entity from "../../../classes/Entity";
import sendFiles from "./sendFiles";

export async function recordMedia(
  stream,
  recorder,
  constraints,
  mimeType,
  currentElement,
  user,
  webSoc,
) {
  const chunks = [];

  currentElement.classList.add("footer__record");
  stream = await navigator.mediaDevices.getUserMedia(constraints);
  recorder = new MediaRecorder(stream);
  recorder.addEventListener("start", () => {
    console.log("start");
  });
  recorder.addEventListener("dataavailable", (event) => {
    chunks.push(event.data);
  });
  recorder.addEventListener("stop", () => {
    const blob = new Blob(chunks, { type: mimeType });
    const entity = new Entity();
    const json = {
      type: "send",
      date: Date.now(),
      userId: user.id,
    };
    const formData = new FormData();

    formData.append("files", blob);
    formData.append("message", "");
    entity.sendFiles(formData, user.id, sendFiles.bind(null, webSoc, json));
  });
  currentElement.addEventListener(
    "click",
    stopRecord.bind(null, recorder, stream, currentElement),
  );
  recorder.start();
}

function stopRecord(recorder, stream, currentElement) {
  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());
  currentElement.classList.remove("footer__record");
}
