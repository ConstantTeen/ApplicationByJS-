import React from "react"
import Button from "./Button"

function ButtonList({ buttons }) {

    const buttonElements = buttons.map(
        function(button){
            return <li key={button.idOfButton}><Button button={button}/></li>
        }
    )

    return (
        <ul>
            {buttonElements}
        </ul>
    )
}

export default ButtonList