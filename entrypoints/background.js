export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.op) {
      case 'proxies':
        console.log('获取代理列表');
        fetch('http://localhost:8000/proxies')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            sendResponse(data);
          });
        break;
      case 'add':
        console.log('add'); 
        console.log(message.param); 
        fetch(`http://localhost:8000/add?matched_url=${message.param}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            sendResponse(data);
          });
        break;
      case 'switch':
        console.log('switch'); 
        console.log(message.param); 
        fetch(`http://localhost:8000/switch?proxy_id=${message.param}`)
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
