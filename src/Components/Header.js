import React, { Component } from "react";
import {
  Button,
  Container,
  FormControl,
  Navbar,
  Nav,
  Form,
} from "react-bootstrap";
import logo from "./logo192.png";

export default class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              height={30}
              width={30}
              className="d-inline-block align-top"
              alt="logo"
            />Indie Ease
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/"> Главная </Nav.Link>
              <Nav.Link href="/favorites"> Избранное </Nav.Link>
              <Nav.Link href="/bag"> Корзина </Nav.Link>
              <Nav.Link href="/profile"> Профиль </Nav.Link>
            </Nav>
            <Form className="d-flex w-100 mt-2 mt-md-0">
              <FormControl
                type="text"
                placeholder="Поиск"
                className="flex-grow-1 me-2"
              />
              <Button variant="outline-info" className="flex-shrink-0">
                Поиск
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
