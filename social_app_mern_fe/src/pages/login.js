import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppIconLight from "../images/bat-login-light.png";
import AppIconDark from "../images/bat-login-dark.png";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = theme => ({
    ...theme.spreadit.login_signup
});

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {
            classes,
            UI: { loading, theme }
        } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Card className={classes.card} raised>
                        <CardContent className={classes.content}>
                            <img
                                className={classes.image}
                                src={
                                    theme === "light"
                                        ? AppIconLight
                                        : AppIconDark
                                }
                                alt="Bat signal"
                            />
                            <Typography
                                variant="h2"
                                className={classes.pageTitle}
                            >
                                Login
                            </Typography>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    className={classes.textField}
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    fullWidth
                                ></TextField>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    className={classes.textField}
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    fullWidth
                                ></TextField>
                                {errors.general && (
                                    <Typography
                                        variant="body2"
                                        className={classes.customError}
                                    >
                                        {errors.general}
                                    </Typography>
                                )}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    disabled={loading}
                                >
                                    Login
                                    {loading && (
                                        <CircularProgress
                                            size={30}
                                            className={classes.progress}
                                        />
                                    )}
                                </Button>
                                <small>
                                    Don't have an account? Sign up{" "}
                                    <Link to="/signup">here</Link>
                                </small>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(login));
