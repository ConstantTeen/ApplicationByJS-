import React, {Component} from "react"

class Button extends Component{

    constructor(props){
        super(props)
        this.handleClick = handleClick.bind(this);
    }

    render(){
        const name = this.props.button.name

        console.log(name)
        return(
            <button onClick={this.handleClick}>{name}</button>
        )
    }
}

function handleClick(){
    // do nothing
}

export default Button