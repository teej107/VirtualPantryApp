import React, {Component} from 'react';
import {copyFromObject, toClassName} from "../app/Utilities";

const keys = Object.freeze([
    'index',
    'description',
    'images'
]);

export default class Instruction extends Component {

    constructor(props) {
        super(props);
        this.state = copyFromObject(keys, props);
    }

    render() {
        return (
            <span className={toClassName(this.props.className)}>
                <span className='font-weight-bold'>{`${this.props.index + 1}. `}</span>
                {this.state.description}
            </span>
        );
    }
}