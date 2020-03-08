import { connect } from "react-redux";
import { toggleTodo } from "../../redux/actions/todoListActions";
import TodoList from "./TodoList";
import {
    SHOW_ALL,
    SHOW_ACTIVE,
    SHOW_COMPLETED
} from "../../redux/reducers/types";

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case SHOW_ALL:
            return todos;
        case SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error("Unknown filter: " + filter);
    }
};
const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos.todos, state.todos.filter)
});
const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
