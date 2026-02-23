import { useContext } from "react"
import {
  Button,
  Container,
  FormControl,
  Navbar,
  Nav,
  Form,
} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import logo from "../logo192.png"
import { AuthContext } from "../../context/AuthContext"
import "./Header.css"

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      fixed="top"
      className="custom-navbar"
      variant="dark"
    >
      <Container>

        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} height={30} width={30} alt="logo" />
          <span className="brand">Indie-Ease</span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          <Nav className="me-auto align-items-center">

            <Nav.Link className="nav-link-custom" as={Link} to="/">
              Главная
            </Nav.Link>

            <Nav.Link className="nav-link-custom" as={Link} to="/products">
              Каталог
            </Nav.Link>

            <Nav.Link className="nav-link-custom" as={Link} to="/favorites">
              Избранное
            </Nav.Link>

            <Nav.Link className="nav-link-custom" as={Link} to="/bag">
              Корзина
            </Nav.Link>

            <Nav.Link className="nav-link-custom" as={Link} to="/profile">
              Профиль
            </Nav.Link>

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="header-btn ms-3"
                style={{ background: "linear-gradient(135deg, #ff4d4d, #b40000)", border: "none" }}
              >
                Выйти
              </Button>
            ) : (
              <Button
                as={Link}
                to="/login"
                className="header-btn ms-3"
                style={{ background: "linear-gradient(135deg, #6b19af, #1e3c72)", border: "none" }}
              >
                Войти
              </Button>
            )}

          </Nav>

          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Поиск"
              className="search-input me-2"
            />
            <Button variant="outline-light" className="search-btn">
              Поиск
            </Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
