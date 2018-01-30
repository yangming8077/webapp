### 安装


### 运行命令

### 轮子说明

```js
//CSS样式兼容
"postcss-loader": "^2.0.10",
//PX转换REM
"postcss-px2rem": "^0.3.0",
```

具体见`webpack.config.js`

### 样式


提供样式文件`index.css`，可直接引入或自定义。

---

## 语法介绍

正常的Markdown语法不影响。有几个需要注意的地方：

### 使用示例

#### 纯渲染

::: demo 这是描述这是**描述**，点三角可展开代码。也可以不提供
```jsx
<button onClick={() => alert('dou la mi fa sou')}>click me</button>
```
:::

```
    ::: demo 这是描述这是**描述**，点三角可展开代码
    ```jsx
    <button>adfasdfa</button>
    ```
    :::
```

注意：渲染到页面的代码语言必须写`jsx`，因为loaders会把语言为`jsx`放入render的jsx内

#### 引入其他库

::: demo [react-gm](https://github.com/gmfe/react-gm)的Loading组件
```jsx
```
:::

在md开头添加引入库

```js
---
imports:
    import {Loading} from 'react-gm';
---
```

然后
```
    ::: demo [react-gm](https://github.com/gmfe/react-gm)的日历组件
    ```jsx
    <Loading/>
    ```
    :::
```

#### 更丰富的交互

比如需要 state，需要handleXXX

::: demo 更丰富的交互写在js内，这种场景更多
```js
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'hello'
        };
    }
    handleChange(e){
        this.setState({value: e.target.value});
    }
    render(){
        return (<input value={this.state.value} onChange={::this.handleChange} />)
    }
}
```
```jsx
<Test/>
```
:::

```
    ::: demo 更丰富的交互写在js内，这种场景更多
    ```js
    class Test extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: 'hello'
            };
        }
        handleChange(e){
            this.setState({value: e.target.value});
        }
        render(){
            return (<input value={this.state.value} onChange={::this.handleChange} />)
        }
    }
    ```
    ```jsx
    <Test/>
    ```
    :::
```
### table

Header1 | Header2
------- | -------
cell1 | cell2

### 花括号 (表达式）

有意思的是可以用花括号写表达式，比如我要显示

当前url是：`{location.href}`

userAgent是：`{navigator.userAgent}`

因而你要用花括号时`{'{}'}`需要写成`{'{\'{}\'}'}`

### 代码里面的花括号

`{'{ }'}`会自动转，无需关注

```jsx
<div>{location.href}</div>
```

---

## 参考

- [markdown-it](https://github.com/markdown-it/markdown-it)
- [element](https://github.com/ElemeFE/element)
- [react-markdown-loader](https://github.com/javiercf/react-markdown-loader)

## 其他

### anchor

github page是不支持browserHistory的，一般路由用hash处理。而锚点也是用hash，会冲突。
所以只能自己处理。 监听锚的点击，阻止默认事件，然后用你自己的规则处理吧。

我是这样做的 https://github.com/gmfe/react-gm/blob/master/demo/index.js

### react模块

默认已经`import React from 'react';`
