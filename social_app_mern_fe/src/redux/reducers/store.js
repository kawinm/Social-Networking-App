import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import dataReducer from "./dataReducer";
import todoListReducer from "./todoListReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer,
    todos: todoListReducer
});

const composeSetup =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const store = createStore(
    reducers,
    initialState,
    composeSetup(applyMiddleware(...middleware))
);

export default store;
