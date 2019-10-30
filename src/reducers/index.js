export default (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    name: action.name
                }
            ];
        case 'DELETE':
            let item = state.filter(item => {
                return item.name !== action.name;
            });
            state = item;
            return state;
        default:
            return state;
    }
}