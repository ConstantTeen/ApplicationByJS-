import React,{Component} from 'react';

class Desk extends Component{

    setCheckers(color){
        const desk = document.getElementById("desk");
        const ctx = desk.getContext('2d');
        const figure = new Image(50,50);

        figure.src = "https://pp.userapi.com/c624418/v624418493/3557/82OTqkvWph0.jpg";
        figure.onload = () => {
            for(let i = 0; i < 400; i+= 100){
                ctx.drawImage(figure,i,350);
                ctx.drawImage(figure,i + 50,300);
            }
        };

    }

    deskWidth = "400px";
    deskHeight = "400px";

    render(){
        const styleObject = {
            "border": "3px solid black",
            "margin": "40px",
            "marginLeft": "30%",
            "backgroundImage": "url(https://cdn.hackaday.io/images/resize/400x400/9307061508560879386.png)"
        };

        const booleanCheckersColor = this.props.checkersColor;

        return(
            <canvas id="desk" width={this.deskWidth} height={this.deskHeight} style={styleObject} onClick={() => { this.setCheckers(booleanCheckersColor)} }>

            </canvas>
        )
    }
}

export default Desk