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

  return (
    <div className="products-container">
      <h1>Товары</h1>

      {products.map(product => (
        <div className="product-card" key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Цена: {product.price} ₽</p>
          <p>В наличии: {product.stock}</p>
        </div>
      ))}
    </div>
  )
}
