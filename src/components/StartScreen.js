import React, {Component} from "react"
import buttons from "../fixtures"
import ButtonList from "./ButtonList";

class StartScreen extends Component{

    constructor(props){
        super(props)

        this.state = {
            isOpen: true
        }
    }

    render() {
        return this.state.isOpen && (
            <div>
                <h1>Hello World!</h1>
                <ButtonList buttons={buttons}/>
            </div>
        )
    }
}

export default StartScreen