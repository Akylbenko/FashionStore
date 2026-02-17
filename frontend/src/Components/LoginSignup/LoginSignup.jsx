import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../assets/person.png'
import password_icon from '../assets/password.png'
import api from '../../services/api'

export default function LoginSignup() {

  const [action, setAction] = useState("Вход")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    try {
      const response = await api.post("/api/token/", {
        username,
        password
      })

      localStorage.setItem("access", response.data.access)
      localStorage.setItem("refresh", response.data.refresh)

      alert("Успешный вход!")

    } catch (error) {
      alert("Ошибка входа")
      console.log(error.response?.data)
    }
  }

  const register = async () => {
    try {
      await api.post("/api/register/", {
        username,
        password
      })

      alert("Регистрация успешна! Теперь войдите.")
      setAction("Вход")

    } catch (error) {
      alert("Ошибка регистрации")
      console.log(error.response?.data)
    }
  }

  return (
    <div className='login-page'>
      <div className='auth-container'>

        <div className='header'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>

        <div className='inputs'>

          <div className='input'>
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='input'>
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder='Пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

        </div>

        <div className='submit-container'>

          <div
            className={action === "Вход" ? "submit gray" : "submit"}
            onClick={() => setAction("Регистрация")}
          >
            Зарегистрироваться
          </div>

          <div
            className={action === "Регистрация" ? "submit gray" : "submit"}
            onClick={action === "Вход" ? login : register}
          >
            {action === "Вход" ? "Войти" : "Создать аккаунт"}
          </div>

        </div>

      </div>
    </div>
  )
}
