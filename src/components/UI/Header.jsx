import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import PropTypes from 'prop-types';


function Header({ username, handle_logout, logged_in }) {

    const logged_out_nav = () => {
        return (
            <Nav className="justify-content-end">
                <Navbar.Brand >Not logged in</Navbar.Brand>
            </Nav>
        )

    };
    const logged_in_nav = () => {
        return (
            <Nav className="justify-content-end">
                <Navbar.Brand >Current User: {username}</Navbar.Brand>
                <Nav.Link
                    href="/">
                    <li onClick={handle_logout}>Logout</li></Nav.Link>
            </Nav>

        )
    };


    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand style={{ fontFamily: "Blackadder ITC", fontSize: "30px" }}>Uzman</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/lists/">All Lists</Nav.Link>
                    </Nav>

                    <Nav>{logged_in ? logged_in_nav() : logged_out_nav()}</Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default Header;


Header.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    handle_logout: PropTypes.func.isRequired
};