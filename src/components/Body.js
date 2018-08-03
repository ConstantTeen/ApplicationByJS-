import React,{Component} from 'react';
import buttons from '../fixtures'
import ButtonList from "./ButtonList";

class Body extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <ButtonList buttons={buttons}/>
        )
    }
}

export default Body