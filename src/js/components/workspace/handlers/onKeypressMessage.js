import onSubmitMessage from "./onSubmitMessage";

export default function onKeypressMessage (webSoc, user, event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();

    const form = event.target.closest('form');

    onSubmitMessage(form, webSoc, user);
  }
}