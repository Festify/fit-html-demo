import { connect, withProps } from 'fit-html';
import { html } from 'lit-html/lib/lit-extended';
import { Dispatch } from 'redux';

import { completeTodo, removeTodo } from './actions';
import { Importance, State, TodoItem } from './reducer';

interface TodoViewProps {
    severityIcon: string;
    todo?: TodoItem;
}
interface TodoViewDispatch {
    completeTodo: () => void;
    removeTodo: () => void;
}

interface OwnProps {
    todoid: string;
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

const mapStateToProps = (state: State, ownProps: OwnProps): TodoViewProps => {
    const todo = state.todos.find(td => td.id === ownProps.todoid);
    return {
        severityIcon: getIcon((todo || { importance: Importance.Normal }).importance),
        todo: todo
    };
};
const mapDispatchToProps = (dispatch: Dispatch<State>, ownProps: OwnProps): TodoViewDispatch => ({
    completeTodo: () => dispatch(completeTodo(ownProps.todoid)),
    removeTodo: () => dispatch(removeTodo(ownProps.todoid))
});
const renderer = (props: TodoViewProps & TodoViewDispatch) => html`
    <style>
        span {
            margin-right: 16px;
        }
    </style>

    <span>${(props.todo || { text: '' }).text}</span>
    <span>${props.severityIcon}</span>

    <button on-click="${() => props.completeTodo()}">Complete</button>
    <button on-click="${() => props.removeTodo()}">Discard</button>
`;

const Todo = withProps(connect(
    mapStateToProps,
    mapDispatchToProps,
    renderer,
), {
    todoid: String
});

customElements.define('todo-view', Todo);