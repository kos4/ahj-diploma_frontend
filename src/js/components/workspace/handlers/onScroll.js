import loadMore from "./loadMore";
import Entity from "../../../classes/Entity";

const entity = new Entity();

export default function onScroll(user) {
  const htmlContent = document.querySelector(".content");
  htmlContent.addEventListener("scroll", (event) => {
    const element = event.target;
    const count = element.querySelectorAll(".message__container").length;

    if (element.scrollTop === 0) {
      entity.loadMore(
        count,
        user.id,
        loadMore.bind(null, element.offsetHeight),
      );
    }
  });
}
