# WXT + React

This template should help get you started developing with React in WXT.
将插件转为safari插件
```bash
xcrun safari-web-extension-converter safari-mv2  --app-name "ProxySwitcher" --macos-only
```
将设置pac文件地址
```bash
sudo networksetup -setautoproxyurl Wi-Fi http://127.0.0.1:4000/rules.pac
```