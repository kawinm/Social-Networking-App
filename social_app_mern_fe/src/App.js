import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import PropTypes from "prop-types";

import jwtDecode from "jwt-decode";

import ThemeLight from "./ThemeLight";
import ThemeDark from "./ThemeDark";
import Scream from "./components/Scream";

//MUI
import { MuiThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

//Components
import NavBar from "./components/NavBar";

//Util
import AuthRoute from "./util/AuthRoute";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Main from "./Main";

//Redux
import { Provider, connect } from "react-redux";
import store from "./redux/reducers/store";

import { SET_AUTHENTICATED } from "./redux/reducers/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import axios from "axios";

axios.defaults.baseURL =
    "https://asia-east2-lets-go-8871b.cloudfunctions.net/api";

let theme = createTheme(ThemeLight);

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

const MyContext = React.createContext();

class App extends Component {
    render() {
        // we generate a MUI-theme from state's theme object
        const muiTheme = createTheme(ThemeDark);
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

export default App;
