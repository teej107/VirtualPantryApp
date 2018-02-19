import React, {Component} from 'react';
import {Col, Row, Button} from "reactstrap";
import {connect} from 'react-redux';
import IngredientObject from "../../data/recipe/IngredientObject";
import EditableInstruction from "./EditableInstruction";
import EditableIngredient from "./EditableIngredient";
import InstructionObject from "../../data/recipe/InstructionObject";
import DraggableList from 'react-draggable-list';
import ListHeader from '../ListHeader';
import InputRow from '../InputRow';

const mapStateToProps = (store, props) => {
    return {
        recipe: store.recipe.recipe,
        ...props
    };
};

class EditRecipePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.props.recipe ? this.props.recipe.ingredients : [],
            instructions: this.props.recipe ? this.props.recipe.instructions : [],
            description: this.props.recipe ? this.props.recipe.description : ""
        };
    }

    onInstructionsClick = () => {
        this.state.instructions.push(new InstructionObject(this.state.instructions.length));
        this.setState(this.state);
    };

    onIngredientsClick = () => {
        this.state.ingredients.push(new IngredientObject());
        this.setState(this.state);
    };

    onIngredientsMoveEnd = (newList) => {
        this.setState({ingredients: newList});
    };

    onInstructionsMoveEnd = (newList) => {
        this.setState({instructions: newList});
        newList.forEach((item, i) => item.index = i);
    };

    onDescriptionChange = (event) => {
        this.setState({
            description: event.currentTarget.value
        });
    };

    render() {

        const {title, image, video} = this.props.recipe || {};

        return (
            <div>
                <InputRow title="Title" value={title}/>
                <InputRow title="Image" placeholder="URL" value={image}/>
                <InputRow title="Video" placeholder="Embed URL" value={video}/>
                <hr/>
                <Row>
                    <Col>
                        <h2>Description</h2>
                        <textarea className="form-control"
                                  value={this.state.description}
                                  onChange={this.onDescriptionChange}/>
                        <hr/>
                        <ListHeader title="Ingredients" onClick={this.onIngredientsClick}/>
                        <DraggableList list={this.state.ingredients}
                                       itemKey="key"
                                       template={EditableIngredient}
                                       onMoveEnd={this.onIngredientsMoveEnd}/>
                        <hr/>
                        <ListHeader title="Instructions" onClick={this.onInstructionsClick}/>
                        <DraggableList list={this.state.instructions}
                                       itemKey="key"
                                       template={EditableInstruction}
                                       onMoveEnd={this.onInstructionsMoveEnd}/>
                    </Col>
                </Row>
                <hr/>
                <Row className="mt-5 mb-1">
                    <Col>
                        <Button color="success" outline>Save</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(EditRecipePage);