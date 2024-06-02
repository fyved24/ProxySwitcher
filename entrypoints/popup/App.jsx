import { useState,useEffect } from 'react';
import './App.css';
import { ListItem } from '../../components/ListItem';
import { SwapOutlined,
  PlusOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  SettingOutlined} from '@ant-design/icons';
import { Input,Button,Space } from 'antd';

function App() {
  const [showAddToProxy, setShowAddToProxy] = useState(false);
  const [urlValue, setURLValue] = useState('*.example.com');
  useEffect(() => {
    fillUrlInput();
  });
  function fillUrlInput() {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      const activeTab = tabs[0];
      const url = activeTab.url;
      console.log(url);
      var cutedUrl = getWildcardDomain(url);
      console.log(cutedUrl);
      setURLValue(cutedUrl);
  
    });
  }

  function getWildcardDomain(url) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      
      // 将域名拆分成部分
      const domainParts = hostname.split('.');
      
      // 如果是三级域名，去掉第一个部分（如 cn.bing.com => bing.com）
      if (domainParts.length > 2) {
        domainParts.shift();
      }
      
      // 拼接成通配域名
      const wildcardDomain = `*.${domainParts.join('.')}`;
      return wildcardDomain;
    } catch (e) {
      console.error('Invalid URL:', e);
      return null;
    }
  }
  function handleAddClick() {
    setShowAddToProxy(!showAddToProxy);
  }

  async function submitClicked() {
    console.log(333)
    const res = await browser.runtime.sendMessage('ping');
    console.log(res); // "pong"
    
  }
  return (
    <>
      <ListItem ItemIco={SwapOutlined} text={'直连'}/>
      <ListItem ItemIco={ArrowRightOutlined} text={'Proxy0'}/>
      <ListItem ItemIco={PlusOutlined} onClick={handleAddClick} text={'添加代理'} />
      {showAddToProxy && 
      <Space.Compact
        style={{
          width: '100%',
        }}
      >
        <Input defaultValue='*.example.com' value={urlValue} />
        <Button type="primary" style={{
          width: '20%',
        }} icon={<ArrowUpOutlined />} onClick={submitClicked} /> 
      </Space.Compact>
      }
      <ListItem ItemIco={SettingOutlined} text={'后端设置'}/>
    </>
  );
}

export default App;
