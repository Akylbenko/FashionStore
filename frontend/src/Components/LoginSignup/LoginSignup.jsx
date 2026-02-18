import React, { useState, useContext } from "react"
import "./LoginSignup.css"
import user_icon from "../assets/person.png"
import password_icon from "../assets/password.png"
import api from "../../services/api"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function LoginSignup() {
  const [action, setAction] = useState("Вход")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { login: authLogin } = useContext(AuthContext) // ← используем context

  // LOGIN
  const handleLogin = async () => {
    try {
      const response = await api.post("/api/token/", {
        username,
        password,
      })

      // сохраняем токены через context
      authLogin(response.data.access, response.data.refresh)

      alert("Успешный вход!")
      navigate("/profile")

    } catch (error) {
      alert("Ошибка входа")
      console.log(error.response?.data)
    }
  }

  // REGISTER
  const register = async () => {
    try {
      await api.post("/api/register/", {
        username,
        password,
      })

      alert("Регистрация успешна! Теперь войдите.")
      setAction("Вход")

    } catch (error) {
      alert("Ошибка регистрации")
      console.log(error.response?.data)
    }
  }

  return (
    <div className="login-page">
      <div className="auth-container">

        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">

          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

        </div>

        <div className="submit-container">

          <div
            className={action === "Регистрация" ? "submit" : "submit gray"}
            onClick={() => setAction("Регистрация")}
          >
            Регистрация
          </div>

          <div
            className={action === "Вход" ? "submit" : "submit gray"}
            onClick={() => setAction("Вход")}
          >
            Вход
          </div>

          <button
            style={{ marginTop: "20px" }}
            onClick={action === "Вход" ? handleLogin : register}
          >
            {action === "Вход" ? "Войти" : "Зарегистрироваться"}
          </button>

        </div>

      </div>
    </div>
  )
}
