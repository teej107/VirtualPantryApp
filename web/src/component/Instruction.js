import React, {Component} from 'react';
import {copyFromObject} from "../Utilities";

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
            <div>
                <p>{this.state.description}</p>
            </div>
        );
    }
}