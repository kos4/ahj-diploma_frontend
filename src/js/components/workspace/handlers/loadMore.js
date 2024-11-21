import Message from "../../message/Message";

const message = new Message();

export default function loadMore(scroll, response) {
  if (response.status === "ok" && response.message.length > 0) {
    response.message.forEach((item) => {
      message.render(item, "afterbegin", scroll);
    });
  }
}
