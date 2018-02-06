import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setMenuBarCollapsed} from "../redux/reducer/menuBarReducer";
import {home} from '../data/History';
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

    constructor() {
        super();
        this.state = {searchValue: ""};
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen(this.setSearchValue.bind(this, ""));
    }

    componentWillUnmount() {
        this.unlisten();
    }

    setSearchValue = (value) => {
        this.setState({searchValue: value});
        this.props.onChange(value);
    };

    onSearchChange = (event) => {
        this.setSearchValue(event.currentTarget.value);
    };

    handleClick = () => {
        home(this.props.history);
    };

    render() {
        return (
            <Navbar color="light" expand="md" light className="shadow-bottom">
                <Container>
                    <NavbarBrand onClick={this.handleClick}>Virtual Pantry</NavbarBrand>
                    <NavbarToggler onClick={this.props.setCollapsed.bind(null, !this.props.collapsed)}/>
                    <Collapse isOpen={!this.props.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Link to={home()} className="nav-link my-0">Recipes</Link>
                            </NavItem>
                        </Nav>
                        <Nav navbar className="ml-auto">
                            <Form inline className="navbar-right">
                                <InputGroup>
                                    <Input ref={input => this.search = input} placeholder='Search'
                                           onChange={this.onSearchChange} value={this.state.searchValue}/>
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {withRef: true}
)(MenuBar));