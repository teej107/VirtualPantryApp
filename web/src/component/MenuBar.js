import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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

export default class MenuBar extends Component {

    constructor() {
        super();
        this.state = {collapsed: true};
    }

    toggleNavbar = () => {
        this.setState({collapsed: !this.state.collapsed});
    };

    clearSearch() {
        ReactDOM.findDOMNode(this.search).value = "";
    }

    render() {
        return (
            <Navbar color="light" expand="md" light className="shadow-bottom">
                <Container>
                    <NavbarBrand href="/">Virtual Pantry</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar}/>
                    <Collapse isOpen={!this.state.collapsed} navbar>
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
                                    {/* className used due to react error:
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