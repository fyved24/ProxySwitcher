import { useState,useEffect } from 'react';
import './App.css';
import { ListItem } from '../../components/ListItem';
import { SwapOutlined,
  PlusOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  SettingOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { Input,Button,Space } from 'antd';
import { storage } from 'wxt/storage';

function App() {
  const [showAddToProxy, setShowAddToProxy] = useState(false);
  const [urlValue, setURLValue] = useState('*.example.com');
  const [showBackendSetting, setShowBackendSetting] = useState(false);
  const [backendURLValue, setbackendURLValue] = useState('http://127.0.0.1:8000');
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    fillUrlInput();
  }, []);

  useEffect(() => {
    console.log('backendURLValue changed:', backendURLValue);
  }, [backendURLValue]);
  
  async function loadData() {
    console.log('loadData');
    const backendURL = await storage.getItem('local:backendURL');
    console.log(backendURL);
    if (backendURL) {
      setbackendURLValue(backendURL);
    }
  }
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
  async function submitClicked() {
    console.log(333)
    const res = await browser.runtime.sendMessage('ping');
    console.log(res); // "pong"
    
  }
  async function settingBackendClicked() {
    console.log(backendURLValue);
    await storage.setItem('local:backendURL', backendURLValue);
  }
  function backendURLChanged(event) {
    console.log('backendURLChanged');
    const val = event.target.value;
    setbackendURLValue(val);
    console.log(val);
    console.log(backendURLValue);
    

  }

  return (
    <>
      <ListItem ItemIco={SwapOutlined} text={'直连'}/>
      <ListItem ItemIco={ArrowRightOutlined} text={'Proxy0'}/>
      <ListItem ItemIco={PlusOutlined} onClick={()=>{setShowAddToProxy(!showAddToProxy)}} text={'添加代理'} />
      {showAddToProxy && 
      <Space.Compact
        style={{
          width: '100%',
        }}
      >
        <Input defaultValue={urlValue} />
        <Button type="primary" style={{
          width: '20%',
        }} icon={<PlusOutlined />} onClick={submitClicked} /> 
      </Space.Compact>
      }
      <ListItem ItemIco={SettingOutlined} text={'后端设置'} onClick={()=>{setShowBackendSetting(!showBackendSetting)}}/>
      {showBackendSetting && 
      <Space.Compact
        style={{
          width: '100%',
        }}
      >
        <Input defaultValue={backendURLValue} onChange={backendURLChanged} />
        <Button type="primary" style={{
          width: '20%',
        }} icon={ <CheckOutlined />} onClick={settingBackendClicked} /> 
      </Space.Compact>
      }
    </>
  );
}

export default App;
