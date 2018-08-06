import React,{Component} from 'react';

class Desk extends Component{

    constructor(props){
        super(props);

        this.state = {
            initialState: true,
            turn: true,
            gameOver: false,
            digitDesk: [
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]
            ],
            chosenFigure: {},
            lowerColor: true,
            whiteFiguresAmount: 8,
            blackFiguresAmount: 8
        };

        this.checkerColor = props.checkersColor;
        this.deskSize = "400px";
        this.digitDeskSize = 400;
        this.styleObject = {
            "border": "3px solid black",
            "margin": "40px",
            "marginLeft": "30%",
            "backgroundImage": "url(https://cdn.hackaday.io/images/resize/400x400/9307061508560879386.png)"
        };
    }

    componentDidMount(){
        if(this.state.initialState){

            const booleanColor = this.checkerColor;
            const deskSize = this.digitDeskSize;
            const desk = document.getElementById("desk");
            const ctx = desk.getContext('2d');
            const figureSize = deskSize/8;
            const whiteFigure = new Image(figureSize,figureSize);
            const blackFigure = new Image(figureSize,figureSize);

            whiteFigure.src = "https://pp.userapi.com/c624418/v624418493/3557/82OTqkvWph0.jpg";
            blackFigure.src = "https://pp.userapi.com/c624319/v624319498/28d86/QsHYBjm-Mqw.jpg";

            if(booleanColor){

                whiteFigure.onload = () => {
                    for(let i = 0; i < deskSize; i+= 2*figureSize){
                        ctx.drawImage(whiteFigure,i,deskSize - figureSize);
                        ctx.drawImage(whiteFigure,i + figureSize,deskSize - 2*figureSize);
                        ctx.drawImage(whiteFigure,i,deskSize - 3*figureSize);
                    }
                };

                blackFigure.onload = () => {
                    for(let i = 0; i < deskSize; i+= 2*figureSize){
                        ctx.drawImage(blackFigure,i + figureSize,0);
                        ctx.drawImage(blackFigure,i,figureSize);
                        ctx.drawImage(blackFigure,i + figureSize,2*figureSize);
                    }
                };

                this.setState((prevState) => {
                    let newDesk = prevState.digitDesk;

                    for(let i = 1; i <= 8; i+=2){
                        newDesk[i][8] = 1;
                        newDesk[i+1][7] = 1;
                        newDesk[i][6] = 1;
                    }

                    for(let i = 1; i <= 8; i+=2){
                        newDesk[i+1][1] = 2;
                        newDesk[i][2] = 2;
                        newDesk[i+1][3] = 2;
                    }

                    return {digitDesk: newDesk}
                });
            }else{



                blackFigure.onload = () => {
                    for(let i = 0; i < deskSize; i+= 2*figureSize){
                        ctx.drawImage(blackFigure,i,deskSize - figureSize);
                        ctx.drawImage(blackFigure,i + figureSize,deskSize - 2*figureSize);
                        ctx.drawImage(blackFigure,i,deskSize - 3*figureSize);
                    }
                };

                whiteFigure.onload = () => {
                    for(let i = 0; i < deskSize; i+= 2*figureSize){
                        ctx.drawImage(whiteFigure,i + figureSize,0);
                        ctx.drawImage(whiteFigure,i,figureSize);
                        ctx.drawImage(whiteFigure,i + figureSize,2*figureSize);
                    }
                };

                this.setState((prevState) => {
                    let newDesk = prevState.digitDesk;

                    for(let i = 1; i <= 8; i+=2){
                        newDesk[i][8] = 1;
                        newDesk[i+1][7] = 1;
                        newDesk[i][6] = 1;
                    }

                    for(let i = 1; i <= 8; i+=2){
                        newDesk[i+1][1] = 2;
                        newDesk[i][2] = 2;
                        newDesk[i+1][3] = 2;
                    }

                    return {digitDesk: newDesk}
                });
            }

            this.setState((prevState) =>{
               return {initialState: !prevState.initialState};
            });
        }

    }

    onClickListener(event){
    }



    render(){

        return(
            <canvas
                id={"desk"}
                width={this.deskSize}
                height={this.deskSize}
                style={this.styleObject}
                onClick={(event) => {this.onClickListener(event)} }
            />
        )

    }
}

export default Desk