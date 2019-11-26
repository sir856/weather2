import React from 'react'
import axios from 'axios/index';
import Loader from '../loader/Loader';
import Error from "../error/Error";
import Weather from "../weather/Weather";
import "./City.css";

export default class City extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: true,
                error: false
            });
            this.getData();
        }

    }

    getData() {
        console.log(this.props.lat, this.props.lon);
        axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: this.props.lat,
                lon: this.props.lon,
                lang: "ru",
                units: "metric",
                appid: "3494b8f1c8f596aee028c113d9cf5e78",
                timeout: 1000
            }
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false,
                    error: false
                })
            })
            .catch(error => {
                console.error(error);

                let msg = "Проблемы с интернет соединением";
                if (error.response) {
                    if (error.status === 404) {
                        msg = "Город не найден"
                    } else {
                        msg = "Проблемы с сервером"
                    }
                }

                this.setState({
                    data: msg,
                    loading: false,
                    error: true
                })
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        else {
            if (this.state.error) {
                return (
                    <Error message={this.state.data}/>
                )
            }
            return(
                <div className="weather_here_item" >
                    <div className="about">
                        <b className="name">{this.state.data.name}</b>
                        <span className="temp">{this.state.data.main.temp + " \u2103"}</span>
                        <img className="icon" src={'//openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@2x.png'}
                             alt="img"/>
                    </div>
                    <div className="entry">
                        <Weather data={this.state.data}/>
                    </div>
                </div>
            );
        }

    }
}