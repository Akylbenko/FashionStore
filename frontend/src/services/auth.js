export const logout = () => {
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")

  window.dispatchEvent(new Event("authChanged")) 

  window.location.href = "/login"
}
