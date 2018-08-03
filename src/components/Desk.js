import React,{Component} from 'react';

class Desk extends Component{
    render(){
        const styleObject ={
            "width": "400px",
            "height": "200px",
            "border": "3px solid black",
            "margin": "40px"
        };

        return(
            <canvas id="desk" style={styleObject}>

            </canvas>
        )
    }
}

export default Desk