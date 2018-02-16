import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form} from 'reactstrap';
import {connect} from 'react-redux';

const mapStateToProps = (store, props) => {
    return {
        measurements: store.measurement.measurements,
        ...props
    };
};

class EditableIngredient extends Component {

    constructor(props) {
        super(props);
        this.animation = "animated slideInRight";
        this.state = {
            amount: props.item.amount,
            measurement: props.item.measurement,
            name: props.item.name,
            dropdownOpen: false,
            selectedMeasurement: "Measurement"
        };
    }

    componentDidMount() {
        this.animation = "";
    }

    toggleDropdown = () => {
        const parent = ReactDOM.findDOMNode(this.li).parentElement;
        parent.style.zIndex = this.state.dropdownOpen ? '0' : '1000';

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    onChange = (stateProp) => {
        return (event) => {
            this.setState({
                [stateProp]: event.currentTarget.value
            });
        };
    };

    onMeasurementSelected = (measurement) => {
        this.setState({
            selectedMeasurement: measurement.abbreviation
        });
    };

    render() {
        const dropdownMeasurements = [];
        for (const key in this.props.measurements) {
            if (this.props.measurements.hasOwnProperty(key)) {
                dropdownMeasurements.push(
                    <DropdownItem key={key}
                                  onClick={this.onMeasurementSelected.bind(this, this.props.measurements[key])}>
                        {this.props.measurements[key].abbreviation}
                    </DropdownItem>
                );
            }
        }


        return (
            <li ref={input => this.li = input}
                className={`list-group-item mb-2 ${this.animation}`}>
                <span>
                    {this.props.dragHandle(<span className="fa fa-bars pr-3 touch-action-none">&nbsp;</span>)}
                    <Form className="d-inline" inline>
                        <Input className="max-width-90 mr-md-1" step="0.125" type="number" value={this.state.amount}
                               onChange={this.onChange("amount")}/>
                        <ButtonDropdown className="mr-md-1" isOpen={this.state.dropdownOpen}
                                        toggle={this.toggleDropdown}>
                            <DropdownToggle className="min-width-70px" caret>{this.state.selectedMeasurement}</DropdownToggle>
                            <DropdownMenu>
                                {dropdownMeasurements}
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Input type="text" value={this.state.name} onChange={this.onChange("name")}/>
                    </Form>
                </span>
            </li>
        );
    }
}

export default connect(
    mapStateToProps
)(EditableIngredient);