import 'babel-polyfill';
import 'lib-flexible';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,BrowserRouter, Route ,hashHistory} from 'react-router-dom';
//解决移动端300毫秒延迟
var FastClick = require('fastclick')
FastClick.attach(document.body)
// 引入原始的配置模块
import SampeRouteMap from '../router/SampeRouteMap.jsx';
// 封装 render
const mountNode = document.getElementById('app');
const render = (Component) => {
    ReactDOM.render((
        <BrowserRouter history={hashHistory}>
        <Component />
        </BrowserRouter>
    ), mountNode);
};

render(SampeRouteMap);