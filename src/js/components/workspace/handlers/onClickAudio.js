import { recordMedia } from "./recordMedia";

export default function onClickAudio(user, webSoc, event) {
  const currentElement = event.target;
  let stream, recorder;

  if (!currentElement.classList.contains("footer__record")) {
    recordMedia(
      stream,
      recorder,
      { audio: true },
      "audio/mp3",
      currentElement,
      user,
      webSoc,
    );
  }
}
