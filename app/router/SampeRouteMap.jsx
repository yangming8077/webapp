import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect, withRouter,hashHistory } from 'react-router-dom';
// 引入原始的配置模块
import App from 'sample';
import Home from 'sample/home';
// import Button from 'sample/button';
const Root = () => (
    <Switch>
      <Route path="/" render={(props) => (
        <App>
          <Switch>
            {/* <Route path="/" exact component={App} /> */}
            <Route path="/" exact component={Home}/>
            <Route path="/Home" component={Home} />
            {/* <Route path="/Button" component={Button} /> */}
            {/* <Redirect from="/undefined" to={{ pathname: '/', search: '?mold=redirect' }} /> */}
          </Switch>
        </App>
      )} />
      <Route render={() => (<Redirect to="/" />)} />
    </Switch>
);
export default withRouter(Root)

