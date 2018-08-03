import React,{Component} from 'react';
import {render} from 'react-dom';

class Button extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const content = this.props.content;
        const buttonId = this.props.id;
        const clickListener = this.props.clickListener;

        return(
            <button onClick={() => clickListener(buttonId)} id={buttonId}>{content}</button>
        )
    }
}

export default Button