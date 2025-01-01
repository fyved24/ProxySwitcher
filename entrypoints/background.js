export default defineBackground(() => {

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.op) {
      case 'proxies':
        console.log('获取代理列表');
        console.log(message.url);
        fetch(`${message.url}/proxies`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            sendResponse(data);
          })
          .catch((error) => {
            console.error('获取代理列表失败:', error);
            sendResponse({data: []});
          });
        break;
      case 'add':
        console.log('add'); 
        console.log(message.param); 
        fetch(`${message.url}/add?matched_url=${message.param}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            sendResponse(data);
          });
        break;
      case 'switch':
        console.log('switch'); 
        console.log(message.param); 
        fetch(`${message.url}/switch?proxy_id=${message.param}`)
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
