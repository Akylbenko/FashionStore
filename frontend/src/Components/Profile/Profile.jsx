import { useState, useEffect } from "react"
import api from "../../services/api"
import { Container, Card, Button, Form } from "react-bootstrap"
import "./Profile.css"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get("/api/me/")
      setUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const saveProfile = async () => {
    try {
      const formData = new FormData()

      formData.append("username", user.username)
      formData.append("email", user.email)

      if (avatarFile) {
        formData.append("avatar", avatarFile)
      }

      await api.put("/api/me/", formData)

      setEditing(false)
      fetchProfile()

    } catch (err) {
      console.log(err.response?.data)
      alert("Ошибка сохранения профиля")
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <Container className="profile-container">
      <Card className="profile-card">

        <h2 className="profile-title">Профиль</h2>

        {editing ? (
          <>
            <div className="avatar-section">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="profile-avatar"
                />
              )}

              <Form.Group>
                <Form.Label>Сменить аватар</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                />
              </Form.Group>
            </div>

            <Form.Group className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={user.username || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={user.email || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="profile-buttons">
              <Button onClick={saveProfile}>
                Сохранить
              </Button>

              <Button
                variant="secondary"
                onClick={() => setEditing(false)}
              >
                Отмена
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="avatar-section">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="avatar"
                className="profile-avatar"
              />
            </div>

            <div className="profile-info">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Дата регистрации:</strong> {user.created_at}</p>
            </div>

            <Button onClick={() => setEditing(true)}>
              Редактировать профиль
            </Button>
          </>
        )}

      </Card>
    </Container>
  )
}