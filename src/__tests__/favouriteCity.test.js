import React from 'react'
import renderer from 'react-test-renderer'
import FavouriteCity from '../components/favouriteCity/FavouriteCity'
import '@babel/polyfill'
import {applyMiddleware, createStore} from "redux";
import reducer from "../store/reducers/reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

let data = {
    "coord": {
        "lon": 30.32,
        "lat": 59.94
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 276.91,
        "pressure": 1016,
        "humidity": 80,
        "temp_min": 276.48,
        "temp_max": 277.15
    },
    "visibility": 10000,
    "wind": {
        "speed": 6,
        "deg": 140
    },
    "clouds": {
        "all": 90
    },
    "dt": 1573626054,
    "sys": {
        "type": 1,
        "id": 8926,
        "country": "RU",
        "sunrise": 1573624204,
        "sunset": 1573652158
    },
    "timezone": 10800,
    "id": 498817,
    "name": "Saint Petersburg",
    "cod": 200
};

let persistedState = [{ name: "moscow"}, {name: "omsk"}];

export const store = createStore(reducer, persistedState, applyMiddleware(thunk));


it('Favourite city rendering',async () => {
    let axios = {
        get: (url, params) => {
            return Promise.resolve({
                data: data
            })
        }
    };

    let component = await renderer.create(
        <Provider store={store}>
            <FavouriteCity axios={axios} name={"omsk"}/>
        </Provider>
    );


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()


});

it('Favourite city rendering loading', () => {
    let axios = {
        get: (url, params) => {
            return Promise.resolve({
                data: data
            })
        }
    };

    let component = renderer.create(
        <Provider store={store}>
            <FavouriteCity axios={axios} name={"omsk"}/>
        </Provider>
    );


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});

it('Favourite city rendering server error', () => {
    let axios = {
        get: (url, params) => {
            return Promise.reject({
                response: {
                    status: 400
                }
            })
        }
    };

    let component = renderer.create(
        <Provider store={store}>
            <FavouriteCity axios={axios} name={"omsk"}/>
        </Provider>
    );


    Promise.resolve(component)
        .then(() => {})
        .then(() => {
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot()
        });
});

it('Favourite city rendering network error', () => {
    let axios = {
        get: (url, params) => {
            return Promise.reject({
                response: null
            })
        }
    };

    let component = renderer.create(
        <Provider store={store}>
            <FavouriteCity axios={axios} name={"omsk"}/>
        </Provider>
    );


    Promise.resolve(component)
        .then(() => {})
        .then(() => {
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot()
        });
});
