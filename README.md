# mal_ui

## Tips

### 关于代码

1. 在写React组件时，要思考哪些代码放render(){}内，哪些放render(){}外，
> 对于只需要初始化一次的，可以放render(){}外，对于每次render后可能会改变的，放render(){}内，包括部分函数（使用到了render(){}内变量）
> 与显示行为有关的变量最好都用useState, 与组件设置相关的都放在propsComponent里
2. "this" is ugly, avoid it!, class too!, only functions in js is the best practice!
3. Context可以搞定一般的组件通信问题
4. 层次感，结构感，去冗余
5. 通过React Hooks, 组件的stateful logic就完全被useStath和useEffect决定了

### Hooks - State & LifeCycle
> Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

1. Stateful logic 
```javascript
import { useState, useEffects } from 'react';
useState(xxx) 为当前组件创建一个state
useEffects(xxx) 生命周期，在每次render时都会被执行
useEffects(xxx, []) 用[]可以让xxx只在第一次被执行，后面不再执行
useEffects(xxx => yyy) 返回yyy作为组件被销毁时执行的动作
```
2. Route Hooks
```javascript
import { useLocation, useHistory } from 'react';
const location = useLocation() // 当前路由位置(/feature, /task)
const history = useHistory(); history.push("/dashboard") // 用于路由跳转
```

3. useContext
```javascript
export const ReportContext = useContext()
```

其他常用Hooks:
> 有的是状态逻辑相关(eg: useReducer), 有的是路由相关, 有的是生命周期相关, 还有的类似useRef这样帮助我们使用第三方纯js库的

- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue

### Context - 组件通信

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

如果要从子组件中修改Context, 参考:[Updating Context from a Nested Component](https://reactjs.org/docs/context.html#updating-context-from-a-nested-component)

## Development：

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

## Deployment

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

## ARCH

📦src
 ┣ 📂api
 ┣ 📂components
 ┣ 📂layouts
 ┃ ┣ 📜prolayout.css
 ┃ ┗ 📜prolayout.js
 ┣ 📂pages
 ┃ ┣ 📂Dashboard
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Feature
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜BehaviorGraph.js
 ┃ ┃ ┃ ┣ 📜Classification.js
 ┃ ┃ ┃ ┣ 📜Connection.js
 ┃ ┃ ┃ ┣ 📜DynamicFeature.js
 ┃ ┃ ┃ ┣ 📜NetworkFeature.js
 ┃ ┃ ┃ ┣ 📜Signature.css
 ┃ ┃ ┃ ┣ 📜Signature.js
 ┃ ┃ ┃ ┣ 📜Similarity.js
 ┃ ┃ ┃ ┗ 📜StaticFeature.js
 ┃ ┃ ┣ 📜context.js
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┗ 📜index.js
 ┃ ┗ 📂Task
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┗ 📜index.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js

## FAQ

- Nodemon Error: System limit for number of file watchers reached
> https://stackoverflow.com/questions/53930305/nodemon-error-system-limit-for-number-of-file-watchers-reached