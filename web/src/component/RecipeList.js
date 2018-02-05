import React, {Component} from 'react';
import RecipeListItem from './RecipeListItem';
import {Row} from 'reactstrap';
import {connect} from 'react-redux';
import {toClassName} from '../app/Utilities';

const mapStateToProps = (store, props) => {
    return {
        items: store.recipeListView.items,
        ...props
    };
};

class RecipeList extends Component {

    render() {
        const children = this.props.items.map((item, i) => {
            return (
                <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                    <RecipeListItem view={item.recipeView} onClick={item.onClick}/>
                </div>);
        });

        return (
            <Row className={toClassName(this.props.className)}>
                {children}
            </Row>
        );
    }
}

export default connect(
    mapStateToProps
)(RecipeList);