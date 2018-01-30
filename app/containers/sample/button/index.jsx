/*
   Icon 示例
*/
import React, { Component } from 'react';
import Icon from 'base/icon';
class Icon extends Component {
    constructor(props) {
        super(props);
    }
    // test() {
    //     this.props.history.push('/List');
    // }
    render() {
        return (
            <div id="appContainer" className="markdown-body">111
            <Icon type="search" />
            </div>
        );
    }
}

export default withRouter(Home);