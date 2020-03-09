import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ThemeLight from "./ThemeLight";
import ThemeDark from "./ThemeDark";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import chat from "./pages/chat";
import staffsignup from "./pages/staffsignup";

//MUI
import { MuiThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

//Components
import NavBar from "./components/NavBar";

//Util
import AuthRoute from "./util/AuthRoute";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class Main extends Component {
    render() {
        const {
            UI: { theme }
        } = this.props;
        var themeNow = theme === "light" ? ThemeLight : ThemeDark;
        // we generate a MUI-theme from state's theme object
        const muiTheme = createTheme(themeNow);
        return (
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                <Router>
                    <NavBar />
                    <div class="container">
                        <Switch>
                            <Route exact path="/" component={home} />
                            <Route exact path="/chat" component={chat} />
                            <AuthRoute exact path="/login" component={login} />
                            <AuthRoute
                                exact
                                path="/signup"
                                component={signup}
                            />
                            <AuthRoute
                                exact
                                path="/staffsignup"
                                component={staffsignup}
                            />
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

Main.propTypes = {
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps)(Main);
