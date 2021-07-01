# React小结：

## Tips
1. 在写React组件时，要思考哪些代码放render(){}内，哪些放render(){}外，
> 对于只需要初始化一次的，可以放render(){}外，对于每次render后可能会改变的，放render(){}内，包括部分函数（使用到了render(){}内变量）
2. "this" is ugly, avoid it!, class too!, only functions in js is the best practice!
3. Context可以搞定一般的组件通信问题
4. 层次感，结构感，去冗余

## Hooks - State & LifeCycle
```javascript
import { useState, useEffects } from 'react';
```
1. useState(xxx) 为当前组件创建一个state
2. useEffects(xxx) 生命周期，在每次render时都会被执行
3. useEffects(xxx, []) 用[]可以让xxx只在第一次被执行，后面不再执行
4. useEffects(xxx => yyy) 返回yyy作为组件被销毁时执行的动作

## Context - 组件通信
```javascript
import { createContext } from 'react';
```
1. 创建上下文
```javascript
/**
 * globals 
 */
export const REPORT = createContext({}); // all capital for context
REPORT.displayName = 'report';  // for dev-tools 
```

2. 使用上下文
```javascript
/**
 * state
 */
const prob = useContext(REPORT).png_res.prob;
```

## 开发环境：
package.json => proxy：设置代理

vscode: 开发和调试
1. 首先启动development serve，默认监听3030端口
```bash
yarn start
```
2. 如果是在wsl下, 需要先使用netsh进行端口映射
3. 配置launch.js, 就可以调试了
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3030/static/mal", // 这里和development server一致
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

## 关于部署
package.json => homepage: where index.html find static files
```javascript
// index.html if homepage = "static/mal", xxx and yyy are generated static files 
<script src="/static/mal/static/xxx.js">
<script src="/static/mal/static/yyy.js">
<link rel="manifest" href="/static/mal/manifest.json" />
<link src="/static/mal/static/xxx.css">
```
```javascript
// package.json
"prebuild": "rm -rf ~/Mal/backend/static/tasks/create/*",
"build": "react-scripts build",
"postbuild": "cp build/index.html ~/Mal/backend/templates/mal/index.html && cp -r build/* ~/Mal/backend/static/mal",
```

## 项目结构风格
src/layouts: wrapper for pages
src/pages：pages with url rules
src/component：reusable components

## FAQ
- Nodemon Error: System limit for number of file watchers reached
> https://stackoverflow.com/questions/53930305/nodemon-error-system-limit-for-number-of-file-watchers-reached