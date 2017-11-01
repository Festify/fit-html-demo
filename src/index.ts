import { connect } from 'fit-html';
import { html } from 'lit-html/lib/lit-extended';
import { Dispatch } from 'redux';

import { conversion, State, ValueTypes } from './reducer';

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
        inputValue: (state.inputValue / conversion[state.inputType]).toString(),
        inputType: state.inputType,
        outputValue: (state.inputValue / conversion[state.outputType]).toString(),
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

    <input type="number" 
           on-change=${(ev: Event) => props.inputValueChanged((ev.target as HTMLInputElement).value)}
           value=${props.inputValue}>
    <select on-change=${(ev: Event) => props.inputTypeChanged((ev.target as HTMLSelectElement).value as ValueTypes)}
            value=${props.inputType}>
        <option value="cm">cm</option>
        <option value="m">m</option>
        <option value="km">km</option>
    </select>
    
    <select on-change=${(ev: Event) => props.outputTypeChanged((ev.target as HTMLSelectElement).value as ValueTypes)}
            value=${props.outputType}>
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