import { useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router-dom"
import "./AddProduct.css"

export default function AddProduct() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState(1)
  const [image, setImage] = useState(null) 

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("title", title)
      formData.append("price", price)
      formData.append("description", description)
      formData.append("stock", stock)
      formData.append("image", image) 

      await api.post("/api/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      alert("Товар добавлен")
      navigate("/")
    } catch (err) {
      console.log(err)
      alert("Ошибка создания товара")
    }
  }

  return (
    <div className="add-product-container">
      <h2>Добавить товар</h2>

      <form className="add-product-form" onSubmit={handleSubmit}>

        <input
          className="add-product-input"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="add-product-input"
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="add-product-input"
          type="number"
          placeholder="Количество"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <textarea
          className="add-product-textarea"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="add-product-button" type="submit">
          Создать
        </button>

      </form>
    </div>
  )
}
