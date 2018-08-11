import React,{Component} from 'react';

class Desk extends Component{

    constructor(props){
        super(props);

        this.state = {
            initialState: true,
            turn: true,
            gameOver: false,
            previousdigitalDesk: [
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
            digitalDesk: [
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
            chosenFigure: {
                x: null,
                y: null
            },
            whiteFiguresAmount: 8,
            blackFiguresAmount: 8
        };

        this.booleanLowerColor = props.checkersColor;
        this.deskSize = "400px";
        this.digitalDeskSize = 400;
        this.styleObject = {
            "border": "3px solid black",
            "margin": "40px",
            "marginLeft": "30%",
            "backgroundImage": "url(https://cdn.hackaday.io/images/resize/400x400/9307061508560879386.png)"
        };
        this.whiteFigureUrl = "https://pp.userapi.com/c624418/v624418493/3557/82OTqkvWph0.jpg";
        this.blackFigureUrl = "https://pp.userapi.com/c624319/v624319498/28d86/QsHYBjm-Mqw.jpg";

        this.drawTheDesk = drawTheDesk.bind(this);
    }

    componentWillMount(){console.log("init");
        if(!this.state.initialState) return;

        this.setState({
            initialState: false
        });

        this.setState( (prevState, props) => {
            const color = props.checkersColor;
            let newDesk = prevState.digitalDesk;

            if(color){
                for(let i = 1; i <= 8;i+= 2){
                    newDesk[i][8] = 1;
                    newDesk[i+1][7] = 1;
                    newDesk[i][6] = 1;

                    newDesk[9-i][1] = 2;
                    newDesk[i][2] = 2;
                    newDesk[9-i][3] = 2
                }
            }
            else{
                for(let i = 1; i <= 8;i+= 2){
                    newDesk[i][8] = 2;
                    newDesk[i+1][7] = 2;
                    newDesk[i][6] = 2;

                    newDesk[9-i][1] = 1;
                    newDesk[i][2] = 1;
                    newDesk[9-i][3] = 1;
                }
            }

            return {digitalDesk: newDesk};
        } );
    }

    componentDidMount(){
        this.drawTheDesk();
    }

    whatHappend(x,y){

        const previousX = this.state.chosenFigure.x;
        const previousY = this.state.chosenFigure.y;
        const turn = this.state.turn;
        const digitalFigureColor = this.state.digitalDesk[x][y];
        const previousDigitalFigureColor = (previousX === null) ? null : this.state.digitalDesk[previousX][previousY];

        if(previousDigitalFigureColor === null){
            if( (turn && (digitalFigureColor === 1)) || (!turn && (digitalFigureColor === 2)) )return 1;
            else return 0;
        }
        if(previousDigitalFigureColor === digitalFigureColor) return 1;

        const distanceBetweenXs = Math.abs(x - previousX);
        const distanceBetweenYs = Math.abs(y - previousY);

        if( (distanceBetweenXs === 1) && (distanceBetweenYs === 1) ){
            if(digitalFigureColor === 0) return 2;
            else if(digitalFigureColor === ((turn) ? 1 : 2) ) return 1;

            return 0;
        }

        const middleX = (x + previousX)/2;
        const middleY = (y + previousY)/2;
        const digitalMiddleFigureColor = this.state.digitalDesk[middleX][middleY];

        if( (distanceBetweenXs === 2) && (distanceBetweenYs === 2) && (digitalFigureColor === 0) && (digitalMiddleFigureColor === (turn) ? 2 : 1 ) ) return 3;

        return 0;
    }

    onClickListener(event){

        const x = getCorrectCoordinates.call(this,event).x;
        const y = getCorrectCoordinates.call(this,event).y;
        const whatHappend = this.whatHappend(x,y);

        switch(whatHappend){
            case 1:
                this.state.chosenFigure.x = x;
                this.state.chosenFigure.y = y;
            // this.setState( { chosenFigure: {x: x, y: y} } ); почему-то не работает
                break;
            case 2:
                this.replaceTheFigure(x,y);
                this.drawTheDesk();

                this.setState((prevState) => {
                    return {turn: !prevState.turn}
                });

                break;
            case 3:
                const chosenX = this.state.chosenFigure.x;
                const chosenY = this.state.chosenFigure.y;
                const middleX = (x + chosenX)/2;
                const middleY = (y + chosenY)/2;

                this.replaceTheFigure(x,y);

                let newDesk = this.createClone(this.state.digitalDesk);

                newDesk[middleX][middleY] = 0;

                this.state.digitalDesk = this.createClone(newDesk);
                this.state.chosenFigure.x = null;
                this.state.chosenFigure.y = null;

                this.drawTheDesk();

                this.setState((prevState) => {
                    return {turn: !prevState.turn}
                });

                break;
            case 0:
                return;
                break;
            default:
                alert("Опа F5");
        }

    }

    createClone(arr){
        return JSON.parse(JSON.stringify(arr));
    }

    replaceTheFigure(newX,newY){

        const previousX = this.state.chosenFigure.x;
        const previousY = this.state.chosenFigure.y;

        let color = this.state.turn;
        let newDesk = this.createClone(this.state.digitalDesk);

        this.state.previousdigitalDesk = this.createClone(newDesk);

        color = (color) ? 1 : 2;
        newDesk[previousX][previousY] = 0;
        newDesk[newX][newY] = color;

        this.state.digitalDesk = this.createClone(newDesk);
        this.state.chosenFigure.x = null;
        this.state.chosenFigure.y = null;

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

function drawTheDesk() {

    for(let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const cell = this.state.digitalDesk[i][j];
            const previousCell = this.state.previousdigitalDesk[i][j];

            if (cell !== previousCell){
                if (cell === 0) deleteCell.apply(this, [i, j]);
                else if (cell === 1) drawCell.apply(this, [i, j, true]);
                else if (cell === 2) drawCell.apply(this, [i, j, false]);
            }
        }
    }

}

function deleteCell(x,y){

    const desk = document.getElementById("desk");
    const ctx = desk.getContext('2d');
    const deskSize = this.digitalDeskSize;
    const figureSize = deskSize/8;
    const xpx = figureSize*(x - 1);
    const ypx = figureSize*(y - 1);

    ctx.clearRect(xpx,ypx,figureSize,figureSize);
}

function drawCell(x,y,boolColor){

    const desk = document.getElementById("desk");
    const ctx = desk.getContext('2d');
    const deskSize = this.digitalDeskSize;
    const figureSize = deskSize/8;
    const xpx = figureSize*(x - 1);
    const ypx = figureSize*(y - 1);
    const figureUrl = (boolColor) ? this.whiteFigureUrl : this.blackFigureUrl;
    const figure = new Image(figureSize,figureSize);

    figure.src = figureUrl;
    figure.onload = () => {
        ctx.drawImage(figure,xpx,ypx);
    };

}

function getCorrectCoordinates(event){

    let x,y;
    let canvas = document.getElementById("desk");

    if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
    }
    else {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    x = Math.floor( x/(this.digitalDeskSize/8) ) + 1;
    y = Math.floor( y/(this.digitalDeskSize/8) ) + 1;

    return {
        "x": x,
        "y": y
    }

}
