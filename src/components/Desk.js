import React,{Component} from 'react';

class Desk extends Component{

    constructor(props){
        super(props);

        this.state = {
            initialState: true,
            turn: true,
            gameOver: false,
            previousDigitDesk: [
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
            chosenFigure: {
                x: null,
                y: null
            },
            whiteFiguresAmount: 8,
            blackFiguresAmount: 8
        };

        this.booleanLowerColor = props.checkersColor;
        this.deskSize = "400px";
        this.digitDeskSize = 400;
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
            let newDesk = prevState.digitDesk;

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

            return {digitDesk: newDesk};
        } );
    }

    componentDidMount(){
        this.drawTheDesk();
    }

    onClickListener(event){

        const x = getCorrectCoordinates.call(this,event).x;
        const y = getCorrectCoordinates.call(this,event).y;

        if(this.state.chosenFigure.x === null){
            if( (this.state.turn && this.state.digitDesk[x][y] === 1) || (!this.state.turn && this.state.digitDesk[x][y] === 2) ) {
                this.state.chosenFigure.x = x;
                this.state.chosenFigure.y = y;
                // this.setState( { chosenFigure: {x: x, y: y} } ); почему-то не работает
            }
        }else if( (Math.abs(x - this.state.chosenFigure.x) === 1) && (Math.abs(y - this.state.chosenFigure.y) === 1) && this.state.digitDesk[x][y] === 0 ){
                this.replaceTheFigure(x,y);
                this.drawTheDesk();
                this.setState((prevState) => {
                   return {turn: !prevState.turn}
                });
        }

    }

    createClone(arr){
        return JSON.parse(JSON.stringify(arr));
    }

    replaceTheFigure(newX,newY){

        const previousX = this.state.chosenFigure.x;
        const previousY = this.state.chosenFigure.y;

        let color = this.state.turn;
        let newDesk = this.createClone(this.state.digitDesk);

        this.state.previousDigitDesk = this.createClone(newDesk);

        color = (color) ? 1 : 2;
        newDesk[previousX][previousY] = 0;
        newDesk[newX][newY] = color;

        this.state.digitDesk = this.createClone(newDesk);
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
    console.log("drawdesk");
    for(let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const cell = this.state.digitDesk[i][j];
            const previousCell = this.state.previousDigitDesk[i][j];

            if (cell !== previousCell){
                if (cell === 0) deleteCell.apply(this, [i, j]);
                else if (cell === 1) drawCell.apply(this, [i, j, true]);
                else if (cell === 2) drawCell.apply(this, [i, j, false]);
            }
        }
    }

}

function deleteCell(x,y){
    console.log("deletecell");
    const desk = document.getElementById("desk");
    const ctx = desk.getContext('2d');
    const deskSize = this.digitDeskSize;
    const figureSize = deskSize/8;
    const xpx = figureSize*(x - 1);
    const ypx = figureSize*(y - 1);

    ctx.clearRect(xpx,ypx,figureSize,figureSize);
}

function drawCell(x,y,boolColor){

    const desk = document.getElementById("desk");
    const ctx = desk.getContext('2d');
    const deskSize = this.digitDeskSize;
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
    x = Math.floor( x/(this.digitDeskSize/8) ) + 1;
    y = Math.floor( y/(this.digitDeskSize/8) ) + 1;

    return {
        "x": x,
        "y": y
    }

}
