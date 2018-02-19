import React, {Component} from 'react';
import Ingredient from "./Ingredient";
import Instruction from "./Instruction";
import {Row, Col} from 'reactstrap';
import {connect} from 'react-redux';


const mapStateToProps = (store, props) => {
    return {
        ...store.recipe.recipe,
        ...store.recipe.editing,
        ...props
    };
};

class RecipePage extends Component {

    render() {
        const ingredients = (this.props.ingredients || []).map(ingredient => <Ingredient {...ingredient}/>);
        const instructions = (this.props.instructions || []).map(instruction => <Instruction {...instruction}/>);

        return (
            <div ref={ref => this.parent = ref} className='recipe-page mx-auto'>
                <h1 className="pb-2 text-center">{this.props.title}</h1>
                <Row>
                    <Col className="col-lg-8 col-md-10 col-sm-12 mx-auto">
                        <img src={this.props.image} alt={this.props.title}/>
                        <div className="iframe-container mt-1">
                            <iframe src={this.props.video} title="Video" allowFullScreen/>
                        </div>
                    </Col>
                </Row>
                <hr/>
                <div>
                    <h2>Description</h2>
                    <p>{this.props.description}</p>
                    <hr/>
                    <h2 className="mt-1">Ingredients</h2>
                    <ul className="list-group">
                        {ingredients}
                    </ul>
                    <hr/>
                    <h2 className="mt-1">Instructions</h2>
                    <ol className="list-group">
                        {instructions}
                    </ol>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(RecipePage);