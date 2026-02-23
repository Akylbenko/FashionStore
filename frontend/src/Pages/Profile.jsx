import { useState, useEffect } from "react"
import api from "../services/api"
import { Container, Card, Button, Form } from "react-bootstrap"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)

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
      [e.target.name]: e.target.value
    })
  }

  const saveProfile = async () => {
    try {
      const formData = new FormData()

      for (let key in user) {
        formData.append(key, user[key])
      }

      await api.put("/api/me/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setEditing(false)
      fetchProfile()

    } catch (err) {
      console.log(err)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <Container style={{ marginTop: "100px", maxWidth: "600px" }}>
      <Card className="p-4">

        <h2>Профиль</h2>

        {editing ? (
          <>
            <Form.Group>
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

            <Form.Group className="mt-3">
              <Form.Label>Аватар</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setUser({
                    ...user,
                    avatar: e.target.files[0]
                  })
                }
              />
            </Form.Group>

            <Button className="mt-3" onClick={saveProfile}>
              Сохранить
            </Button>
          </>
        ) : (
          <>
            {user.avatar && (
              <img
                src={user.avatar}
                alt="avatar"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 20
                }}
              />
            )}

            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Дата регистрации:</strong> {user.created_at}</p>

            <Button onClick={() => setEditing(true)}>
              Редактировать профиль
            </Button>
          </>
            
        )}

      </Card>
    </Container>
  )
}