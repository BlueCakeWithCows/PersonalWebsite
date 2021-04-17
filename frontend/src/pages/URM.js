import React from "react";
import {Button, Col, Jumbotron, Row} from "react-bootstrap";
import {Navigation} from "../components/Navigation";
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import {NumberedTextArea} from "../components/NumberedTextArea";

const CODE_DEFAULT = 'J(2,3,0)\n' +
    'S(1)        May comment anywhere.\n' +
    'S(3)        Line numbers are optional.\n' +
    '-           Lines starting with dash are skipped. \n' +
    '  J( 1,1,1) Spaces are ignored.'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }


    render() {
        return (
            <div className='codewindow'>
                <p>Initial Registers</p>
                <input className='codewindow' type="text" value={this.props.value} onChange={this.handleChange}/>
            </div>
        );
    }
}

class StopAfter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className='codewindow'>
                Stop after <input style={{width: '50px'}} type="text" value={this.props.value}
                                  onChange={this.handleChange}/> instructions (Max 99999).
            </div>
        );
    }
}

export class URM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {code: CODE_DEFAULT, output: '', registers: '3,5', maxInstructions: '1000'};
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.handleMaxInstructionsChange = this.handleMaxInstructionsChange.bind(this);

        this.handleRegisterChange = this.handleRegisterChange.bind(this);

    }

    handleCodeChange(v) {
        this.setState({code: v});
    }

    handleRegisterChange(v) {
        this.setState({registers: v});
    }

    handleMaxInstructionsChange(v) {
        let val = +v || -1;
        val = String(Math.max(0, Math.min(val, 99999)));
        this.setState({maxInstructions: val});
    }

    render() {
        return (
            <div className="App">
                <Navigation/>
                <Row>
                    <Col></Col>
                    <Col className={'color-grey text-left col-md-4 pl-5'}>
                        <NumberedTextArea label='Code' value={this.state.code} onChange={this.handleCodeChange}/>
                        <RegisterForm value={this.state.registers}
                                      onChange={this.handleRegisterChange}></RegisterForm>
                        <StopAfter value={this.state.maxInstructions}
                                   onChange={this.handleMaxInstructionsChange}/>
                        <Button variant="success" onClick={this.handleRun}>Run</Button>{' '}
                    </Col>
                    <Col className={'color-grey text-left pr-3 col-md-4 pr-5'}>
                        <NumberedTextArea label='Output' value={this.state.output} options={{readOnly: true,}}/>
                    </Col>
                    <Col></Col>

                </Row>
                <Row>
                    <Col></Col>
                    <Col className={"color-grey text-center col-md-8"}>
                        <Jumbotron className={'display-inline text-left color-grey m-5'}>
                            {CODE_DESCRIPTION}
                        </Jumbotron>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        );
    }

    _convert_to_registers(raw_registers) {
        let registers = new Map()
        for (const [index, element] of (raw_registers?.split(',').map((x) => +(x.trim())) || []).entries()) {
            registers.set(index + 1, element)
        }
        return registers;
    }

    _convert_to_instructions(raw_code) {
        let lines = raw_code.split('\n')
        let program = []
        for (const [, element] of lines.entries()) {
            let stripped = element.trim()
            if (stripped.length === 0 || stripped[0] === '-') {
                program.push([this._CODE_MAPPINGS['-']])
            } else {
                let [instruction, args, ] = stripped.split(/[()]/);
                let split_args = args.split(',').map((x) => +(x.trim()));
                program.push([this._CODE_MAPPINGS[instruction], ...split_args])
            }
        }
        return program
    }

    //Internally, 0 is NOP, 1 is Zero, 2 is S, 3 is T, 4 is Jump

    async _execute(program, registers = new Map(), maxCounter = 1000) {
        let index = 1;
        let N = program.length + 1;
        registers.getD = (key) => registers.get(key) || 0;
        let history = []
        let counter = 0;
        while (index > 0 && index < N) {
            if (counter >= maxCounter) {
                return ['Exceeded Max Instructions', counter, history]
            }
            let instruction = program[index - 1];
            let line = `${index}: `
            index += 1;
            counter += 1;
            switch (instruction[0]) {
                case 4:
                    if (registers.getD(instruction[1]) === registers.getD(instruction[2])) {
                        index = instruction[3]
                        line += `Jump to ${index}`
                    } else {
                        line += 'No jump'
                    }
                    break;
                case 3:
                    registers.set(instruction[2], registers.getD(instruction[1]))
                    line += `R${instruction[2]}=${registers.getD(instruction[2])}`;
                    break;
                case 2:
                    registers.set(instruction[1], registers.getD(instruction[1]) + 1)
                    line += `R${instruction[1]}=${registers.getD(instruction[1])}`;
                    break;
                case 1:
                    registers.set(instruction[1], 0)
                    line += `R${instruction[1]}=${registers.getD(instruction[1])}`;
                    break;
                default:
                    continue;
            }
            history.push(line)
        }
        return [registers.getD(1), counter, history]
    }

    handleRun() {
        let program = this._convert_to_instructions(this.state.code)
        let registers = this._convert_to_registers(this.state.registers);
        if (+this.state.maxInstructions === 0) {
            this.handleMaxInstructionsChange(1000);
        }
        let maxInstructions = this.state.maxInstructions | 1000;
        this._execute(program, registers, maxInstructions).then(([result, count, history]) => {
            this.setState({output: `Result: ${result}\nInstruction Count: ${count}\n${history.join('\n')}`});
        });
    }


    _CODE_MAPPINGS = {'-': 0, 'z': 1, 'S': 2, 'T': 3, 'J': 4}


}

const CODE_DESCRIPTION = (
    <div><p>This is an Unlimited Register Machine (URM) simulator (emulator) -- a "virtual URM". It
        is
        modeled after the URM specification in Nigel J. Cutland's book, Computability, An
        introduction to recursive function theory, by Cambridge Press. (This simulator is
        implemented in JavaScript.)</p>
        <h4>Allowed instructions</h4>
        <p>J , S, T, Z (lower case works too):</p>
        <ul>
            <li>S(n): Successor. Increment register n by 1.
            </li>
            <li>J(m,n,i): Jump. If register m equals register n, jump to the ith instruction.
                Program stops if i = 0 or there is no ith instruction.
            </li>
            <li>T(m,n): Transfer. Copy from register m to register n.
            </li>
            <li>Z(n): Zero. Put 0 in register n.
            </li>
        </ul>
        <h4>Program Format</h4>
        <ul>
            <li>One command per line, whitespace is ignored.</li>
            <li>All text after the command is ignored.</li>
        </ul>

        <h4>Initial Register Values</h4>
        <ul>
            <li>Defaults to all zeros.</li>
            <li>Input as comma separated list.</li>
            <li>Example: "2,3" => R1=2, R2=3</li>
        </ul>
    </div>);
