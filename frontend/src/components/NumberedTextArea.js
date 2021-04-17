import React from "react";
import {Controlled as CodeMirror} from "react-codemirror2";

export class NumberedTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.options = {
            mode: '',
            theme: 'material',
            lineNumbers: true,
            ...props.options
        }
    }

    handleChange(editor, data, value) {
        this.props.onChange(value);
    }

    render() {
        return (
            <div className={'codewindow'}>
                {this.props.label && <p>{this.props.label}</p>}
                <CodeMirror
                    value={this.props.value}
                    options={this.options}
                    onBeforeChange={this.handleChange}
                />
            </div>);
    }
}