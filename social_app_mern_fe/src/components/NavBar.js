import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import MyButton from "../util/MyButton";

import { connect } from "react-redux";
import store from "../redux/reducers/store";
import { SWITCH_THEME, TOGGLE_DRAWER } from "../redux/reducers/types";

import AppIconLight from "../images/bat-login-light.png";
import AppIconDark from "../images/bat-login-dark.png";

//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

//Icons
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

import PostScream from "./PostScream";

class NavBar extends Component {
    // we change the palette type of the theme in state
    toggleDarkTheme = () => {
        store.dispatch({ type: SWITCH_THEME });
    };

    handleDrawerToggle = () => {
        store.dispatch({ type: TOGGLE_DRAWER });
    };

    render() {
        const {
            authenticated,
            UI: { loading, theme }
        } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <Hidden mdUp>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={this.handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
                            <img
                                width="50px"
                                src={
                                    theme === "light"
                                        ? AppIconDark
                                        : AppIconLight
                                }
                                alt="Bat signal"
                            />

                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="inherit" />
                                </MyButton>
                            </Link>
                            <PostScream />
                            <MyButton tip="Notifications">
                                <Notifications color="inherit" />
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <img
                                width="50px"
                                src={
                                    theme === "light"
                                        ? AppIconDark
                                        : AppIconLight
                                }
                                alt="Bat signal"
                            />
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                            >
                                Signup
                            </Button>
                            {/*<Button color="inherit">
                                <MuiLink
                                    color="inherit"
                                    underline="none"
                                    href="http://www.google.com"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Link
                                </MuiLink>
                            </Button>*/}
                        </Fragment>
                    )}
                    <Button onClick={this.toggleDarkTheme}>Dark</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    UI: state.UI
});

export default connect(mapStateToProps)(NavBar);
