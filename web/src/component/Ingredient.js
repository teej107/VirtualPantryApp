import React, {Component} from 'react';
import {toClassName} from "../app/Utilities";

export default class Ingredient extends Component {

    render() {
        return (
            <span className={toClassName(this.props.className)}>
                {`${this.props.amount} ${this.props.measurement} ${this.props.name}`}
            </span>
        );
    }
}