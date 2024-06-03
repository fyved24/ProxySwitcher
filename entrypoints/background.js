export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message) {
      case 'proxies':
        console.log('获取代理列表'); // "ping"
        fetch('http://localhost:8000/proxies')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            sendResponse(data);
          });

        break;

      default:
        break;
    }
    return true;
  });
});
