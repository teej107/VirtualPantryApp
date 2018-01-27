import React, {Component} from 'react';
import {copyFromObject} from "../Utilities";

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
            <p>{`${this.state.amount} ${this.state.measurement} ${this.state.name}`}</p>
        );
    }
}