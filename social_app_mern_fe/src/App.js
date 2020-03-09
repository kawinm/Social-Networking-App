import React, { Component } from "react";
import "./App.css";

import jwtDecode from "jwt-decode";

//Pages
import Main from "./Main";

//Redux
import { Provider } from "react-redux";
import store from "./redux/reducers/store";

import { SET_AUTHENTICATED } from "./redux/reducers/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import axios from "axios";

axios.defaults.baseURL =
    "https://asia-east2-lets-go-8871b.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

export default App;
