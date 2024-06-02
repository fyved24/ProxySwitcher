export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message); // "ping"
    fetch('http://localhost:8000/proxies')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
    // Wait 1 second and respond with "pong"
    setTimeout(() => sendResponse('pong'), 1000);
    return true;
  });
});
