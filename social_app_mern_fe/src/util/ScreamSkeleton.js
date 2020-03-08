import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import ThemeLight from "../ThemeLight";
import ThemeDark from "../ThemeDark";

import DefaultProfileImage from "../images/default-profile-image.png";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

const styles = theme => ({
    ...theme.spreadit
});

//TODO like unlike 08.26
export class ScreamSkeleton extends Component {
    constructor() {
        super();
        this.state = {
            theme: ThemeLight
        };
    }

    render() {
        dayjs.extend(relativeTime);
        const { classes } = this.props;

        const content = Array.from({ length: 5 }).map((item, index) => (
            <Card className={classes.card} raised>
                <CardContent className={classes.content}>
                    <div className={classes.title}>
                        <Avatar
                            alt="Remy Sharp"
                            src={DefaultProfileImage}
                            className={classes.image}
                        />
                        <Skeleton
                            className={classes.titleContent}
                            animation="wave"
                            width="25%"
                        />
                    </div>
                    <Skeleton
                        animation="wave"
                        width="75%"
                        style={{ marginBottom: 5 }}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rect"
                        className={classes.square}
                    />
                </CardContent>
            </Card>
        ));
        return <Fragment>{content} </Fragment>;
    }
}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ScreamSkeleton);
