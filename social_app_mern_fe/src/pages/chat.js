import React, { Component } from "react";

import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Scream from "../components/Scream";
import Profile from "../components/Profile";
import SideBar from "../components/SideBar";
import PostScream from "../components/PostScreaminHome";
import Group from "../components/Group";

import ScreamSkeleton from "../util/ScreamSkeleton";

import { connect } from "react-redux";
import { getGroups } from "../redux/actions/userActions";

const styles = theme => ({
    ...theme.spreadit,
    profile: {
        display: "inline-flex",
        height: "fit-content"
    }
});

class GroupList extends Component {
    state = {
        groups: null
    };
    componentDidMount() {
        this.props.getGroups();
    }
    render() {
        const { groups } = this.props.user;
        const { loading } = this.props.UI;
        let recentGroupsMarkup = !loading ? (
            groups.map(group => <Group key={group.groupId} group={group} />)
        ) : (
            <p>abc</p>
        );
        return <div>{recentGroupsMarkup}</div>;
    }
}

GroupList.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getGroups: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data,
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { getGroups })(
    withStyles(styles)(GroupList)
);
