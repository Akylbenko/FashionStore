import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'

export default function LoginSignup () {

    const [action, setAction] = useState("Регистрация")

    return (
      <div className='login-page'>
        <div className='auth-container'>
          <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
          </div>
          <div className='inputs'>
            {action==="Вход"?<div></div>:<div className='input'>
              <img src={user_icon} alt="" />
              <input type="text" placeholder='Имя' />
            </div>} 
            <div className='input'>
              <img src={email_icon} alt="" />
              <input type="email" placeholder='Почта' />
            </div>
            <div className='input'>
              <img src={password_icon} alt="" />
              <input type="password" placeholder='Пароль'/>
            </div>
          </div>
          {action==="Регистрация"?<div></div>:<div className='forgot-password'>Забыли пароль? <span>Нажмите сюда!</span></div>}
          <div className='submit-container'>
            <div className={action==="Вход"?"submit gray":"submit"} onClick={()=>{setAction("Регистрация")}}>Зарегистрироваться</div>
            <div className={action==="Регистрация"?"submit gray":"submit"} onClick={()=>{setAction("Вход")}}>Войти</div>
          </div>
        </div>
      </div> 
    )
  }
