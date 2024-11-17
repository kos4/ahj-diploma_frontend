import {recordMedia} from "./recordMedia";

export default function onClickVideo(user, webSoc, event) {
  const currentElement = event.target;
  let stream, recorder;

  if (!currentElement.classList.contains('footer__record')) {
    recordMedia(stream, recorder, {video: true, audio: true}, 'video/mp4', currentElement, user, webSoc);
  }
}