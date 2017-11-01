import { connect, withExtended, withProps } from 'fit-html';
import { html } from 'lit-html/lib/lit-extended';
import { Dispatch } from 'redux';

import { completeTodo, removeTodo } from './actions';
import { Importance, State, TodoItem } from './reducer';

interface TodoViewProps {
    severityIcon: string;
    todo: TodoItem;

    completeTodo: () => void;
    removeTodo: () => void;
}

interface OwnProps {
    todoId: string;
}

function getIcon(importance: Importance): string {
    switch (importance) {
        case Importance.Low:
            return '👇';
        default:
        case Importance.Normal:
            return '✌️';
        case Importance.High:
            return '☝️';
    }
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
    const todo = state.todos.find(td => td.id === ownProps.todoId) || {
        importance: Importance.Normal
    };

    return {
        severityIcon: getIcon(todo.importance),
        todo: todo
    };
};
const mapDispatchToProps = (dispatch: Dispatch<State>, ownProps: OwnProps) => ({
    completeTodo: () => dispatch(completeTodo(ownProps.todoId)),
    removeTodo: () => dispatch(removeTodo(ownProps.todoId))
});
const renderer = (props: TodoViewProps) => html`
    <style>
        span {
            margin-right: 16px;
        }
    </style>

    <span>${props.todo.text}</span>
    <span>${props.severityIcon}</span>
    
    <button on-click="${() => props.completeTodo()}">Complete</button>
    <button on-click="${() => props.removeTodo()}">Discard</button>
`;

const Todo = withProps(withExtended(connect(
    mapStateToProps,
    mapDispatchToProps as any,
    renderer as any
)), {
    todoId: String
});

customElements.define('todo-view', Todo);