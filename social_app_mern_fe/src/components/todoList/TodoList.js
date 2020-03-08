import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

import List from "@material-ui/core/List";

const TodoList = ({ todos, toggleTodo }) => (
    <List>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
        ))}
    </List>
);
TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    toggleTodo: PropTypes.func.isRequired
};
export default TodoList;
