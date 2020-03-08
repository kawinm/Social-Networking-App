import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
    ...theme.spreadit,
    postButton: {
        float: "right",
        marginTop: "10px"
    },
    postContent: {
        paddingBottom: "16px !important",
        objectFit: "cover",
        width: "100%"
    }
});

class PostScream extends Component {
    state = {
        open: false,
        body: "",
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body });
    };
    render() {
        const { errors } = this.state;
        const {
            classes,
            UI: { loading }
        } = this.props;
        return (
            <Fragment>
                <Card className={classes.card} raised>
                    <CardContent className={classes.postContent}>
                        <form onSubmit={this.handleSubmit}>
                            <Typography className={classes.textField}>
                                Post
                            </Typography>
                            <TextField
                                name="body"
                                type="text"
                                multiline
                                rows="2"
                                placeholder="Whats on your mind??????????? "
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                variant="outlined"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.postButton}
                                disabled={loading}
                            >
                                Post
                                {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.progressSpinner}
                                    />
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postScream })(
    withStyles(styles)(PostScream)
);
