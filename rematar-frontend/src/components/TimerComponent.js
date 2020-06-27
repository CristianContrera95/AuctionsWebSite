import React, { Component } from 'react'
import { Alert } from 'reactstrap';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        // let parse_start = this.props.start.split('-')
        // let parse_end = this.props.end.split('-')
        this.state = {
            started: true, // this.props.start > Date.now(),
            days: 0,
            hour: 0, //d.hours,
            minutes: 0, //d.minutes,
            seconds: 0, //d.seconds,
        }
        this.set_hour = this.set_hour.bind(this);
        // this.set_hour();
    }

    set_hour(nextProps) {
        if (typeof nextProps.end_date !== 'undefined' )
            if ( nextProps.end_date !== '' ) {
                let diffDate = Math.abs(nextProps.end_date - new Date(Date.now()))
                let days = Math.ceil(diffDate / (1000 * 60 * 60 * 24));
                let hour = nextProps.end_hour.split(':').map((h) => parseInt(h, 10));

                this.setState(
                    {
                        days: days,
                        hour: hour[0],
                        minutes: hour[1],
                        seconds: hour[2],
                    }
                )
            }
    }

    componentWillReceiveProps(nextProps, nextContent) {
        this.set_hour(nextProps);
        // alert()
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes, hour, days } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hour === 0) {
                        if (days === 0) {
                            clearInterval(this.myInterval)
                            this.setState(
                                {'started': !this.state.started}
                            )
                        } else {
                            this.setState({
                                days: days - 1,
                                hour: 23,
                                minutes: 59,
                                seconds: 59
                            })
                        }
                    } else {
                        this.setState({
                            hour: 23,
                            minutes: 59,
                            seconds: 59
                        })
                    }
                } else {
                    this.setState({
                        minutes: minutes - 1,
                        seconds: 59
                    })
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { days, hour, minutes, seconds } = this.state;
        if (this.props.end_hour !== '')
            console.log(typeof this.props.end_hour)
        return (
            <Alert style={{'background': this.state.started ? "#000000" : "red", color: 'white'}} className="text-center" >
                Tiempo restante:
                { days === 0 && hour === 0 && minutes === 0 && seconds === 0
                    ? <h1>Finalizado!</h1>
                    : <h4 className="text-black mx-0">{days} dias - {hour}:{minutes < 10? `0${minutes}`:minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h4>
                }
            </Alert>
        )
    }
}

/*<Toast className="text-center">
                    <ToastHeader>

                    </ToastHeader>
                    <ToastBody>

                    </ToastBody>
                </Toast>

 */