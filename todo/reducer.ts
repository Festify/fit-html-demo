import { createProvider } from 'fit-html';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { Action } from './actions';

export const enum Importance {
    Low,
    Normal,
    High
}

export interface TodoItem {
    id: string;
    importance: Importance;
    isCompleted: boolean;
    text: string;
}

export interface State {
    importance: Importance;
    textInput: string;
    todos: TodoItem[];
}

export function reducer(
    state: State = {
        textInput: '',
        importance: Importance.Normal,
        todos: []
    },
    action: Action
): State {
    switch (action.type) {
        case 'CHANGE_INPUT_TEXT':
            return {
                ...state,
                textInput: action.payload
            };
        case 'CHANGE_IMPORTANCE':
            return {
                ...state,
                importance: action.payload
            };
        case 'CREATE_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload
                ]
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter(td => td.id !== action.payload)
            };
        case 'COMPLETE_TODO': {
            const todos = state.todos.slice();
            const idx = todos.findIndex(it => it.id === action.payload);
            todos[idx] = {
                ...(todos[idx]),
                isCompleted: true
            };
            return {
                ...state,
                todos: todos
            };
        }
        default:
            return state;
    }
}

const Provider = createProvider(createStore(
    reducer,
    applyMiddleware(thunk)
));
customElements.define('redux-provider', Provider);