import React,{Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'
import PlayArea from "./components/PlayArea";

class App extends Component{
    render(){
        return (
            <Router>
                <div>
                    <Route exact path={"/"} component={Header}/>
                    <Route exact path={"/"} component={Body}/>
                    <Route path={"/play-area"} component={PlayArea}/>
                </div>
            </Router>

        )
    }
}

render(<App/>, document.getElementById('root'));
