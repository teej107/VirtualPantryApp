import React, {Component} from 'react';
import {copyFromObject, toClassName} from "../app/Utilities";

const keys = Object.freeze([
    'amount',
    'measurement',
    'name'
]);

export default class Ingredient extends Component {

    constructor(props) {
        super(props);
        this.state = copyFromObject(keys, props);
    }

    render() {
        return (
            <span className={toClassName(this.props.className)}>
                {`${this.state.amount} ${this.state.measurement} ${this.state.name}`}
            </span>
        );
    }
}