import React, {Component} from 'react';
import {Row} from 'reactstrap';
import {toClassName} from '../app/Utilities';

export default class RecipeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    setItems(items) {
        this.setState({items: items});
    }

    render() {
        const children = this.state.items.map((item, i) => {
            return (
                <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                    {item}
                </div>);
        });

        return (
            <Row className={toClassName(this.props.className)}>
                {children}
            </Row>
        );
    }
}