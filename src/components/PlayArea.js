import React,{Component} from 'react';
import Desk from './Desk'
import Error from "./Error";

class PlayArea extends Component{

    constructor(props){
        super(props);
    }

    colorChoice(){
        let checkerColor = prompt("Type the checker color you prefer to play(white/black)","black");

        if(checkerColor === "black"){
            return false;
        }else if(checkerColor === "white"){
            return true;
        }else if(checkerColor !== null){
            alert("There is no such color");
            return this.colorChoice();
        }

        window.location = "/";

    }

    render(){

        const mode = this.props.match.params.mode;

        switch(mode){
            case (':1'):
                return(
                    <div>
                        {/*<Desk/>*/}
                        Will be soon
                    </div>
                );
                break;
            case (':2'):
                return(
                    <div>
                        <Desk checkersColor={this.colorChoice()}/>
                    </div>
                );
                break;
            case ':3':
                return(
                    <div>
                        {/*<Desk/>*/}
                        Will be soon
                    </div>
                );
                break;
            case ':4':
                return(
                    <div>
                        {/*<Desk/>*/}
                        Will be soon
                    </div>
                );
                break;
            default:
                return <Error />
        }
    }
}

export default PlayArea