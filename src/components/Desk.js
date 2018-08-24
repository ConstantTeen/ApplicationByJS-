import React,{Component} from 'react';

class Desk extends Component{

    constructor(props){
        super(props);

        this.state = {
            initialState: true,
            turn: true,
            curentTimerId: null,
            gameOver: false,
            previousDigitalDesk: [
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
            rootPositionsCoordinates: [],
            victimCoordinates: {
                x: null,
                y: null
            },
            removing: false,
            whiteFiguresAmount: 12,
            blackFiguresAmount: 12
        };

        this.booleanLowerColor = props.checkersColor;
        this.deskSize = "400px";
        this.digitalDeskSize = 400;
        this.styleObject = {
            "border": "3px solid black",
            "margin": "40px",
            "marginLeft": "30%",
            "backgroundImage": "url(https://raw.githubusercontent.com/ConstantTeen/ApplicationByJS-/master/src/pictures/desk.png)"
        };
        this.whiteFigureUrl = "https://pp.userapi.com/c624418/v624418493/3557/82OTqkvWph0.jpg";
        this.blackFigureUrl = "https://pp.userapi.com/c624319/v624319498/28d86/QsHYBjm-Mqw.jpg";
        this.whiteQueenUrl = "https://pp.userapi.com/c841425/v841425901/5f9c1/rDBAizlyMNA.jpg";
        this.blackQueenUrl = "https://pp.userapi.com/c840336/v840336960/527f/rba-IUEPXP4.jpg";

        this.drawTheDesk = drawTheDesk.bind(this);
    }

    componentWillMount(){
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

    setNewTimer(){
        const timer = document.getElementById("timer");
        const previousTimerId = this.state.timeId;

        let minutes = "00";
        let seconds = "00";

        timer.innerHTML = minutes + " : " + seconds;

        let timerId = setInterval(() => {

            seconds++;

            if(seconds >= 60){
                minutes++;
                seconds = 0;
            }

            if(+seconds/10 < 1) seconds = "0" + +seconds;
            if(+minutes/10 < 1) minutes = "0" + +minutes;

            timer.innerHTML = minutes + " : " + seconds;

            },1000);

        // this.setState( () => {
        //     return {curentTimerId: timerId}
        // } );

        this.state.curentTimerId = timerId;
    }

    clearTimer(id){
        clearInterval(id);
    }

    setNewTurn(){

        const turnContainer = document.getElementById("turnContainer");
        const turn = this.state.turn;

        if(turn) turnContainer.innerHTML = "white";
        else turnContainer.innerHTML = "black";

    }

    apdateHistoryBox(digitalX,digitalY){
        let x,y;

        switch (digitalX) {
            case 1:
                x = "a";
                break;
            case 2:
                x = "b";
                break;
            case 3:
                x = "c";
                break;
            case 4:
                x = "d";
                break;
            case 5:
                x = "e";
                break;
            case 6:
                x = "f";
                break;
            case 7:
                x = "g";
                break;
            case 8:
                x = "h";
                break;
            default:
                return 1;
        }

        y = 9 - digitalY;

        const historyBox = document.getElementById("historyBox");

        historyBox.innerHTML+= " " + x + y + " ";
    }

    whatHappend(x,y){
console.log("=========whatHappend===========");
        console.log("x,y",x,y);

        const previousX = this.state.chosenFigure.x;console.log("px",previousX);
        const previousY = this.state.chosenFigure.y;console.log("py",previousY);
        const turn = this.state.turn;console.log("turn",turn);
        const digitalFigureColor = this.state.digitalDesk[x][y]; console.log("color",digitalFigureColor);
        const previousDigitalFigureColor = (previousX === null) ? null : this.state.digitalDesk[previousX][previousY];
        const removing = this.state.removing;console.log("removing",removing);

        if(previousDigitalFigureColor === null){

            this.setNewTurn();
            this.setNewTimer();

            if( this.isTherePosibilityToRemove() ) {

                const rootArray = this.state.rootPositionsCoordinates;
                const dataJSON = JSON.stringify({x: x, y: y});

                for(let i = 0; i < rootArray.length; i++){

                    const rootJSON = JSON.stringify(rootArray[i]);

                    if( rootJSON === dataJSON ) {
                        this.state.chosenFigure.x = x;
                        this.state.chosenFigure.y = y;

                        return "doNothing";
                    }
                }

                return "doNothing";
            }

            if( (turn && ((digitalFigureColor === 1) || (digitalFigureColor === 10)) ) ||
                (!turn && ((digitalFigureColor === 2) || (digitalFigureColor === 20))) ) return "choosing";
            console.log("wrongData");
            return "doNothing";
        }

        const distanceBetweenXs = Math.abs(x - previousX);console.log("absX",distanceBetweenXs);
        const distanceBetweenYs = Math.abs(y - previousY);console.log("absY",distanceBetweenYs);

        if(!removing && (digitalFigureColor !== 0)) {
            console.log("noRemovingButColor!=0");
            console.log("choosing");
            if ((turn && ((digitalFigureColor === 1) || (digitalFigureColor === 10))) ||
                (!turn && ((digitalFigureColor === 2) || (digitalFigureColor === 20)))) return "choosing";
            console.log("wrongData");
            return "doNothing";
        }

        if(!removing && (digitalFigureColor === 0) && (distanceBetweenXs === distanceBetweenYs)) {
            console.log("noRemovingButColor==0");
            if((previousDigitalFigureColor === 10) || (previousDigitalFigureColor === 20)) {
                this.clearTimer(this.state.curentTimerId);

                return "queenReplacing";
            }

            if( (distanceBetweenXs === 1) && (distanceBetweenYs === 1) ){
                console.log("xs==ys");
                console.log("simpleReplacing");
                const signedDistanceBetweenYs = y - previousY;
                const booleanLowerColor = this.booleanLowerColor;
                let isDirectionRight;

                if(booleanLowerColor){
                    if(turn) isDirectionRight = (signedDistanceBetweenYs < 0);
                    else isDirectionRight = (signedDistanceBetweenYs > 0);
                }else{
                    if(turn) isDirectionRight = (signedDistanceBetweenYs > 0);
                    else isDirectionRight = (signedDistanceBetweenYs < 0);
                }

                if(isDirectionRight){
                    this.clearTimer(this.state.curentTimerId);

                    return "simpleReplacing";
                }

            }
            console.log("wrongData");
            return "doNothing";
        }

        if(removing && (digitalFigureColor === 0)){
            console.log("Removing");
            if( (distanceBetweenXs === 2) && (distanceBetweenYs === 2) ){
                console.log("xs==2 and ys==2");
                const middleX = (x + previousX)/2;
                const middleY = (y + previousY)/2;
                const digitalMiddleFigureColor = this.state.digitalDesk[middleX][middleY];

                if( (previousDigitalFigureColor === 1) || (previousDigitalFigureColor === 2) ){

                    if(  ((previousDigitalFigureColor === 1) && ((digitalMiddleFigureColor === 2) || (digitalMiddleFigureColor === 20))) ||
                        ((previousDigitalFigureColor === 2) && ((digitalMiddleFigureColor === 1) || (digitalMiddleFigureColor === 10))) ){

                        this.state.victimCoordinates.x = middleX;
                        this.state.victimCoordinates.y = middleY;
                        this.state.removing = false;
                        this.state.rootPositionsCoordinates = [];

                        return "simpleRemoving";
                    }
                    console.log("wrongData");
                    return "doNothing";

                }else if( (previousDigitalFigureColor === 10) || (previousDigitalFigureColor === 20) ){

                    if(  ((previousDigitalFigureColor === 10) && ((digitalMiddleFigureColor === 2) || (digitalMiddleFigureColor === 20))) ||
                        ((previousDigitalFigureColor === 20) && ((digitalMiddleFigureColor === 1) || (digitalMiddleFigureColor === 10))) ){

                        this.state.victimCoordinates.x = middleX;
                        this.state.victimCoordinates.y = middleY;
                        this.state.removing = false;
                        this.state.rootPositionsCoordinates = [];

                        return "queenRemoving";
                    }
                    console.log("wrongData");
                    return "doNothing";

                }
            }

            if( (distanceBetweenXs === distanceBetweenYs) && ((previousDigitalFigureColor === 10) || (previousDigitalFigureColor === 20)) ){
                console.log("xs == ys and pcolor == 10 or pcolor == 20");
                if( this.isThereOnlyOneForeignFigure(x,y) ) {
                    this.state.removing = false;
                    this.state.rootPositionsCoordinates = [];

                    return "queenRemoving";
                }
                console.log("wrong data");
            }
        }

        return "doNothing";
    }

    isThereOnlyOneForeignFigure(x,y){

        let previousX = this.state.chosenFigure.x;
        let previousY = this.state.chosenFigure.y;

        const distanceBetweenXs = Math.abs(x - previousX);
        const distanceBetweenYs = Math.abs(y - previousY);
        const turn = this.state.turn;

        let i = (x - previousX)/distanceBetweenXs; // i == +-1
        let j = (y - previousY)/distanceBetweenYs; // j == +-1
        let foreignFiguresAmount = 0;

        while( (previousX !== (x - 1)) && (previousY !== (y - 1)) ) {

            previousX += i;
            previousY += j;

            const color = this.state.digitalDesk[previousX][previousY];

            if (color === 0) continue;

            if( (turn && ((color === 2) || (color === 20))) || (!turn && ((color === 1) || (color === 10))) ){
                this.state.victimCoordinates.x = previousX;
                this.state.victimCoordinates.y = previousY;
                foreignFiguresAmount++;
            }
        }

        if(foreignFiguresAmount === 1) return true;

        this.state.victimCoordinates.x = null;
        this.state.victimCoordinates.y = null;

        return false;
    }

    onClickListener(event){

        const x = getCorrectCoordinates.call(this,event).x;
        const y = getCorrectCoordinates.call(this,event).y;
        const whatHappend = this.whatHappend(x,y);

        switch(whatHappend){
            case "choosing":

                this.setState( () => {

                    let obj = {x: x, y: y};

                    return {
                        chosenFigure: obj
                    }
                } );

                break;
            case "simpleReplacing":
                this.replaceTheFigure(x,y,false);
                this.drawTheDesk();

                this.setState((prevState) => {
                    return {turn: !prevState.turn}
                });

                break;
            case "queenReplacing":
                this.replaceTheFigure(x,y,true);
                this.drawTheDesk();

                this.setState((prevState) => {
                    return {turn: !prevState.turn}
                });

                break;
            case "simpleRemoving":
                const chosenX = this.state.chosenFigure.x;
                const chosenY = this.state.chosenFigure.y;
                const victimX = this.state.victimCoordinates.x;
                const victimY = this.state.victimCoordinates.y;

                this.replaceTheFigure(x,y,false);

                let newDesk = this.createClone(this.state.digitalDesk);

                newDesk[victimX][victimY] = 0;

                this.state.digitalDesk = this.createClone(newDesk);
                this.state.chosenFigure.x = null;
                this.state.chosenFigure.y = null;

                this.drawTheDesk();

                this.setState((prevState) => {
                    if(!prevState.turn) return {
                        blackFiguresAmount: prevState.blackFiguresAmount - 1
                    };

                    return {
                        whiteFiguresAmount: prevState.whiteFiguresAmount - 1
                    }
                });

                this.setState((prevState) => {

                    if( (prevState.whiteFiguresAmount === 0) || (prevState.blackFiguresAmount === 0) ){
                        return {
                            gameOver: true
                        }
                    }
                    if(!this.isTherePosibilityToRemove()){

                        this.clearTimer(prevState.curentTimerId);

                        return {
                            turn: !prevState.turn,
                        }
                    }

                });

                break;
            case "queenRemoving":

                const qvictimX = this.state.victimCoordinates.x;
                const qvictimY = this.state.victimCoordinates.y;

                this.replaceTheFigure(x,y,true);

                let qnewDesk = this.createClone(this.state.digitalDesk);

                qnewDesk[qvictimX][qvictimY] = 0;

                this.state.digitalDesk = this.createClone(qnewDesk);
                this.state.chosenFigure.x = null;
                this.state.chosenFigure.y = null;

                this.drawTheDesk();

                this.setState((prevState) => {
                    if(!prevState.turn) return {
                        blackFiguresAmount: prevState.blackFiguresAmount - 1
                    };

                    return {
                        whiteFiguresAmount: prevState.whiteFiguresAmount - 1
                    }
                });

                this.setState((prevState) => {

                    if( (prevState.whiteFiguresAmount === 0) || (prevState.blackFiguresAmount === 0) ){
                        return {
                            gameOver: true
                        }
                    }
                    if(!this.isTherePosibilityToRemove()){

                        this.clearTimer(prevState.curentTimerId);

                        return {
                            turn: !prevState.turn,
                        }
                    }

                });

                break;
            case "doNothing":
                break;
            default:
                alert("Опа F5");
        }

        if(this.state.gameOver){
            const winner = (this.state.whiteFiguresAmount > 0) ? 'white' : 'black';

            alert(`Congratulations! ${winner}\'s won!`);
            window.location = "/";
        }
    }

    checkQueenDiraction(x,y,diraction){

        const turn = this.state.turn;

        let xAdder, yAdder;

        xAdder = ( diraction.split("-")[1] === "right" ) ? 1 : -1;
        yAdder = ( diraction.split("-")[0] === "top" ) ? -1 : 1;

        let curentCell;
        let i,j;

        for(i = x + xAdder,j = y + yAdder; (i >= 1) && (i <= 8) && (j >=1) && (j <= 8); i+= xAdder,j+= yAdder){
            curentCell = this.state.digitalDesk[i][j];

            if(curentCell === 0) continue;
            break;
        }

        if( (i > 1) && (i < 8) && (j > 1) && (j < 8) ){

            if(turn && ( (curentCell === 2) || (curentCell === 20) ) ){

                let nextCell = this.state.digitalDesk[i + xAdder][j + yAdder];

                if(nextCell === 0) return true;

            }else if( !turn && ( (curentCell === 1) || (curentCell === 10) )  ){

                let nextCell = this.state.digitalDesk[i + xAdder][j + yAdder];

                if(nextCell === 0) return true;
            }

        }

        return false;
    }

    isTherePosibilityToRemove(){

        const turn = this.state.turn;

        for(let x = 1; x <= 8; x++){
            for(let y = 1; y <= 8; y++){
                const digitalFigureColor = this.state.digitalDesk[x][y];

                if(turn){
                    if((digitalFigureColor !== 1) && (digitalFigureColor !== 10)) continue;
                }else{
                    if((digitalFigureColor !== 2) && (digitalFigureColor !== 20)) continue;
                }

                if( (digitalFigureColor === 10) || (digitalFigureColor === 20) ){

                    if( this.checkQueenDiraction(x,y,"top-left") ||
                        this.checkQueenDiraction(x,y,"top-right") ||
                        this.checkQueenDiraction(x,y,"bottom-left") ||
                        this.checkQueenDiraction(x,y,"bottom-right") ){

                        this.state.removing = true;
                        this.state.rootPositionsCoordinates.push({
                            x: x,
                            y: y
                        });
                        continue;
                    }

                }else {
                    if(x > 2 && y > 2){

                        const cellColor = this.state.digitalDesk[x-2][y-2];
                        const middleCellColor = this.state.digitalDesk[x-1][y-1];

                        if( (cellColor === 0) && ( (middleCellColor === ((turn) ? 2 : 1) ) ||
                            ( middleCellColor === ((turn) ? 20 : 10) ) ) ) {

                            this.state.removing = true;
                            this.state.rootPositionsCoordinates.push({
                                x: x,
                                y: y
                            });
                        }
                    }

                    if(x < 7 && y > 2){

                        const cellColor = this.state.digitalDesk[x+2][y-2];
                        const middleCellColor = this.state.digitalDesk[x+1][y-1];

                        if( (cellColor === 0) && ( (middleCellColor === ((turn) ? 2 : 1) ) ||
                           ( middleCellColor === ((turn) ? 20 : 10) ) ) ) {

                            this.state.removing = true;
                            this.state.rootPositionsCoordinates.push({
                                x: x,
                                y: y
                            });
                        }
                    }

                    if(x > 2 && y < 7){

                        const cellColor = this.state.digitalDesk[x-2][y+2];
                        const middleCellColor = this.state.digitalDesk[x-1][y+1];

                        if( (cellColor === 0) && ( (middleCellColor === ((turn) ? 2 : 1) ) ||
                            ( middleCellColor === ((turn) ? 20 : 10) ) ) ) {

                            this.state.removing = true;
                            this.state.rootPositionsCoordinates.push({
                                 x: x,
                                 y: y
                            });
                        }
                    }

                    if(x < 7 && y < 7){

                        const cellColor = this.state.digitalDesk[x+2][y+2];console.log(x,y,cellColor);
                        const middleCellColor = this.state.digitalDesk[x+1][y+1];console.log(x,y,middleCellColor);

                        if( (cellColor === 0) && ( (middleCellColor === ((turn) ? 2 : 1) ) ||
                            ( middleCellColor === ((turn) ? 20 : 10) ) ) ) {

                            this.state.removing = true;
                            this.state.rootPositionsCoordinates.push({
                                x: x,
                                y: y
                            });
                        }
                    }
                }
            }
        }

        return this.state.removing;
    }

    createClone(arr){
        return JSON.parse(JSON.stringify(arr));
    }

    replaceTheFigure(newX,newY,isItQueen){

        console.log("newx,newy",newX,newY);
        console.log("queen",isItQueen);

        const previousX = this.state.chosenFigure.x; console.log("px",previousX);
        const previousY = this.state.chosenFigure.y; console.log("py",previousY);
        const lowerColor = this.booleanLowerColor; console.log("lowerColor", lowerColor);

        let color = this.state.turn; console.log("ccolor",color);
        let newDesk = this.createClone(this.state.digitalDesk); console.log("newdesk",newDesk);

        this.state.previousDigitalDesk = this.createClone(newDesk);

        if(isItQueen){

            color = (color) ? 10 : 20;

        }else {
            if( lowerColor ){

                if(color && (newY === 1)) color = 10;
                else if(!color && (newY === 8)) color = 20;
                else color = (color) ? 1 : 2;

            }else{

                if(color && (newY === 8)) color = 10;
                else if(!color && (newY === 1)) color = 20;
                else color = (color) ? 1 : 2;

            }
        }

        console.log("qwe",color);
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
                onChange={this.onChangeListener}
            />
        )

    }
}

export default Desk

function drawTheDesk() {

    for(let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            const cell = this.state.digitalDesk[i][j];
            const previousCell = this.state.previousDigitalDesk[i][j];

            if (cell !== previousCell){
                if (cell === 0) deleteCell.apply(this, [i, j]);
                else if (cell === 1) drawCell.apply(this, [i, j, true,false]);
                else if (cell === 2) drawCell.apply(this, [i, j, false,false]);
                else if (cell === 10) drawCell.apply(this, [i, j, true,true]);
                else if (cell === 20) drawCell.apply(this, [i, j, false,true]);
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

function drawCell(x,y,boolColor,isItQueen){

    const desk = document.getElementById("desk");
    const ctx = desk.getContext('2d');
    const deskSize = this.digitalDeskSize;
    const figureSize = deskSize/8;
    const xpx = figureSize*(x - 1);
    const ypx = figureSize*(y - 1);
    const figure = new Image(figureSize,figureSize);

    let figureUrl = (boolColor) ? this.whiteFigureUrl : this.blackFigureUrl;

    if(boolColor){
        if(isItQueen) figureUrl = this.whiteQueenUrl;
        else figureUrl = this.whiteFigureUrl;
    }else{
        if(isItQueen) figureUrl = this.blackQueenUrl;
        else figureUrl = this.blackFigureUrl;
    }

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
