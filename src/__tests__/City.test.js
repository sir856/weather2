import React from 'react'
import renderer from 'react-test-renderer'
import City from '../components/city/City'
import '@babel/polyfill'

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


it('City rendering',async () => {
    let axios = {
        get: (url, params) => {
            return Promise.resolve({
                data: data
            })
        }
    };

    let component = await renderer.create(
        <City axios={axios} lat={0} lon={0}/>
    );


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()


});

it('City rendering server error',() => {
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
        <City axios={axios} lat={0} lon={0}/>
    );

    Promise.resolve(component)
        .then(() => {

        })
        .then( () => {
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot()
        })


});

it('City rendering not found error',() => {
    let axios = {
        get: (url, params) => {
            return Promise.reject({
                response: {
                    status: 404
                }
            })
        }
    };

    let component = renderer.create(
        <City axios={axios} lat={0} lon={0}/>
    );

    Promise.resolve(component)
        .then(() => {

        })
        .then( () => {
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot()
        })
});

it('City rendering network error',() => {
    let axios = {
        get: (url, params) => {
            return Promise.reject({
                response: null
            })
        }
    };

    let component = renderer.create(
        <City axios={axios} lat={0} lon={0}/>
    );

    Promise.resolve(component)
        .then(() => {

        })
        .then( () => {
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot()
        })


});

it('City rendering loading',() => {
    let axios = {
        get: (url, params) => {
            return Promise.resolve({
                data: data
            })
        }
    };

    let component = renderer.create(
        <City axios={axios} lat={0} lon={0}/>
    );


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()


});