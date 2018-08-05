import React,{Component} from 'react';
import buttons from '../fixtures'
import ButtonList from "./ButtonList";

function Body(props){
    return <ButtonList buttons={buttons}/>
}

export default Body