import { createProvider } from 'fit-html';
import { Action as Ac, createStore } from 'redux';

export interface Action extends Ac {
    payload: any;
}

export type ValueTypes = 'm' | 'cm' | 'km';

export interface State {
    inputValue: number;
    inputType: ValueTypes;
    outputType: ValueTypes;
}

export const conversion = {
    cm: 1,
    m: 100,
    km: 100000
};

export function reducer(
    state: State = {
        inputValue: 0,
        inputType: 'cm',
        outputType: 'm'
    },
    action: Action
): State {
    switch (action.type) {
        case 'CHANGE_INPUT_VALUE':
            return {
                ...state,
                inputValue: parseFloat(action.payload) * conversion[state.inputType]
            };
        case 'CHANGE_INPUT_TYPE':
            return {
                ...state,
                inputValue: (state.inputValue / conversion[state.inputType]) * conversion[action.payload],
                inputType: action.payload
            };
        case 'CHANGE_OUTPUT_TYPE':
            return {
                ...state,
                outputType: action.payload
            };
        default:
            return state;
    }
}

const Provider = createProvider(createStore(reducer));
customElements.define('redux-provider', Provider as any);