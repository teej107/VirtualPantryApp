import React, {Component} from 'react';
import {toClassName} from "../app/Utilities";

export default class Instruction extends Component {

    render() {
        return (
            <span className={toClassName(this.props.className)}>
                <span className='font-weight-bold'>{`${this.props.index + 1}. `}</span>
                {this.props.description}
            </span>
        );
    }
}