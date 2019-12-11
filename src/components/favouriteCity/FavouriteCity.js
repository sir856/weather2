import React from 'react'
import {deleteCity} from '../../store/action/actionCreator'
import {getByName} from "../../store/action/actionCreator";
import {connect} from 'react-redux';
import Loader from '../loader/Loader';
import Error from "../error/Error";
import Weather from "../weather/Weather"
import './FavouriteCity.css'

class FavouriteCity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
            loadState: props.loadState
        }
    }

    componentDidMount() {
        if (!this.state.loadState) {
            this.getData();
        }

    }

    toResponse(response) {
        this.setState({
            data: response.data,
            loading: false,
        })
    }

    toError(error) {
        let msg = "Проблемы с интернет соединением";
        if (error.response) {
            if (error.response.status === 404) {
                this.props.deleteCity(this.props.name);
                this.props.cityNotFound(this.props.name);
                return
            } else {
                msg = "Проблемы с сервером"
            }
        }

        this.setState({
            data: msg,
            loading: false,
            error: true
        });
    }

    getData() {
        getByName(this.props.name,
            this.toResponse.bind(this),
            this.toError.bind(this));
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
                        <b>{this.props.name}</b>
                        <span className="item-temp">{this.state.data.main.temp + " \u2103"}</span>
                        <img className="item-icon" src={'//openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@2x.png'}
                             alt="img"/>
                        <button className="itemsButton" id={this.props.name} onClick={this.delete.bind(this)}>x</button>
                    </div>
                    <div className="item-entry">
                        <Weather data={this.state.data}/>
                    </div>
                </div>
            );
        }

    }
}

export default connect(null, {deleteCity, getByName})(FavouriteCity);