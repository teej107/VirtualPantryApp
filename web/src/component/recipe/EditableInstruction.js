import React, {Component} from 'react';
import {Input, FormGroup} from 'reactstrap';

export default class EditableInstruction extends Component {

    constructor(props) {
        super(props);
        this.animation = "animated slideInRight";
        this.state = {
            description: props.item.description
        };
    }

    componentDidMount() {
        this.animation = "";
    }

    onChange = (event) => {
        this.setState({
            description: event.currentTarget.value
        });
    };

    render() {
        return (
            <li className={`list-group-item ${this.animation}`}>
                <span>
                    {this.props.dragHandle(<span className="fa fa-bars pr-3 touch-action-none">&nbsp;</span>)}
                    <textarea className="form-control"/>
                </span>
            </li>
        );
    }
}
