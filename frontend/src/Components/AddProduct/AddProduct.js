import { useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router-dom"
import "./AddProduct.css"

export default function AddProduct() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState(1)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/api/products/", {
        title,
        price,
        description,
        stock
      })

      alert("Товар добавлен")
      navigate("/")
    } catch (err) {
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

        <button className="add-product-button" type="submit">
          Создать
        </button>

      </form>
    </div>
  )
}
