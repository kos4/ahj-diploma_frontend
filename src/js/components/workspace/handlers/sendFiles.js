export default function sendFiles(webSoc, response) {
  console.log(response)

  if (response.status === 'ok' && response.message) {
    //webSoc.sendMessage(response.message);
  }
}