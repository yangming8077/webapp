/*
   Home 主页
*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import List from 'sample/list';
import { Button, Input } from 'base'
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
                <Button />
                <Input />
            </div>
        );
    }
}

export default withRouter(Home);
