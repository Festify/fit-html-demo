import { connect, withExtended } from 'fit-html';
import { html } from 'lit-html';
import { Dispatch } from 'redux';

import { changeImportance, changeInputText, createTodo } from './actions';
import { State, TodoItem } from './reducer';
import './todo-view';

interface MainViewProps {
    finishedTodos: TodoItem[];
    inputText: string;
    importance: string;
    remainingTodos: TodoItem[];

    addTodo: () => void;
    inputTextChanged: (text: string) => void;
    importanceChanged: (imp: string) => void;
}

const mapStateToProps = (state: State) => ({
    finishedTodos: state.todos.filter(td => td.isCompleted),
    inputText: state.textInput,
    importance: state.importance.toString(),
    remainingTodos: state.todos.filter(td => !td.isCompleted)
});
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    addTodo: () => dispatch(createTodo()),
    inputTextChanged: (text: string) => dispatch(changeInputText(text)),
    importanceChanged: (imp: string) => dispatch(changeImportance(imp))
});
const renderer = (props: MainViewProps) => html`
    <style>
        :host {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 100%;
        }

        header {
            display: flex;
            flex-flow: row nowrap;
            padding: 24px;
        }

        select {
            margin: 0 16px;
        }

        ul {
            margin: 16px;
        }
    </style>

    <header>
        <input type="text"
               on-change="${(ev: Event) => props.inputTextChanged((ev.target as HTMLInputElement).value)}"
               value="${props.inputText}">
        <select on-change="${(ev: Event) => props.importanceChanged((ev.target as HTMLSelectElement).value)}"
                value="${props.importance}">
            <option value="0">Low</option>
            <option value="1">Normal</option>
            <option value="2">High</option>
        </select>
        <button on-click="${props.addTodo}">
            Create
        </button>
    </header>

    <hr/>

    <ul class="remaining-todos">
        ${props.remainingTodos.map(td => html`<li><todo-view todo-id$=${td.id}></todo-view></li>`)}
    </ul>
    <ul class="finished-todos">
        ${props.finishedTodos.map(td => html`<li><todo-view todo-id$=${td.id}></todo-view></li>`)}
    </ul>
`;

const MainView = withExtended(connect(
    mapStateToProps,
    mapDispatchToProps,
    renderer
));

customElements.define('main-view', MainView);