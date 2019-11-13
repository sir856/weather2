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
            return state.filter(item => {
                return item.name !== action.name;
            });
        default:
            return state;
    }
}