import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import MyButton from "../util/MyButton";

import AddTodo from "./todoList/AddTodo";
import VisibleTodoList from "./todoList/VisibleTodoList";
import Footer from "./todoList/Footer";

//Redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
    ...theme.spreadit
});

class TodoList extends Component {
    state = {
        bio: "",
        dept: "",
        sem: "",
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    mapUserDetailsToState = credentials => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            dept: credentials.dept ? credentials.dept : "",
            sem: credentials.sem ? credentials.sem : ""
        });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            dept: this.state.dept,
            sem: this.state.sem
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton
                    tip="Edit details"
                    onClick={this.handleOpen}
                    btnClassName="editProfileButton"
                >
                    <Button color="inherit">Todo-list</Button>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle> Todo List </DialogTitle>
                    <DialogContent>
                        <AddTodo />
                        <VisibleTodoList />
                        <Footer />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="secondary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

TodoList.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(
    withStyles(styles)(TodoList)
);
