import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import store from "../redux/reducers/store";
import { connect } from "react-redux";
import { TOGGLE_DRAWER } from "../redux/reducers/types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";

import TodoList from "./TodoList";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },

    drawerPaper: {
        width: drawerWidth,
        zIndex: "inherit",
        borderRight: "0px",
        boxShadow:
            "0px 5px 5px -3px rgba(48,79,254,0.2), 0px 8px 10px 1px rgba(48,79,254,0.14), 0px 3px 14px 2px rgba(48,79,254,0.45)"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    expandedPanel: {
        paddingTop: "104px"
    }
});

export class SideBar extends Component {
    handleDrawerToggle = () => {
        store.dispatch({ type: TOGGLE_DRAWER });
    };

    render() {
        const {
            classes,
            UI: { drawer }
        } = this.props;

        const sideBarContent = (
            <Fragment>
                <ExpansionPanel rounded className={classes.expandedPanel}>
                    <ExpansionPanelSummary
                        color="secondary"
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Tools</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        className={classes.expandedPanelContent}
                    >
                        <TodoList />
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails
                        className={classes.expandedPanelContent}
                    >
                        <Button color="inherit">Remainder</Button>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails
                        className={classes.expandedPanelContent}
                    >
                        <Button color="inherit">Timetable</Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.expandedPanelGames}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Games</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        className={classes.expandedPanelContent}
                    >
                        <Button color="inherit">
                            <MuiLink
                                color="inherit"
                                underline="none"
                                href="https://editor.p5js.org/full/Eg3gfZ2_r"
                                target="_blank"
                                rel="noopener"
                            >
                                Trex Runner
                            </MuiLink>
                        </Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Fragment>
        );

        return (
            <Fragment>
                <div className={classes.root}>
                    <nav
                        className={classes.drawer}
                        aria-label="mailbox folders"
                    >
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                variant="temporary"
                                anchor="left"
                                open={drawer}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                ModalProps={{
                                    keepMounted: true // Better open performance on mobile.
                                }}
                            >
                                <Fragment>{sideBarContent} </Fragment>
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                variant="permanent"
                                open
                            >
                                <Fragment>{sideBarContent} </Fragment>
                            </Drawer>
                        </Hidden>
                    </nav>
                </div>
            </Fragment>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps)(withStyles(styles)(SideBar));
