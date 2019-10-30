import React from 'react'
import axios from 'axios'
import Handlebars from 'handlebars'

class WeatherHere extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lon: 0
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {

        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));

    }

    error(){
        this.setState({lat: 56, lon: 38});
        this.setData();
    }
    success(position){
        this.setState({lat: position.coords.latitude, lon: position.coords.longitude});
        this.setData();
    }


    setData() {
        axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: this.state.lat,
                lon: this.state.lon,
                lang: "ru",
                units: "metric",
                appid: "0ac7d7dab1b739b93bac5463c7dcb79d"
            }
        })
            .then(response => {
                document.getElementsByClassName("city")[0].innerHTML = response.data.name;
                document.getElementsByClassName("icon")[0].src = '//openweathermap.org/img/wn/' + response.data.weather[0].icon + '@2x.png';
                document.getElementsByClassName("temp")[0].innerHTML = response.data.main.temp + ' &degC';

                let source = document.getElementById("entry-template").innerHTML;
                let template = Handlebars.compile(source);

                document.getElementsByClassName("entry")[0].innerHTML = template(response.data);
            })
            .catch(error => {
                document.getElementsByClassName("weather_here")[0].innerHTML = error.response.data.message;
            });
    }

    render() {
        return (
            <div className="weather_here">
                <button onClick={this.getLocation.bind(this)}>Обновить геолокацию</button>
                <div className="city">Loading...</div>
                <img className="icon" alt="Loading..."/>
                <div className="temp">Loading...</div>
                <div className="entry">Loading...</div>
            </div>
        );
    }
}

export default WeatherHere;

