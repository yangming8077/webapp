import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { HashRouter, Switch, Route,Redirect,withRouter } from 'react-router-dom';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 性能优化 （当数据重复时不做DOM渲染）
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    test() {
        this.props.history.push('/Home');
    }
    render() {
        return (
            <div>
                <div onClick={this.test.bind(this)}>is List</div>
            </div>
        );
    }
}
export default withRouter(List);

