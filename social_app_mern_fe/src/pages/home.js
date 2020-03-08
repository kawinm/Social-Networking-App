import React, { Component } from "react";

import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Scream from "../components/Scream";
import Profile from "../components/Profile";
import SideBar from "../components/SideBar";
import PostScream from "../components/PostScreaminHome";

import ScreamSkeleton from "../util/ScreamSkeleton";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const styles = theme => ({
    ...theme.spreadit,
    profile: {
        display: "inline-flex",
        height: "fit-content"
    }
});

class home extends Component {
    state = {
        screams: null
    };
    componentDidMount() {
        this.props.getScreams();
    }
    render() {
        const { screams, loading } = this.props.data;
        const {
            classes,
            user: { authenticated }
        } = this.props;
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => (
                <Scream key={scream.screamId} scream={scream} />
            ))
        ) : (
            <ScreamSkeleton />
        );
        return (
            <Grid container>
                <Grid item sm={0} md={3} xs={0}>
                    <SideBar />
                </Grid>
                <Grid item sm={12} md={6} xs={12}>
                    <div className={classes.mainContent}>
                        {authenticated ? <PostScream /> : <br></br>}
                        {recentScreamsMarkup}
                    </div>
                </Grid>
                <Grid className={classes.profile} item sm={12} md={3} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
});

export default connect(mapStateToProps, { getScreams })(
    withStyles(styles)(home)
);
