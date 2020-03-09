import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import ThemeLight from "../ThemeLight";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import DeleteScream from "./DeleteScream";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";

const styles = theme => ({
    ...theme.spreadit
});

export class Group extends Component {
    constructor() {
        super();
        this.state = {
            theme: ThemeLight
        };
    }

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            group: { subject, dept, sem, createdBy, groupId, createdAt },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;

        return (
            <Card className={classes.card} raised>
                <CardContent className={classes.content}>
                    <div className={classes.title}>
                        {/*<Avatar
                            alt="Profile Picture"
                            src={userImage}
                            className={classes.image}
                        />*/}
                        <Typography
                            variant="h5"
                            component={Link}
                            //to={`/users/${userHandle}`}
                            color="primary"
                            className={classes.titleContent}
                        >
                            {subject}
                        </Typography>
                        <Typography
                            variant="h5"
                            component={Link}
                            //to={`/users/${userHandle}`}
                            color="primary"
                            className={classes.titleContent}
                        >
                            {dept}
                            {sem}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

Group.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {})(withStyles(styles)(Group));
