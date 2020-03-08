import React from "react";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const Todo = ({ onClick, completed, text }) => (
    <ListItem key={text} role={undefined} dense button onClick={onClick}>
        <ListItemIcon>
            <Checkbox
                edge="start"
                checked={completed}
                tabIndex={-1}
                disableRipple
            />
        </ListItemIcon>
        <ListItemText id={text} primary={text} />
    </ListItem>
    //style={{
    //textDecoration: completed ? "line-through" : "none"
    //}}
);
Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};
export default Todo;
