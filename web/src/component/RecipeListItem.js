import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Button
} from 'reactstrap';

export default class RecipeListItem extends Component {
    render() {
        return (
            <Card className="recipe-view">
                <CardImg top src={this.props.view.image} alt={this.props.view.title}/>
                <CardBody>
                    <CardTitle>{this.props.view.title}</CardTitle>
                    <Button color="primary" onClick={this.props.onClick}>View</Button>
                </CardBody>
            </Card>
        );
    }
}