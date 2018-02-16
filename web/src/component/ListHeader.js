import React, {Component} from 'react';
import {Button} from 'reactstrap';

export default class ListHeader extends Component {

    render() {
        return (
            <div className="mt-1">
                <h2 className="d-inline-block align-middle min-width-185px">{this.props.title}</h2>
                <Button className="align-middle"
                        color="success"
                        outline
                        onClick={this.props.onClick}>
                    <i className="fa fa-plus"/>
                </Button>
            </div>
        );
    }
}