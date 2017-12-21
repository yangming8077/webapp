/*
   App 应用总容器
*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter,Link } from 'react-router-dom';
import Home from './home';

class App extends Component {
  constructor(props) {
    super(props);
  }
  test() {
    this.props.history.push('/List');
  }
  render() {
    return (
      <div>
        <div>
          <Link to='/Home'>Home</Link>
          <br/>
          <Link to='/Button'>Button</Link>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(App);
