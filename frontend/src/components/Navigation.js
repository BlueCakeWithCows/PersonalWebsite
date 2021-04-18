import React from "react";
import Navbar from "react-bootstrap/Navbar";
import {Container, Image, Nav, NavbarBrand} from "react-bootstrap";
import {AiFillGithub, AiFillLinkedin} from "react-icons/ai";

export class Navigation extends React.Component {
    render() {
        return (
            <Navbar className='navigation-bar'>
                <Container>
                    <NavbarBrand href='./home'>
                        <Image src="/brand.png" className='logo'/>
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href='./home'>Home</Nav.Link>
                            <Nav.Link href='/other-sites'>Favorite Sites</Nav.Link>
                            <Nav.Link
                                href='/urm'>URM</Nav.Link>
                        </Nav>
                        <Nav className={"ml-auto"}>
                            <Nav.Link href='/resume'>Resume</Nav.Link>
                            <Nav.Link
                                href='https://www.linkedin.com/in/mason-kohls-118051182/'><AiFillLinkedin/></Nav.Link>
                            <Nav.Link href='https://github.com/BlueCakeWithCows'><AiFillGithub/></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}