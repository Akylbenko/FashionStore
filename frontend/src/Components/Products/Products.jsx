import { useEffect, useState, useContext } from "react"
import api from "../../services/api"
import "./Products.css"
import { BagContext } from "../../context/BagContext" 

export default function Products() {
  const [products, setProducts] = useState([])
  const [favorites, setFavorites] = useState([]) 

  useEffect(() => {
    fetchProducts()
    fetchFavorites()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products/")
      setProducts(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const { bag, addToBag } = useContext(BagContext)

  const isInBag = (productId) => {
    return bag.some(item => item.id === productId)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/api/favorites/")
      const ids = res.data.map(item => item.product.id)
      setFavorites(ids)
    } catch (err) {
      console.log(err)
    }
  }

  const isFavorite = (productId) => {
    return favorites.includes(productId)
  }

  const toggleFavorite = async (productId) => {
    try {
      if (isFavorite(productId)) {
        await api.post("/api/favorites/remove/", {
          product: productId
        })

        setFavorites(prev => prev.filter(id => id !== productId))

      } else {
        await api.post("/api/favorites/", {
          product_id: productId
        })

        setFavorites(prev => [...prev, productId])
      }

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

          <button onClick={() => toggleFavorite(product.id)}>
            {isFavorite(product.id)
              ? "💔 Убрать из избранного"
              : "❤️ В избранное"}
          </button>
          <button
            onClick={() => addToBag(product)}
            disabled={isInBag(product.id)}
          >
            {isInBag(product.id)
              ? "✅ В корзине"
              : "🛒 Купить"}
          </button>
        </div>
      ))}
    </div>
  )
}
