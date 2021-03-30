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
