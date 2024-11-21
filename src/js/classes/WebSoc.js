import Message from "../components/message/Message";

export default class WebSoc {
  constructor(user) {
    this.host = "wss://ahj-diploma-backend-7xgh.onrender.com/";
    this.user = user;
    this.message = new Message();
    this.websocket = new WebSocket(this.host);
  }

  fetchMessage() {
    this.websocket.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);

      if (data.status === "connect") {
        this.user.connectionId = data.id;
        this.websocket.send(
          JSON.stringify({
            type: "getData",
            userId: this.user.id,
          }),
        );
      } else {
        if (data.userId === this.user.id) {
          if (Object.hasOwn(data, "chat")) {
            if (data.id === this.user.connectionId) {
              data.chat.forEach((item) => {
                this.message.render(item);
              });
            }
          } else {
            this.message.render(data);
          }
        }
      }
    });
  }

  loadMessage(callback) {
    this.websocket.addEventListener("open", callback);
  }

  sendMessage(json) {
    this.websocket.send(JSON.stringify(json));
  }
}
