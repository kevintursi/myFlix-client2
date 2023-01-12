import {
    SET_MOVIES,
    SET_FILTER,
    SET_USER,
    SET_TOKEN
} from "../actions/actions";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_MOVIES:
            return {
                ...state,
                movies: action.value
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.value
            }
        case SET_USER:
            return {
                ...state,
                user: action.value
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.value
            }
        default:
            return state;
    }
}

export default reducer;