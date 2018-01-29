import React, {Component} from 'react';
import {Well, Button} from 'react-bootstrap/lib';

export default class RecipeListItem extends Component {
    render() {
        return (
            <Well>
                <img src={this.props.view.image} alt={this.props.view.title}/>
                <h5>{this.props.view.title}</h5>
                <Button bsStyle="primary" onClick={this.props.onClick}>View</Button>
            </Well>
        );
    }
}