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
import logo from "./logo192.png"
import { AuthContext } from "../context/AuthContext"

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height={30}
            width={30}
            className="d-inline-block align-top"
            alt="logo"
          />
          Indie-Ease
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/products">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/favorites">Избранное</Nav.Link>
            <Nav.Link as={Link} to="/bag">Корзина</Nav.Link>
            <Nav.Link as={Link} to="/profile">Профиль</Nav.Link>

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                style={{
                  background: "#b40000",
                  borderColor: "#b40000",
                  marginLeft: "10px",
                  marginRight: "20px",
                  paddingLeft: '30px',
                  paddingRight: '30px',
                }}
              >
                Выйти
              </Button>
            ) : (
              <Button
                as={Link}
                to="/login"
                style={{
                  background: "#4c00b4",
                  borderColor: "#4c00b4",
                  marginLeft: "10px",
                  marginRight: "20px",
                  paddingLeft: '30px',
                  paddingRight: '30px',
                }}
              >
                Войти
              </Button>
            )}
          </Nav>

          <Form className="d-flex w-100 mt-2 mt-md-0">
            <FormControl
              type="text"
              placeholder="Поиск"
              className="flex-grow-1 me-2"
            />
            <Button variant="outline-info">Поиск</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
