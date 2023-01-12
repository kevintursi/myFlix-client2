import { combineReducers, createStore } from "redux";
import reducer from "./reducers/reducers";

const initialState = {
    movies: [],
    filter: '',
    user: null,
    token: null
}

// const mainReducer = combineReducers({
//     reducer: reducer
// });

const store = createStore(reducer, initialState)

export default store;