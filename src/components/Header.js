import React,{Component} from 'react';
import "../styles/Header.css";

class Header extends Component{
    render(){
        return(
            <div>
                <h1 className="Title">CCheckers</h1>
                <hr/>
            </div>
        )
    }
}

export default Header