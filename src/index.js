import React from 'react';
import ReactDOM from 'react-dom';
import WeatherHere from './classes/WeatherHere';
import {store} from './store/store'
import {Provider} from "react-redux";


ReactDOM.render(
    <Provider store={store}>
        <WeatherHere />
    </Provider>,
    document.getElementById('root')
);


