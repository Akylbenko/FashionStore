import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  )

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access"))
  }, [])

  const login = (access, refresh) => {
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
