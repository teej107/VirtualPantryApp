import React, {Component} from 'react';
import Measurement from "./Measurement";

export default class Ingredient extends Component {
    render() {
        return (
            <li className="list-group-item">
                <span>
                    {`${this.props.amount} `}
                    <Measurement measurement={this.props.measurement} plural={this.props.amount !== 1}/>
                    {` ${this.props.name}`}
                </span>
            </li>
        );
    }
}