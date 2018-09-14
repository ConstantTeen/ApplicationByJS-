import React,{Component} from 'react';

class HistoryBox extends Component{

    constructor(props){
        super(props);

        this.state = {
            history: ""
        }
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

        this.setState( (prevState) => {
            return {
                historyOfTurns: prevState.historyOfTurns+= x + y + " "
            }
        });

        const historyBox = document.getElementById("historyBox");

        historyBox.innerHTML+= " " + x + y + " ";
    }

    render(){

        return(
            <div className="HistoryBox">{this.state.history}</div>
        )
    }
}

export default Timer