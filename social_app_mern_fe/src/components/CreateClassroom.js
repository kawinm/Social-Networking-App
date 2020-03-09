import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createClassroom } from "../redux/actions/userActions";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
    ...theme.spreadit
});

class CreateClassroom extends Component {
    state = {
        subject: "",
        dept: "",
        sem: "",
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const classDetails = {
            subject: this.state.subject,
            dept: this.state.dept,
            sem: this.state.sem
        };
        this.props.createClassroom(classDetails);
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Button
                    variant="contained"
                    onClick={this.handleOpen}
                    color="secondary"
                >
                    Create Classroom
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle> Edit your details </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="subject"
                                type="text"
                                label="Subject"
                                multiline
                                rows="2"
                                placeholder="Subject"
                                className={classes.textField}
                                value={this.state.subject}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            <TextField
                                name="dept"
                                type="text"
                                label="Department"
                                className={classes.textField}
                                value={this.state.dept}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="sem"
                                type="text"
                                label="Semester"
                                className={classes.textField}
                                value={this.state.sem}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
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

CreateClassroom.propTypes = {
    createClassroom: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { createClassroom })(
    withStyles(styles)(CreateClassroom)
);
