import React,{Component} from 'react';
import Button from "./Button";
import {browserHistory} from 'react-router'
import "../styles/ButtonList.css";

class ButtonList extends Component{
    constructor(props){
        super(props);
    }

    onClickEvent(id) {

        switch (id) {
            case ("game-with-random-user"):
                window.location = "/play-area/:1";
                console.log("random");
                break;
            case "single-play":
                window.location = "/play-area/:2";
                console.log("solo");
                break;
            case "game-with-friend":
                window.location = "/play-area/:3";
                console.log("friend");
                break;
            case "training":
                window.location = "/play-area/:4";
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
        const list = this.props.buttons.map(item => (
            <li style={{"list-style-type": "none"}} key={item.buttonId}>
                <Button
                    id={item.buttonId}
                    content={item.buttonContent}
                    clickListener={this.onClickEvent}
                />
            </li>
        ));

        return(
            <ul className="List">
                {list}
            </ul>
        )
    }
}

export default ButtonList