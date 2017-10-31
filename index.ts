import { connect, createProvider } from 'fit-html';
import { html } from 'lit-html/lib/lit-extended';
import { Action as Ac, createStore, Dispatch } from 'redux';

interface Action extends Ac {
    payload: any;
}

type ValueTypes = 'm' | 'cm' | 'km';

interface State {
    inputValue: string;
    inputType: ValueTypes;
    outputType: ValueTypes;
}

const conversion = {
    cm: 1,
    m: 100,
    km: 100000
};

function reducer(
    state: State = {
        inputValue: '',
        inputType: 'cm',
        outputType: 'm'
    },
    action: Action
): State {
    switch (action.type) {
        case 'CHANGE_INPUT_VALUE':
            return {
                ...state,
                inputValue: (parseFloat(action.payload) / conversion[state.inputType]) + ''
            };
        case 'CHANGE_INPUT_TYPE':
            return {
                ...state,
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

const store = createStore(reducer);

interface ViewProps {
    inputValue: string;
    inputType: ValueTypes;
    outputValue: string;
    outputType: ValueTypes;

    inputValueChanged: (val: string) => void;
    inputTypeChanged: (val: ValueTypes) => void;
    outputTypeChanged: (val: ValueTypes) => void;
}

const mapStateToProps = (state: State) => {
    return {
        inputValue: state.inputValue,
        inputType: state.inputType,
        outputValue: parseFloat(state.inputValue) * conversion[state.outputType] + '',
        outputType: state.outputType
    };
};
const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    inputValueChanged: (val: string) => dispatch({ type: 'CHANGE_INPUT_VALUE', payload: val }),
    inputTypeChanged: (ty: string) => dispatch({ type: 'CHANGE_INPUT_TYPE', payload: ty }),
    outputTypeChanged: (ty: string) => dispatch({ type: 'CHANGE_OUTPUT_TYPE', payload: ty })
});
const renderer = (props: ViewProps) => html`
    <style>
        :host {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            
            width: 100%;
            height: 100%;
        }
    </style>

    <input type="number" on-change=${(ev: Event) => props.inputValueChanged((ev.target as HTMLInputElement).value)}>
    <select on-change=${(ev: Event) => props.inputTypeChanged((ev.target as HTMLSelectElement).value as ValueTypes)}>
        <option value="cm">cm</option>
        <option value="m">m</option>
        <option value="km">km</option>
    </select>
    
    <select on-change=${(ev: Event) => props.outputTypeChanged((ev.target as HTMLSelectElement).value as ValueTypes)}>
        <option value="cm">cm</option>
        <option value="m">m</option>
        <option value="km">km</option>
    </select>
    <input type="number" value=${props.outputValue}>
`;

const View = connect(
    mapStateToProps,
    mapDispatchToProps as any,
    renderer as any
);

customElements.define('main-view', View as any);