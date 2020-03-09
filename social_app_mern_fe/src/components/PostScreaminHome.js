import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";
import { uploadPostImage } from "../redux/actions/userActions";

import MyButton from "../util/MyButton";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ImageIcon from "@material-ui/icons/Image";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PublicIcon from "@material-ui/icons/Public";

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
    },
    postImageButton: {
        marginTop: "4px",
        marginRight: "10px"
    },
    publicIcon: {
        marginTop: "16px",
        position: "absolute"
    },
    formControl: {
        marginTop: "12px",
        marginLeft: "26px"
    }
});

class PostScream extends Component {
    state = {
        open: false,
        body: "",
        imageUrl: "false",
        audience: "all",
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        this.setState({
            imageUrl: nextProps.user.post_image
        });
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
        if (this.state.imageUrl) {
            this.props.postScream({
                body: this.state.body,
                imageUrl: this.state.imageUrl,
                audience: this.state.audience
            });
        } else {
            this.props.postScream({
                body: this.state.body,
                audience: this.state.audience
            });
        }
    };
    handleImageChange = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadPostImage(formData);
    };
    handlePostPicture = () => {
        const fileInput = document.getElementById("postImage");
        fileInput.click();
    };
    render() {
        const { errors } = this.state;
        const {
            classes,
            UI: { loading },
            user: {
                credentials: { dept, sem },
                post_image
            }
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
                            <input
                                type="file"
                                id="postImage"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <MyButton
                                tip="Post picture"
                                onClick={this.handlePostPicture}
                                btnClassName={classes.postImageButton}
                            >
                                <ImageIcon color="primary" />
                            </MyButton>
                            <PublicIcon
                                color="primary"
                                className={classes.publicIcon}
                            />
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="audience"
                                    name="audience"
                                    value={this.state.audience}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value={dept}>{dept}</MenuItem>
                                    <MenuItem value={dept + sem}>
                                        {dept + "-" + sem}
                                    </MenuItem>
                                </Select>
                            </FormControl>
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
    uploadPostImage: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI,
    user: state.user
});

const mapActionToProps = { postScream, uploadPostImage };

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(PostScream));
