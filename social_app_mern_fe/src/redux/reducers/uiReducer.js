import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SWITCH_THEME,
    TOGGLE_DRAWER
} from "./types";

const initialState = {
    loading: false,
    errors: null,
    theme: "light",
    drawer: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case SWITCH_THEME:
            var themenow = state.theme === "light" ? "dark" : "light";
            return {
                ...state,
                theme: themenow
            };
        case TOGGLE_DRAWER:
            var drawernow = state.drawer ? false : true;
            return {
                ...state,
                drawer: drawernow
            };
        default:
            return state;
    }
}
