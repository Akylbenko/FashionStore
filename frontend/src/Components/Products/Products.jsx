import { useEffect, useState } from "react"
import api from "../../services/api"
import "./Products.css"

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products/")
      setProducts(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const addToFavorites = async (productId) => {
    try {
      await api.post("/api/favorites/", {
        product: productId
      })

      alert("Добавлено в избранное ❤️")
    } catch (err) {
      alert("Ошибка")
    }
  }

  return (
    <div className="products-container">
      <h1>Товары</h1>

      {products.map(product => (
        <div className="product-card" key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Цена: {product.price} ₽</p>
          <p>В наличии: {product.stock}</p>
          <button onClick={() => addToFavorites(product.id)}>
            ❤️ В избранное
          </button>
        </div>
      ))}
    </div>
  )
}
