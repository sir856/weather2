import React from 'react'
import {deleteCity} from '../store/action/actionCreator'
import {connect} from 'react-redux';
import axios from 'axios/index';
import Loader from './Loader';
import Error from "./Error";

class FavouriteCity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true
        }
    }

    componentDidMount() {
        axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: this.props.name,
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
                });
            })
            .catch(error => {
                console.error(error);

                let msg = "Проблемы с интернет соединением";
                if (error.response) {
                    if (error.response.status === 404) {
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

    delete() {
        this.props.deleteCity(this.props.name);
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
                    <Error message={this.state.data} delete={this.delete.bind(this)} name={this.props.name}/>
                )
            }
            return(
                <div className="loader" >
                    <div className="header">
                        <b>{this.state.data.name}</b>
                        <span className="item-temp">{this.state.data.main.temp + " \u2103"}</span>
                        <img className="item-icon" src={'//openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@2x.png'}
                             alt="img"/>
                        <button className="itemsButton" id="delete" onClick={this.delete.bind(this)}>x</button>
                    </div>
                    <div className="item-entry">
                        <ul>
                            <li><span>Ветер</span> <em>{this.state.data.wind.speed} м/c</em></li>
                            <li><span>Облачность</span> <em>{this.state.data.weather[0].description}</em></li>
                            <li><span>Давление</span> <em>{this.state.data.main.pressure} гПа</em></li>
                            <li><span>Влажность</span> <em>{this.state.data.main.humidity} %</em></li>
                            <li><span>Координаты</span> <em>[{this.state.data.coord.lon}, {this.state.data.coord.lat}]</em></li>
                        </ul>
                    </div>
                </div>
            );
        }

    }
}

export default connect(null, {deleteCity})(FavouriteCity);