import React, {Component} from 'react';

export default class Measurement extends Component {

    render() {
        let display = this.props.measurement.abbreviation;
        if (this.props.plural)
            display += 's';
        return (
            <span>
                {display}
            </span>
        );
    }
}