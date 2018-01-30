import React, {Component} from 'react';
import {copyFromObject, str} from "../app/Utilities";

const keys = Object.freeze([
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
            <p className={str(this.props.className)}>{this.state.description}</p>
        );
    }
}