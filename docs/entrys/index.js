import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
/* eslint import/no-webpack-loader-syntax: off */
// 这个地方很重要，主要是公共的模块提出一个js来进行引用
// 但是因为懒加载的原因，被打包到多个需要懒加载的文件中去了
// 这里将他们做一个标记，便于公共依赖提出来，减小打包体积
import marked from 'marked';
import prism from 'prismjs';
import transform from 'babel-standalone';
import Markdown from '../libs/markdown/index.js';
import Canvas from '../libs/markdown/canvas.js';
/* eslint import/no-webpack-loader-syntax: off */

import Router from '../router/Router';

import '../style/base.less';
import '../../app/components/base/index.less';

render(<AppContainer><Router /></AppContainer>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('../router/Router', () => {
    const Router = require('../router/Router').default;
    render(<AppContainer><Router /></AppContainer>, document.getElementById('app'));
  });
}
