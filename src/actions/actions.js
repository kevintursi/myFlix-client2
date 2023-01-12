export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN"

export const updateMovies = (value) => {
    return {
        type: SET_MOVIES,
        value: value
    };
}

export const setFilter = (value) => {
    return {
        type: SET_FILTER,
        value
    };
}

export const updateUser = (value) => {
    return {
        type: SET_USER,
        value
    };
}

export const updateToken = (value) => {
    return {
        type: SET_TOKEN,
        value
    };
}