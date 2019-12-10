import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import WeatherHere from './components/weatherHere/WeatherHere'
import {store} from './store/store'
import {Provider} from "react-redux"


ReactDOM.render(
    <Provider store={store}>
        <WeatherHere axios={axios} navigator={navigator} />
    </Provider>,
    document.getElementById('root')
);


