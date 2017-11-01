import { Action as Ac } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State, TodoItem } from './reducer';

export interface Action extends Ac {
    payload?: any;
}

let counter = 0;

export function createTodo(): ThunkAction<void, State, void> {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(changeInputText(''));
        dispatch({
            type: 'CREATE_TODO',
            payload: {
                id: (counter++).toString(),
                importance: state.importance,
                isCompleted: false,
                text: state.textInput
            } as TodoItem
        });
    };
}

export function changeImportance(importance: string): Action {
    return {
        type: 'CHANGE_IMPORTANCE',
        payload: parseInt(importance)
    };
}

export function changeInputText(text: string): Action {
    return {
        type: 'CHANGE_INPUT_TEXT',
        payload: text
    };
}

export function completeTodo(id: string): Action {
    return {
        type: 'COMPLETE_TODO',
        payload: id
    };
}

export function removeTodo(id: string): Action {
    return {
        type: 'REMOVE_TODO',
        payload: id
    };
}