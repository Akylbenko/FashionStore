import React from "react"
import { logout } from '../services/auth'
import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/me/")
        setUser(response.data)
      } catch (err) {
        setError("Не удалось загрузить профиль")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) return <h2>Загрузка профиля...</h2>

  if (error) return <h2>{error}</h2>

  return (
    <div style={{padding: "40px"}}>
      <h1>Профиль</h1>

      <button onClick={logout}>
        Выйти
      </button>

      {user && (
        <>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
        </>
      )}
      
    </div>
    
  )
}
