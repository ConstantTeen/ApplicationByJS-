import React,{Component} from 'react';
import {render} from 'react-dom';
import Button from "./Button";

class ButtonList extends Component{
    constructor(props){
        super(props);
    }

    onClickEvent(id) {

        switch (id) {
            case ("game-with-random-user"):
                console.log("random");
                break;
            case "single-play":
                console.log("solo");
                break;
            case "game-with-friend":
                console.log("friend");
                break;
            case "training":
                console.log("training");
                break;
            case "rooles":
                alert("щас бы в шашки не уметь играть в 2138");
                break;
            case "textures":
                console.log("textures");
                break;
            default: console.log("error: switch-case construction");
        }
    }

    render(){
        const list = this.props.buttons.map(item =>
        <li key={item.buttonId}><Button id={item.buttonId} content={item.buttonContent} clickListener={this.onClickEvent}/></li>);

        return(
            <ul>
                {list}
            </ul>
        )
    }
}

export default ButtonList