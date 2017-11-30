import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'base/button';
import Input from 'base/input';
import '../style/index.less';
class App extends React.Component{
    constructor() {
        super();
    }
    render() {
        //JSX here!
        return (
          <div className="container">
            <section className="jumbotron">
              <h3 className="jumbotron-heading">2Search Github Users</h3>
              <Button/>111
              <Input />
            </section>
          </div>
        )
    }
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);