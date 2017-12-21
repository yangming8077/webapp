/*
   Home 主页
*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import List from 'sample/list';
import { Button } from 'base'
import ReadMe from '../../../../README.md';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    test() {
        this.props.history.push('/List');
    }
    render() {
        return (
            <div>
                <div>is Home</div>
                <Button type="ghost" size="small" inline>small</Button>
                {/* <Input /> */}
                <div id="appContainer" className="markdown-body"><ReadMe /></div>
            </div>
        );
    }
}

export default withRouter(Home);
