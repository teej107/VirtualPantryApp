import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';

export default class RecipeList extends Component {

    constructor() {
        super();
        this.state = {items: []};
    }

    setItems(items) {
        this.setState({items: items});
    }

    render() {

        return (
            <div>

            </div>
        );
    }
}