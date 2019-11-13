
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