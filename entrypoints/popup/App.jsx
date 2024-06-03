import { useState,useEffect } from 'react';
import './App.css';
import { ListItem } from '../../components/ListItem';
import { SwapOutlined,
  PlusOutlined,
  ArrowRightOutlined,
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
  const [proxyList, setProxyList] =  useState( []);
  
  useEffect(() => {
    const asyncFun = async () => {
      await loadData();
      await fetchProxiesData();
    };
    asyncFun();
    
  }, []);

  useEffect(() => {
    fillUrlInput();
  }, []);
  
  async function loadData() {
    const backendURL = await storage.getItem('local:backendURL');
    console.log('loda local url data');
    if (backendURL) {
      setbackendURLValue(backendURL);
    }
  }
  async function fetchProxiesData() {
    console.log('fetch proxies');
    const res = await browser.runtime.sendMessage('proxies');

    // const newList = [
    //   { name: "直连", type: "", id: 0 },
    //   { name: "Proxy1", type: "", select:1, id: 1 },
    //   { name: "Proxy2", type: "", id: 2 },
    // ];
    setProxyList(res.data);
    console.log(proxyList);
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
      const domainParts = hostname.split('.');
      if (domainParts.length > 2) {
        domainParts.shift();
      }

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
    console.log('设置后端地址');
    console.log(backendURLValue);
    await storage.setItem('local:backendURL', backendURLValue);
  }
  function backendURLChanged(event) {
    const val = event.target.value;
    setbackendURLValue(val);
  }

  function selectProxy(id) {
    console.log(id);
    setProxyList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, select: 1 } : { ...item, select: 0 }
      )
    );
  }
  const proxyItems = proxyList.map(item =>
    <ListItem
      ItemIco={item.id == 0? SwapOutlined: ArrowRightOutlined}
      text={item.name}
      type={item.select == 1 ? 'primary':''}
      key={item.id}
      onClick={()=>{selectProxy(item.id)}}
    />
  );

  return (
    <>
      {proxyItems}
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
