import React from "react"
import { logout } from "../services/auth"

export default function Profile() {
  return (
    <div>
      <h1>Профиль</h1>

      <button onClick={logout}>
        Выйти
      </button>
    </div>
  )
}
