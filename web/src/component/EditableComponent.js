import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {toArray, toClassName} from '../app/Utilities';
import {connect} from 'react-redux';

const cssClass = "editable-component";

const mapStateToProps = (store, props) => {
    return {
        editing: store.recipe.editing,
        ...props
    }
};

class EditableComponent extends Component {

    static propTypes = Object.freeze({
        editor: PropTypes.bool
    });

    static getEditableComponents(parentNode) {
        let editableArr = [];
        toArray(parentNode.children).forEach(child => {
            const classNames = child.props.className.split(' ');
            if (classNames.includes(cssClass))
                editableArr.push(child);
        });
        return editableArr;
    }

    render() {
        const display = toArray(this.props.children).filter(child => Boolean(child.props.editor) === this.props.editing);

        return (
            <div className={toClassName(this.props.className, cssClass)} onClick={this.props.onClick}>
                {display}
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(EditableComponent);