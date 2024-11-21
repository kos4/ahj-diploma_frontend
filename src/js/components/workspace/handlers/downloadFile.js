export default function downloadFile(chat) {
  const fileLinksDownload = chat.querySelectorAll(
    ".filesUploadList__item-link",
  );

  fileLinksDownload.forEach((el) => {
    if (!el.hasAttribute("listner")) {
      el.setAttribute("listner", "");
      el.addEventListener("click", (event) => {
        event.preventDefault();

        let link = document.createElement("a");
        fetch(el.href)
          .then((response) => response.blob())
          .then((blob) => {
            link.href = URL.createObjectURL(blob);
            link.download = el.download;
            link.click();
            setTimeout(() => URL.revokeObjectURL(blob), 3000);
          });
      });
    }
  });
}
