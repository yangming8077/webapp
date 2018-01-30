/*
   App 应用总容器
*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import Home from './home';
import './style/index.less';
import './style/markdown.less';
import './style/markdown-skin.less';
class App extends Component {
  constructor(props) {
    super(props);
  }
  test() {
    this.props.history.push('/List');
  }
  render() {
    return (
      <div className="sample-box">
        <div className="sample-box-menu">
          <div className="logo"></div>
          <ul>
            <li><a href="#/cn/quick-start">快速上手</a></li>
            <li><a href="#/cn/theme">主题定制</a></li>
            <li><a href="#/cn/changelog">更新日志</a></li>
            <li><a href="#/cn/recommendation">精选开源组件</a></li>
            <li className="title">基本</li>
            <li className="active"><a href="#/cn/layout">Color 颜色</a></li>
            <li><a href="#/cn/layout">Layout 布局</a></li>
            <li><a href="#/cn/icon">Icon 图标</a></li>
            <li><a href="#/cn/button">Button 按钮</a></li>
            <li><a href="#/cn/hotkeys">Hotkeys 快捷键</a></li>
          </ul>
          <ul>
            <li><Link to='/Home'>快速上手</Link></li>
            <li><Link to='/Home'>Home</Link></li>
            <li><Link to='/Home'>Home</Link></li>
            <li><Link to='/Home'>Home</Link></li>
          </ul>
        </div>
        <div className="sample-box-content">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(App);
