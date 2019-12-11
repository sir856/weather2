import axios from 'axios'

export function getByName(name, then, error) {
    axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: name,
                lang: "ru",
                units: "metric",
                appid: "3494b8f1c8f596aee028c113d9cf5e78"
            }
        }
    )
            .then((response) => {
                then(response);
            })
            .catch((err) => {
                error(err);
            })
}

export function getByCoords(coords, then, error) {
    axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: coords.lat,
                lon: coords.lon,
                lang: "ru",
                units: "metric",
                appid: "3494b8f1c8f596aee028c113d9cf5e78"
            }
        }
    )
        .then((response) => {
            then(response);
        })
        .catch((err) => {
            error(err);
        })

}

export function addCity(name) {
    return (dispatch) => {
        dispatch({
            type: 'ADD',
            name: name
        });
    }
}

export function deleteCity(name) {
    return (dispatch) => {
        dispatch({
            type: 'DELETE',
            name: name
        });
    }
}