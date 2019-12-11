import React from 'react'
import Loader from '../loader/Loader';
import Error from "../error/Error";
import Weather from "../weather/Weather";
import "./City.css";
import {connect} from "react-redux";
import {getByCoords} from "../../store/action/actionCreator";

class City extends React.Component {
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

    toResponse(response) {
        this.setState({
            data: response.data,
            loading: false,
            error: false
        })
    }

    toError(error) {
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
    }

    getData() {
        getByCoords({
            lat: this.props.lat,
            lon: this.props.lon
        }, this.toResponse.bind(this), this.toError.bind(this));
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

export default connect(null, {getByCoords})(City);