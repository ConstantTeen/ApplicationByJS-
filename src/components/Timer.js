import React,{Component} from 'react';

class Timer extends Component{

    constructor(props){
        super(props);

        this.state = {
            timer: "00:00",
            seconds: 0,
            minutes: 0
        }
    }

    setTimer(){

        let timerId = setInterval( () => {

            let minutes = this.state.minutes;
            let seconds = this.state.seconds;

            seconds++;

            if(seconds === 60){

                this.setState( (prevState) => {
                    return{
                        minutes: ++prevState.minutes,
                        seconds: 0
                    }
                });

                minutes++;
                seconds = 0;
            }else{

                this.setState( (prevState) => {
                    return{
                        seconds: ++prevState.seconds
                    }
                });

            }

            if(seconds < 10){

                if(minutes < 10){

                    this.setState( () => {
                        return{
                            timer: `0${minutes}:0${seconds}`
                        }
                    });

                }else{

                    this.setState( () => {
                        return{
                            timer: `${minutes}:0${seconds}`
                        }
                    });

                }

            }else{

                if(minutes < 10){

                    this.setState(() => {
                        return {
                            timer: `0${minutes}:${seconds}`,
                        }
                    });

                }else{

                    this.setState(() => {
                        return {
                            timer: `${minutes}:${seconds}`,
                            minutes: +minutes,
                            seconds: +seconds
                        }
                    });

                }

            }

            },1000);
    }

    componentWillMount(){
        this.setTimer();
    }

    render(){

        return(
            <div className="Timer">{this.state.timer}</div>
        )
    }
}

export default Timer