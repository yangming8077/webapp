/*
   Home 主页
*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Icon from 'base/icon';
import ReadMe from 'base/icon/README.md';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    // test() {
    //     this.props.history.push('/List');
    // }
    render() {
        return (
            <div id="appContainer" className="markdown-body">
            <ReadMe />
            </div>
        );
    }
}

export default withRouter(Home);