import React,{Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'
import PlayArea from './components/PlayArea';
import Error from './components/Error'

class App extends Component{
    render(){
        return (
            <Router>
                <div>
                    <Route path={"/"} component={Header}/>
                    <Switch>
                        <Route exact path={"/"} component={Body}/>
                        <Route path={"/play-area/:mode"} component={PlayArea}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

render(<App/>, document.getElementById('root'));
