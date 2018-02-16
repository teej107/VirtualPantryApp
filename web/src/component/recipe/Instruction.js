import React, {Component} from 'react';

export default class Instruction extends Component {

    render() {

        return (
            <li className="list-group-item">
                <span>
                    <span className="font-weight-bold">
                        {`${this.props.index + 1}. `}
                    </span>
                    {this.props.description}
                </span>
            </li>
        );
    }
}