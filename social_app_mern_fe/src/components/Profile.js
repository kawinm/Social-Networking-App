import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import EditDetails from "./EditDetails";

import MyButton from "../util/MyButton";

//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const styles = {
    paper: {
        padding: 20,
        margin: "15px 12px",
        width: "100%",
        boxShadow:
            "0px 5px 5px -3px rgba(48,79,254,0.2), 0px 8px 10px 1px rgba(48,79,254,0.14), 0px 3px 14px 2px rgba(48,79,254,0.45)"
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& button": {
                position: "absolute",
                top: "80%",
                left: "70%"
            }
        },
        profile_details: {
            textAlign: "center",
            "& span, svg": {
                verticalAlign: "middle"
            }
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0"
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer"
            }
        }
    },
    buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px"
        }
    },
    image: {
        width: "200px",
        height: "200px",
        margin: "20px auto",
        objectFit: "cover"
    },
    profile_details: {
        textAlign: "center",
        "& span, svg": {
            verticalAlign: "middle"
        }
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& button": {
                position: "absolute",
                top: "80%",
                left: "70%"
            }
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%"
        },
        "& .profile-details": {
            textAlign: "center",
            "& span, svg": {
                verticalAlign: "middle"
            }
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0"
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer"
            }
        }
    },
    buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px"
        }
    }
};

export class Profile extends Component {
    handleImageChange = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };
    handleLogout = () => {
        this.props.logoutUser();
    };
    render() {
        const {
            classes,
            user: {
                credentials: {
                    handle,
                    createdAt,
                    imageUrl,
                    bio,
                    dept,
                    userType,
                    sem
                },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img
                                src={imageUrl}
                                alt="profile"
                                className="profile-image"
                            />
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <MyButton
                                tip="Edit profile picture"
                                onClick={this.handleEditPicture}
                                btnClassName="button"
                            >
                                <EditIcon color="primary" />
                            </MyButton>
                        </div>
                        <hr />
                        <div className={classes.profile_details}>
                            <MuiLink
                                component={Link}
                                to={`/users/${handle}`}
                                color="primary"
                                variant="h5"
                            >
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && (
                                <Typography variant="body2">{bio}</Typography>
                            )}
                            <hr />
                            {dept && (
                                <Fragment>
                                    <LocationOn color="primary" />{" "}
                                    <span>
                                        {dept}
                                        {sem && Math.ceil(sem / 2)}
                                    </span>
                                </Fragment>
                            )}
                            <hr />
                            <CalendarToday color="primary" />
                            <span>
                                Joined {dayjs(createdAt).format("MMM YYYY")}
                            </span>
                        </div>
                        <MyButton
                            tip="Logout"
                            onClick={this.handleLogout}
                            btnClassName="button"
                        >
                            <KeyboardReturn color="primary" />
                        </MyButton>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
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
            )
        ) : (
            <p>Loading... </p>
        );
        return profileMarkup;
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(Profile));
