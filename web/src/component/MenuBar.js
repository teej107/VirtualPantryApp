import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {setMenuBarCollapsed} from "../redux/reducer/menuBarReducer";
import {
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    Nav,
    Form,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

const mapStateToProps = (store, props) => {
    return {
        collapsed: store.menuBar.collapsed,
        ...props
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setCollapsed: (bool) => dispatch(setMenuBarCollapsed(bool)),
        ...props
    };
};

class MenuBar extends Component {

    clearSearch() {
        ReactDOM.findDOMNode(this.search).value = "";
    }

    render() {
        return (
            <Navbar color="light" expand="md" light className="shadow-bottom">
                <Container>
                    <NavbarBrand href="/">Virtual Pantry</NavbarBrand>
                    <NavbarToggler onClick={this.props.setCollapsed.bind(null, !this.props.collapsed)}/>
                    <Collapse isOpen={!this.props.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="#">Recipes</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar className="ml-auto">
                            <Form inline className="navbar-right">
                                <InputGroup>
                                    <Input ref={input => this.search = input} placeholder='Search'
                                           onInput={this.props.onInput}/>
                                    {/* className used due to react error/inconsistencies with documentation:
                                    https://github.com/reactstrap/reactstrap/issues/770#issuecomment-356472250 */}
                                    <InputGroupAddon className='input-group-append'>
                                        <i className="fa fa-search input-group-text"/>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {withRef: true}
)(MenuBar);