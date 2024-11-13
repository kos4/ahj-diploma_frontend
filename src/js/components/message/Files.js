export default class Files {
  render(files) {
    let html = '';

    for (let type in files) {
      files[type].forEach(file => {
        switch (type) {
          case 'image':
            html += this.markupImage(file);
            break;
          case 'audio':
            html += this.markupAudio(file);
            break;
          case 'video':
            html += this.markupVideo(file);
            break;
          default:
            html += this.markupDoc(file);
        }
      });
    }


    return `<div class="filesUploadList">${html}</div>`;
  }

  markupAudio(file) {
    return `
      <div class="filesUploadList__item">
        <figure>
          <figcaption>${file.name}:</figcaption>
          <audio controls src="${file.url}"></audio>
          <a class="filesUploadList__item-link" href="${file.url}" download="${file.name}"> Скачать </a>
        </figure>
      </div>
    `;
  }

  markupVideo(file) {
    return `
      <div class="filesUploadList__item">
        <video src="${file.url}" controls>
          Sorry, your browser doesn't support embedded videos, but don't worry, you can
          <a class="filesUploadList__item-link" href="${file.url}" download="${file.name}">download it</a>
          and watch it with your favorite video player!
        </video>
      </div>
    `;
  }

  markupImage(file) {
    return `
      <div class="filesUploadList__item">
        <a class="filesUploadList__item-link" href="${file.url}" download="${file.name}">
          <img class="filesUploadList__item-image" src="${file.url}" alt="${file.name}"/>
        </a>
      </div>
    `;
  }

  markupDoc(file) {
    return `
      <div class="filesUploadList__item">
        <a class="filesUploadList__item-link" href="${file.url}" download="${file.name}">${file.name}</a>
      </div>
    `;
  }
}