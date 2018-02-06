import React, {Component} from 'react';
import {toClassName} from "../app/Utilities";

const pluralize = (num, str) => {
    return num === 1 ? str : str + 's';
};

export default class Ingredient extends Component {

    render() {
        const measurement = pluralize(this.props.amount, this.props.measurement);
        return (
            <span className={toClassName(this.props.className)}>
                {`${this.props.amount} ${measurement} ${this.props.name}`}
            </span>
        );
    }
}