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
import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = theme => ({
    ...theme.spreadit.login_signup
});

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmpassword: "",
            handle: "",
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
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword,
            handle: this.state.handle,
            type: "staff"
        };
        this.props.signupUser(newUserData, this.props.history);
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
                <Grid item sm></Grid>
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
                                Staff Signup
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
                                <TextField
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type="password"
                                    label="Confirm Password"
                                    className={classes.textField}
                                    helperText={errors.confirmpassword}
                                    error={
                                        errors.confirmpassword ? true : false
                                    }
                                    value={this.state.confirmpassword}
                                    onChange={this.handleChange}
                                    fullWidth
                                ></TextField>
                                <TextField
                                    id="handle"
                                    name="handle"
                                    type="text"
                                    label="Username"
                                    className={classes.textField}
                                    helperText={errors.handle}
                                    error={errors.handle ? true : false}
                                    value={this.state.handle}
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
                                    Signup
                                    {loading && (
                                        <CircularProgress
                                            size={30}
                                            className={classes.progress}
                                        />
                                    )}
                                </Button>
                                <small>
                                    Already have an account? Login{" "}
                                    <Link to="/login">here</Link>
                                </small>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm>
                    <Paper className={classes.paper}>
                        <Typography variant="body2" align="center">
                            No profile found, please login
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link}
                                to="/signup"
                            >
                                Signup
                            </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    signupUser
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(signup));
